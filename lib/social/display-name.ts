import type { ResolvedSocialProfile } from "@/lib/types";
import type { SupportedPlatform } from "@/lib/types";
import { fetchSocialMetadata, fetchSocialMetadataViaCurl } from "@/lib/social/metadata";

export async function enrichDisplayName(profile: ResolvedSocialProfile): Promise<ResolvedSocialProfile> {
  const enrichedIdentity = await enrichProfileIdentity(profile);

  const providerDisplayName = await fetchProviderDisplayName(enrichedIdentity);

  if (providerDisplayName) {
    return {
      ...enrichedIdentity,
      userName: providerDisplayName,
    };
  }

  const metadata =
    (await fetchSocialMetadata(enrichedIdentity.originalUrl)) ??
    (await fetchSocialMetadata(enrichedIdentity.normalizedUrl)) ??
    (await fetchSocialMetadata(enrichedIdentity.profileUrl));

  if (!metadata) {
    return appendWarning(
      enrichedIdentity,
      "表示名の自動取得はできなかったため、必要に応じて user_name を手動で編集してください。",
    );
  }

  const candidate = parseDisplayName(enrichedIdentity.platform, enrichedIdentity.userId, [
    metadata.ogTitle,
    metadata.twitterTitle,
    metadata.title,
    metadata.description,
  ]);

  if (!candidate) {
    return appendWarning(
      enrichedIdentity,
      "表示名の自動取得はできなかったため、必要に応じて user_name を手動で編集してください。",
    );
  }

  return {
    ...enrichedIdentity,
    userName: candidate,
  };
}

async function fetchProviderDisplayName(profile: ResolvedSocialProfile): Promise<string | null> {
  switch (profile.platform) {
    case "x":
      return fetchXDisplayName(profile.normalizedUrl);
    case "threads":
      return fetchThreadsDisplayName(profile.profileUrl, profile.userId);
    case "instagram":
      return fetchInstagramDisplayName(profile.profileUrl, profile.userId);
    default:
      return null;
  }
}

function parseDisplayName(
  platform: SupportedPlatform,
  userId: string,
  candidates: string[],
): string | null {
  for (const value of candidates) {
    const parsed = parseByPlatform(platform, userId, value);

    if (parsed) {
      return parsed;
    }
  }

  return null;
}

function parseByPlatform(platform: SupportedPlatform, userId: string, rawValue: string): string | null {
  const value = cleanupDisplayName(rawValue);

  if (!value) {
    return null;
  }

  switch (platform) {
    case "x":
      return (
        firstMatch(value, new RegExp(`^(.*?)\\s*\\(@${escapeRegex(userId)}\\)`)) ??
        firstMatch(value, /^(.*?)\s*\(@[^)]+\)\s*\/\s*X$/) ??
        null
      );
    case "threads":
      return (
        firstMatch(value, new RegExp(`^(.*?)\\s*\\(@${escapeRegex(userId)}\\)`)) ??
        firstMatch(value, /^(.*?)\s+on\s+Threads$/i) ??
        null
      );
    case "instagram":
      return (
        firstMatch(value, new RegExp(`^(.*?)\\s+on\\s+Instagram`, "i")) ??
        firstMatch(value, new RegExp(`^${escapeRegex(userId)}\\s*\\((.*?)\\)`)) ??
        null
      );
    case "tiktok":
      return (
        firstMatch(value, new RegExp(`^(.*?)\\s*\\(@${escapeRegex(userId)}\\)`)) ??
        firstMatch(value, /^(.*?)\s*\(@[^)]+\)\s*on\s+TikTok/i) ??
        firstMatch(value, /^(.*?)\s*\|\s*TikTok/i) ??
        null
      );
    default:
      return null;
  }
}

function firstMatch(value: string, pattern: RegExp): string | null {
  const match = value.match(pattern);
  const candidate = cleanupDisplayName(match?.[1] ?? "");
  return candidate || null;
}

function cleanupDisplayName(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/&#064;/g, "@")
    .replace(/^["'\s]+|["'\s]+$/g, "")
    .trim();
}

function appendWarning(profile: ResolvedSocialProfile, warning: string): ResolvedSocialProfile {
  const warnings = new Set(profile.warnings ?? []);
  warnings.add(warning);

  return {
    ...profile,
    warnings: Array.from(warnings),
  };
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function fetchXDisplayName(targetUrl: string): Promise<string | null> {
  try {
    const endpoint = new URL("https://publish.twitter.com/oembed");
    endpoint.searchParams.set("url", targetUrl);
    endpoint.searchParams.set("omit_script", "1");

    const response = await fetch(endpoint, {
      headers: {
        accept: "application/json",
      },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { author_name?: string };
    const authorName = cleanupDisplayName(data.author_name ?? "");
    return authorName || null;
  } catch {
    return null;
  }
}

async function fetchThreadsDisplayName(profileUrl: string, userId: string): Promise<string | null> {
  if (!userId) {
    return null;
  }

  const metadata = (await fetchSocialMetadataViaCurl(profileUrl)) ?? (await fetchSocialMetadata(profileUrl));

  if (!metadata) {
    return null;
  }

  return (
    parseDisplayName("threads", userId, [metadata.ogTitle, metadata.twitterTitle, metadata.title]) ?? null
  );
}

async function fetchInstagramDisplayName(profileUrl: string, userId: string): Promise<string | null> {
  if (!userId) {
    return null;
  }

  const metadata = (await fetchSocialMetadataViaCurl(profileUrl)) ?? (await fetchSocialMetadata(profileUrl));

  if (!metadata) {
    return null;
  }

  return (
    parseInstagramProfileDisplayName(userId, [
      metadata.title,
      metadata.ogTitle,
      metadata.description,
      metadata.twitterTitle,
    ]) ?? null
  );
}

async function enrichProfileIdentity(profile: ResolvedSocialProfile): Promise<ResolvedSocialProfile> {
  switch (profile.platform) {
    case "instagram":
      return enrichInstagramIdentity(profile);
    default:
      return profile;
  }
}

async function enrichInstagramIdentity(profile: ResolvedSocialProfile): Promise<ResolvedSocialProfile> {
  if (profile.userId) {
    return profile;
  }

  const metadata = await fetchSocialMetadata(profile.originalUrl);

  if (!metadata) {
    return profile;
  }

  const derivedUserId =
    parseInstagramUsername([metadata.description, metadata.ogTitle, metadata.twitterTitle, metadata.title]) ??
    parseInstagramUsernameFromHtml(metadata.html);

  if (!derivedUserId) {
    return profile;
  }

  return {
    ...profile,
    userId: derivedUserId,
    profileUrl: `https://www.instagram.com/${derivedUserId}/`,
  };
}

function parseInstagramProfileDisplayName(userId: string, candidates: string[]): string | null {
  for (const value of candidates) {
    const cleaned = cleanupDisplayName(value);

    if (!cleaned) {
      continue;
    }

    const titleMatch = cleaned.match(new RegExp(`^(.*?)\\s*\\(@${escapeRegex(userId)}\\)`));
    if (titleMatch?.[1]) {
      return cleanupDisplayName(titleMatch[1]);
    }

    const descriptionMatch =
      cleaned.match(
        new RegExp(`^[0-9.,A-Za-z\\s]+Posts\\s*-\\s*(.*?)\\s*\\(@${escapeRegex(userId)}\\)`),
      ) ??
      cleaned.match(new RegExp(`^[0-9,]+\\s+Posts\\s*-\\s*(.*?)\\s*\\(@${escapeRegex(userId)}\\)`)) ??
      cleaned.match(new RegExp(`Posts\\s*-\\s*(.*?)\\s*\\(@${escapeRegex(userId)}\\)`));
    if (descriptionMatch?.[1]) {
      return cleanupDisplayName(descriptionMatch[1]);
    }
  }

  return null;
}

function parseInstagramUsername(candidates: string[]): string | null {
  for (const value of candidates) {
    const cleaned = cleanupDisplayName(value);

    if (!cleaned) {
      continue;
    }

    const match =
      cleaned.match(/(?:^|[\s-])@?([A-Za-z0-9._]+)\s+on Instagram/i) ??
      cleaned.match(/\(@?([A-Za-z0-9._]+)\)/i);

    if (match?.[1]) {
      return cleanupDisplayName(match[1]).replace(/^@/, "");
    }
  }

  return null;
}

function parseInstagramUsernameFromHtml(html: string): string | null {
  const matches = Array.from(html.matchAll(/"username":"([A-Za-z0-9._]+)"/g));

  for (const match of matches) {
    const candidate = cleanupDisplayName(match[1]).replace(/^@/, "");

    if (candidate && candidate.toLowerCase() !== "instagram") {
      return candidate;
    }
  }

  return null;
}

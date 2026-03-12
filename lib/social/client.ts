import type { ResolvedSocialProfile } from "@/lib/types";
import { detectPlatform } from "@/lib/social/platform";
import { resolveInstagramProfile } from "@/lib/social/resolvers/instagram";
import { resolveThreadsProfile } from "@/lib/social/resolvers/threads";
import { resolveTikTokProfile } from "@/lib/social/resolvers/tiktok";
import { resolveXProfile } from "@/lib/social/resolvers/x";

export async function resolveSocialProfileClient(inputUrl: string): Promise<ResolvedSocialProfile> {
  const platform = detectPlatform(inputUrl);
  const resolvedProfile = (() => {
    switch (platform) {
      case "x":
        return resolveXProfile(inputUrl);
      case "threads":
        return resolveThreadsProfile(inputUrl);
      case "instagram":
        return resolveInstagramProfile(inputUrl);
      case "tiktok":
        return resolveTikTokProfile(inputUrl);
      default:
        throw new Error("未対応のプラットフォームです。");
    }
  })();

  if (platform === "x") {
    const xDisplayName = await fetchXDisplayName(resolvedProfile.normalizedUrl);

    if (xDisplayName) {
      return {
        ...resolvedProfile,
        userName: xDisplayName,
      };
    }
  }

  if (platform === "threads" || platform === "instagram" || platform === "tiktok") {
    return appendWarning(
      resolvedProfile,
      "表示名の自動取得はできなかったため、必要に応じて user_name を手動で編集してください。",
    );
  }

  return resolvedProfile;
}

async function fetchXDisplayName(targetUrl: string): Promise<string | null> {
  try {
    const endpoint = new URL("https://publish.twitter.com/oembed");
    endpoint.searchParams.set("url", targetUrl);
    endpoint.searchParams.set("omit_script", "1");

    const response = await fetch(endpoint.toString(), {
      headers: {
        accept: "application/json",
      },
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

function appendWarning(profile: ResolvedSocialProfile, warning: string): ResolvedSocialProfile {
  const warnings = new Set(profile.warnings ?? []);
  warnings.add(warning);

  return {
    ...profile,
    warnings: Array.from(warnings),
  };
}

function cleanupDisplayName(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/&#064;/g, "@")
    .replace(/^["'\s]+|["'\s]+$/g, "")
    .trim();
}

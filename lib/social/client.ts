import type { ResolvedSocialProfile } from "@/lib/types";
import {
  appendWarning,
  cleanupDisplayName,
  DISPLAY_NAME_MANUAL_EDIT_WARNING,
} from "@/lib/social/display-name-shared";
import { resolveSocialProfileBase } from "@/lib/social/resolve-profile";

const MANUAL_DISPLAY_NAME_PLATFORMS = new Set(["threads", "instagram", "tiktok"]);

export async function resolveSocialProfileClient(inputUrl: string): Promise<ResolvedSocialProfile> {
  const resolvedProfile = resolveSocialProfileBase(inputUrl);

  if (resolvedProfile.platform === "x") {
    const xDisplayName = await fetchXDisplayName(resolvedProfile.normalizedUrl);

    if (xDisplayName) {
      return {
        ...resolvedProfile,
        userName: xDisplayName,
      };
    }
  }

  if (MANUAL_DISPLAY_NAME_PLATFORMS.has(resolvedProfile.platform)) {
    return appendWarning(resolvedProfile, DISPLAY_NAME_MANUAL_EDIT_WARNING);
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

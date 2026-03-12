import type { ResolvedSocialProfile } from "@/lib/types";
import { normalizeSocialUrl } from "@/lib/social/normalize";
import { fallbackUserName, sanitizeHandle } from "@/lib/social/resolvers/shared";

export function resolveXProfile(inputUrl: string): ResolvedSocialProfile {
  const url = new URL(inputUrl);
  const handle = getHandle(url);
  const warnings = handle ? [] : ["X の URL から user_id を特定できなかったため、手動入力してください。"];

  return {
    platform: "x",
    originalUrl: inputUrl,
    normalizedUrl: normalizeSocialUrl(inputUrl, "x"),
    userId: handle,
    userName: fallbackUserName(handle, "X"),
    profileUrl: handle ? `https://twitter.com/${handle}` : "https://twitter.com/",
    warnings,
  };
}

function getHandle(url: URL): string {
  const pathSegment = url.pathname.split("/").filter(Boolean)[0];
  const queryHandle = url.searchParams.get("screen_name") ?? url.searchParams.get("user");
  return sanitizeHandle(pathSegment) || sanitizeHandle(queryHandle);
}

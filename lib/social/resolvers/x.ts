import type { ResolvedSocialProfile } from "@/lib/types";
import { buildResolvedProfile, sanitizeHandle } from "@/lib/social/resolvers/shared";

export function resolveXProfile(inputUrl: string): ResolvedSocialProfile {
  const url = new URL(inputUrl);
  const handle = getHandle(url);
  return buildResolvedProfile({
    platform: "x",
    inputUrl,
    handle,
    fallbackLabel: "X",
    emptyProfileUrl: "https://twitter.com/",
    warningMessage: "X の URL から user_id を特定できなかったため、手動入力してください。",
    profileUrl: (userId) => `https://twitter.com/${userId}`,
  });
}

function getHandle(url: URL): string {
  const pathSegment = url.pathname.split("/").filter(Boolean)[0];
  const queryHandle = url.searchParams.get("screen_name") ?? url.searchParams.get("user");
  return sanitizeHandle(pathSegment) || sanitizeHandle(queryHandle);
}

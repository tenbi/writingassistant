import type { ResolvedSocialProfile } from "@/lib/types";
import { buildResolvedProfile, sanitizeHandle } from "@/lib/social/resolvers/shared";

export function resolveInstagramProfile(inputUrl: string): ResolvedSocialProfile {
  const url = new URL(inputUrl);
  const handle = getHandle(url);
  return buildResolvedProfile({
    platform: "instagram",
    inputUrl,
    handle,
    fallbackLabel: "Instagram",
    emptyProfileUrl: "https://www.instagram.com/",
    warningMessage:
      "Instagram の投稿 URL では user_id を取得できないことがあります。必要に応じて手動入力してください。",
    profileUrl: (userId) => `https://www.instagram.com/${userId}/`,
  });
}

function getHandle(url: URL): string {
  const pathSegment = url.pathname.split("/").filter(Boolean)[0];
  const queryHandle = url.searchParams.get("username");
  return sanitizeHandle(pathSegment) || sanitizeHandle(queryHandle);
}

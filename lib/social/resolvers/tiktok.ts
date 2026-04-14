import type { ResolvedSocialProfile } from "@/lib/types";
import { buildResolvedProfile, sanitizeHandle } from "@/lib/social/resolvers/shared";

export function resolveTikTokProfile(inputUrl: string): ResolvedSocialProfile {
  const url = new URL(inputUrl);
  const segments = url.pathname.split("/").filter(Boolean);
  const handleSegment = segments.find((segment) => segment.startsWith("@"));
  const queryHandle = url.searchParams.get("author") ?? url.searchParams.get("username");
  const handle = sanitizeHandle(handleSegment) || sanitizeHandle(queryHandle);
  return buildResolvedProfile({
    platform: "tiktok",
    inputUrl,
    handle,
    fallbackLabel: "TikTok",
    emptyProfileUrl: "https://www.tiktok.com/",
    warningMessage: "TikTok の URL から user_id を特定できなかったため、手動入力してください。",
    profileUrl: (userId) => `https://www.tiktok.com/@${userId}`,
  });
}

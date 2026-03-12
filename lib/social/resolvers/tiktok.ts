import type { ResolvedSocialProfile } from "@/lib/types";
import { normalizeSocialUrl } from "@/lib/social/normalize";
import { fallbackUserName, sanitizeHandle } from "@/lib/social/resolvers/shared";

export function resolveTikTokProfile(inputUrl: string): ResolvedSocialProfile {
  const url = new URL(inputUrl);
  const segments = url.pathname.split("/").filter(Boolean);
  const handleSegment = segments.find((segment) => segment.startsWith("@"));
  const queryHandle = url.searchParams.get("author") ?? url.searchParams.get("username");
  const handle = sanitizeHandle(handleSegment) || sanitizeHandle(queryHandle);
  const warnings = handle
    ? []
    : ["TikTok の URL から user_id を特定できなかったため、手動入力してください。"];

  return {
    platform: "tiktok",
    originalUrl: inputUrl,
    normalizedUrl: normalizeSocialUrl(inputUrl, "tiktok"),
    userId: handle,
    userName: fallbackUserName(handle, "TikTok"),
    profileUrl: handle ? `https://www.tiktok.com/@${handle}` : "https://www.tiktok.com/",
    viewCount: "",
    likeCount: "",
    warnings,
  };
}

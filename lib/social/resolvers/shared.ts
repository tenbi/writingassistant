import { normalizeSocialUrl } from "@/lib/social/normalize";
import type { ResolvedSocialProfile, SupportedPlatform } from "@/lib/types";

const RESERVED_SEGMENTS = new Set([
  "p",
  "reel",
  "reels",
  "tv",
  "explore",
  "share",
  "stories",
  "status",
  "post",
  "video",
  "photo",
  "embed",
  "i",
  "t",
]);

export function sanitizeHandle(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  const normalized = value.trim().replace(/^@/, "").replace(/[/?#].*$/, "");
  return RESERVED_SEGMENTS.has(normalized.toLowerCase()) ? "" : normalized;
}

export function fallbackUserName(userId: string, label: string): string {
  return userId || `${label}ユーザー名を入力`;
}

type BuildResolvedProfileParams = {
  platform: SupportedPlatform;
  inputUrl: string;
  handle: string;
  fallbackLabel: string;
  emptyProfileUrl: string;
  warningMessage: string;
  profileUrl: (handle: string) => string;
};

export function buildResolvedProfile({
  platform,
  inputUrl,
  handle,
  fallbackLabel,
  emptyProfileUrl,
  warningMessage,
  profileUrl,
}: BuildResolvedProfileParams): ResolvedSocialProfile {
  return {
    platform,
    originalUrl: inputUrl,
    normalizedUrl: normalizeSocialUrl(inputUrl, platform),
    userId: handle,
    userName: fallbackUserName(handle, fallbackLabel),
    profileUrl: handle ? profileUrl(handle) : emptyProfileUrl,
    viewCount: "",
    likeCount: "",
    warnings: handle ? [] : [warningMessage],
  };
}

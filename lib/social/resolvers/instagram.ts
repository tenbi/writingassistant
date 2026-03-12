import type { ResolvedSocialProfile } from "@/lib/types";
import { normalizeSocialUrl } from "@/lib/social/normalize";
import { fallbackUserName, sanitizeHandle } from "@/lib/social/resolvers/shared";

export function resolveInstagramProfile(inputUrl: string): ResolvedSocialProfile {
  const url = new URL(inputUrl);
  const handle = getHandle(url);
  const warnings = handle
    ? []
    : [
        "Instagram の投稿 URL では user_id を取得できないことがあります。必要に応じて手動入力してください。",
      ];

  return {
    platform: "instagram",
    originalUrl: inputUrl,
    normalizedUrl: normalizeSocialUrl(inputUrl, "instagram"),
    userId: handle,
    userName: fallbackUserName(handle, "Instagram"),
    profileUrl: handle ? `https://www.instagram.com/${handle}/` : "https://www.instagram.com/",
    warnings,
  };
}

function getHandle(url: URL): string {
  const pathSegment = url.pathname.split("/").filter(Boolean)[0];
  const queryHandle = url.searchParams.get("username");
  return sanitizeHandle(pathSegment) || sanitizeHandle(queryHandle);
}

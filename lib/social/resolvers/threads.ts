import type { ResolvedSocialProfile } from "@/lib/types";
import { normalizeSocialUrl } from "@/lib/social/normalize";
import { fallbackUserName, sanitizeHandle } from "@/lib/social/resolvers/shared";

export function resolveThreadsProfile(inputUrl: string): ResolvedSocialProfile {
  const url = new URL(inputUrl);
  const handle = getHandle(url);
  const warnings = handle
    ? []
    : ["Threads の URL から user_id を特定できなかったため、手動入力してください。"];

  return {
    platform: "threads",
    originalUrl: inputUrl,
    normalizedUrl: normalizeSocialUrl(inputUrl, "threads"),
    userId: handle,
    userName: fallbackUserName(handle, "Threads"),
    profileUrl: handle ? `https://www.threads.net/@${handle}` : "https://www.threads.net/",
    warnings,
  };
}

function getHandle(url: URL): string {
  const pathname = url.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const target = segments[0]?.startsWith("@") ? segments[0] : segments.find((segment) => segment.startsWith("@"));
  const queryHandle = url.searchParams.get("username");
  return sanitizeHandle(target) || sanitizeHandle(queryHandle);
}

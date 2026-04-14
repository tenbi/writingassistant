import type { ResolvedSocialProfile } from "@/lib/types";
import { buildResolvedProfile, sanitizeHandle } from "@/lib/social/resolvers/shared";

export function resolveThreadsProfile(inputUrl: string): ResolvedSocialProfile {
  const url = new URL(inputUrl);
  const handle = getHandle(url);
  return buildResolvedProfile({
    platform: "threads",
    inputUrl,
    handle,
    fallbackLabel: "Threads",
    emptyProfileUrl: "https://www.threads.net/",
    warningMessage: "Threads の URL から user_id を特定できなかったため、手動入力してください。",
    profileUrl: (userId) => `https://www.threads.net/@${userId}`,
  });
}

function getHandle(url: URL): string {
  const pathname = url.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const target = segments[0]?.startsWith("@") ? segments[0] : segments.find((segment) => segment.startsWith("@"));
  const queryHandle = url.searchParams.get("username");
  return sanitizeHandle(target) || sanitizeHandle(queryHandle);
}

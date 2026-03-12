import type { ResolvedSocialProfile } from "@/lib/types";
import { enrichDisplayName } from "@/lib/social/display-name";
import { detectPlatform } from "@/lib/social/platform";
import { resolveInstagramProfile } from "@/lib/social/resolvers/instagram";
import { resolveThreadsProfile } from "@/lib/social/resolvers/threads";
import { resolveTikTokProfile } from "@/lib/social/resolvers/tiktok";
import { resolveXProfile } from "@/lib/social/resolvers/x";

export async function resolveSocialProfile(inputUrl: string): Promise<ResolvedSocialProfile> {
  const platform = detectPlatform(inputUrl);
  const resolvedProfile = (() => {
    switch (platform) {
      case "x":
        return resolveXProfile(inputUrl);
      case "threads":
        return resolveThreadsProfile(inputUrl);
      case "instagram":
        return resolveInstagramProfile(inputUrl);
      case "tiktok":
        return resolveTikTokProfile(inputUrl);
      default:
        throw new Error("未対応のプラットフォームです。");
    }
  })();

  return enrichDisplayName(resolvedProfile);
}

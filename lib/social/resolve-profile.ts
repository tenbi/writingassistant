import type { ResolvedSocialProfile, SupportedPlatform } from "@/lib/types";
import { detectPlatform } from "@/lib/social/platform";
import { resolveInstagramProfile } from "@/lib/social/resolvers/instagram";
import { resolveThreadsProfile } from "@/lib/social/resolvers/threads";
import { resolveTikTokProfile } from "@/lib/social/resolvers/tiktok";
import { resolveXProfile } from "@/lib/social/resolvers/x";

const PROFILE_RESOLVERS: Record<SupportedPlatform, (inputUrl: string) => ResolvedSocialProfile> = {
  x: resolveXProfile,
  threads: resolveThreadsProfile,
  instagram: resolveInstagramProfile,
  tiktok: resolveTikTokProfile,
};

export function resolveSocialProfileBase(inputUrl: string): ResolvedSocialProfile {
  const platform = detectPlatform(inputUrl);
  return PROFILE_RESOLVERS[platform](inputUrl);
}

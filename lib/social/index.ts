import type { ResolvedSocialProfile } from "@/lib/types";
import { enrichDisplayName } from "@/lib/social/display-name";
import { resolveSocialProfileBase } from "@/lib/social/resolve-profile";

export async function resolveSocialProfile(inputUrl: string): Promise<ResolvedSocialProfile> {
  return enrichDisplayName(resolveSocialProfileBase(inputUrl));
}

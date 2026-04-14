import type { ResolvedSocialProfile } from "@/lib/types";

export const DISPLAY_NAME_MANUAL_EDIT_WARNING =
  "表示名の自動取得はできなかったため、必要に応じて user_name を手動で編集してください。";

export function appendWarning(profile: ResolvedSocialProfile, warning: string): ResolvedSocialProfile {
  const warnings = new Set(profile.warnings ?? []);
  warnings.add(warning);

  return {
    ...profile,
    warnings: Array.from(warnings),
  };
}

export function cleanupDisplayName(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/&#064;/g, "@")
    .replace(/^["'\s]+|["'\s]+$/g, "")
    .trim();
}

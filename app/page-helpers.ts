import { DISPLAY_NAME_MANUAL_EDIT_WARNING } from "@/lib/social/display-name-shared";
import { TEMPLATE_DEFINITIONS } from "@/lib/templates/config";
import type { ResolvedSocialProfile } from "@/lib/types";

export const SAMPLE_URLS = [
  { label: "X", url: "https://x.com/WhiteHouse/status/2026476098838532248" },
  { label: "Threads", url: "https://www.threads.com/@zuck/post/DLk8_example" },
  { label: "Instagram", url: "https://www.instagram.com/nasa/reel/DLk8_example/" },
  { label: "TikTok", url: "https://www.tiktok.com/@nba/video/7480000000000000000" },
];

export const DEFAULT_STATUS_MESSAGE =
  "URL を入力して解析すると、手動編集付きでテンプレートを生成できます。";
export const RESOLVING_STATUS_MESSAGE = "URL を解析しています。";
export const RESOLVED_STATUS_MESSAGE =
  "URL から情報を取得しました。必要なら下の項目を手動で編集できます。";
export const SAMPLE_URL_STATUS_MESSAGE =
  "サンプル URL を入力しました。解析ボタンで挙動を確認できます。";
export const COPIED_STATUS_MESSAGE = "生成テキストをクリップボードにコピーしました。";

const DISPLAY_NAME_ATTENTION_WARNING =
  "表示名が未入力か、取得値の精度に注意が必要です。必要に応じて手動で修正してください。";
const HIDDEN_WARNING_MESSAGES = new Set([DISPLAY_NAME_MANUAL_EDIT_WARNING]);

export function createInitialProfile(): ResolvedSocialProfile {
  return {
    platform: "x",
    originalUrl: "",
    normalizedUrl: "",
    userId: "",
    userName: "",
    profileUrl: "",
    viewCount: "",
    likeCount: "",
    warnings: [],
  };
}

export function createEmptyReactionUrls(): string[] {
  return Array.from({ length: 6 }, () => "");
}

export function getSelectedTemplate(templateId: string) {
  return TEMPLATE_DEFINITIONS.find((template) => template.id === templateId) ?? TEMPLATE_DEFINITIONS[0];
}

export function getReactionUrlsLabel(templateId: string): string {
  return templateId === "author-posts-summary" ? "他投稿のURL" : "ネットの反応URL";
}

export function getProfileWarnings(profile: ResolvedSocialProfile): string[] {
  return [
    ...(needsDisplayNameAttention(profile) ? [DISPLAY_NAME_ATTENTION_WARNING] : []),
    ...(profile.warnings ?? []).filter((warning) => !HIDDEN_WARNING_MESSAGES.has(warning)),
  ];
}

export function buildResolvedStatusMessage(profile: ResolvedSocialProfile): string {
  return profile.warnings?.length ? profile.warnings.join(" ") : RESOLVED_STATUS_MESSAGE;
}

export function needsDisplayNameAttention(profile: ResolvedSocialProfile): boolean {
  const normalizedUserName = profile.userName.trim().replace(/^@/, "").toLowerCase();
  const normalizedUserId = profile.userId.trim().replace(/^@/, "").toLowerCase();

  if (!normalizedUserName) {
    return true;
  }

  if (
    profile.platform === "threads" ||
    profile.platform === "instagram" ||
    profile.platform === "tiktok"
  ) {
    return !normalizedUserId || normalizedUserName === normalizedUserId;
  }

  return false;
}

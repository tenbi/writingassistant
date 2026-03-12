import { normalizeSocialUrl } from "@/lib/social/normalize";
import { detectPlatform } from "@/lib/social/platform";
import { PLATFORM_LABELS, getTemplateById } from "@/lib/templates/config";
import type { RenderTemplateRequest, TemplateVariables } from "@/lib/types";

export function renderTemplate({ templateId, profile, creditType, reactionUrls }: RenderTemplateRequest): string {
  const template = getTemplateById(templateId);
  const platformCopy = PLATFORM_LABELS[profile.platform];
  const userIdWithAt = ensureAtPrefix(profile.userId);
  const authorLabel = resolveAuthorLabel(profile.userName, userIdWithAt);
  const engagementCount = resolveCountValue(profile.viewCount);
  const likesCount = resolveCountValue(profile.likeCount);
  const reactionShortcodes = Array.from({ length: 6 }, (_, index) =>
    buildEmbedShortcodeFromInput(reactionUrls[index] ?? ""),
  );

  const variables: TemplateVariables = {
    platform: platformCopy.mediaLabel,
    platform_label: platformCopy.label,
    intro_platform_post_label: platformCopy.introPostLabel,
    platform_post_label: platformCopy.postLabel,
    service_name: platformCopy.label,
    author_label: authorLabel,
    engagement_count: engagementCount,
    engagement_label: profile.platform === "tiktok" ? "再生" : "表示",
    likes_count: likesCount,
    post_url: profile.normalizedUrl,
    embed_shortcode: buildEmbedShortcode(profile.platform, profile.normalizedUrl),
    embed_shortcode_1: reactionShortcodes[0],
    embed_shortcode_2: reactionShortcodes[1],
    embed_shortcode_3: reactionShortcodes[2],
    embed_shortcode_4: reactionShortcodes[3],
    embed_shortcode_5: reactionShortcodes[4],
    embed_shortcode_6: reactionShortcodes[5],
    display_name: authorLabel,
    display_name_link: buildDisplayNameLink(authorLabel, profile.profileUrl),
    normalized_url: profile.normalizedUrl,
    user_id: profile.userId,
    user_id_with_at: userIdWithAt,
    user_name: authorLabel,
    profile_url: profile.profileUrl,
    user_id_link: buildUserIdLink(userIdWithAt, profile.profileUrl),
    credit_text: buildCreditText(creditType, platformCopy.label, authorLabel, userIdWithAt, profile.profileUrl),
  };

  return template.content.replace(/\{\{(\w+)\}\}/g, (_, key: keyof TemplateVariables) => {
    return variables[key] ?? "";
  });
}

function buildUserIdLink(userIdWithAt: string, profileUrl: string): string {
  return `<a href="${escapeAttribute(profileUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(userIdWithAt)}</a>`;
}

function buildDisplayNameLink(displayName: string, profileUrl: string): string {
  return `<a href="${escapeAttribute(profileUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayName)}</a>`;
}

function buildQuoteCreditText(
  serviceName: string,
  displayName: string,
  userIdWithAt: string,
  profileUrl: string,
): string {
  return `画像は${escapeHtml(serviceName)}アカウント「${escapeHtml(displayName)}」（${buildUserIdLink(userIdWithAt, profileUrl)}）より引用`;
}

function buildPermissionCreditText(
  displayName: string,
  userIdWithAt: string,
  profileUrl: string,
): string {
  return `画像提供：${escapeHtml(displayName)}（${buildUserIdLink(userIdWithAt, profileUrl)}）さん`;
}

function buildCreditText(
  creditType: RenderTemplateRequest["creditType"],
  serviceName: string,
  displayName: string,
  userIdWithAt: string,
  profileUrl: string,
): string {
  return creditType === "permission"
    ? buildPermissionCreditText(displayName, userIdWithAt, profileUrl)
    : buildQuoteCreditText(serviceName, displayName, userIdWithAt, profileUrl);
}

function ensureAtPrefix(userId: string): string {
  return userId.startsWith("@") ? userId : `@${userId}`;
}

function resolveAuthorLabel(userName: string, userIdWithAt: string): string {
  const cleanedUserName = userName.trim();
  return cleanedUserName || userIdWithAt;
}

function resolveCountValue(value: string): string {
  const cleaned = value.trim();
  return cleaned || "____";
}

function buildEmbedShortcode(platform: RenderTemplateRequest["profile"]["platform"], normalizedUrl: string): string {
  switch (platform) {
    case "instagram":
      return `[insta_embed ${normalizedUrl}]`;
    case "threads":
      return `[threads_embed ${normalizedUrl}]`;
    case "tiktok":
      return `[tiktok_embed ${normalizedUrl}]`;
    case "x":
    default:
      return `[twitter_embed ${normalizedUrl}]`;
  }
}

function buildEmbedShortcodeFromInput(inputUrl: string): string {
  const trimmed = inputUrl.trim();

  if (!trimmed) {
    return "";
  }

  const platform = detectPlatform(trimmed);
  const normalizedUrl = normalizeSocialUrl(trimmed, platform);
  return buildEmbedShortcode(platform, normalizedUrl);
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

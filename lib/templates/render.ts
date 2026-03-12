import { PLATFORM_LABELS, getTemplateById } from "@/lib/templates/config";
import type { RenderTemplateRequest, TemplateVariables } from "@/lib/types";

export function renderTemplate({ templateId, profile, creditType }: RenderTemplateRequest): string {
  const template = getTemplateById(templateId);
  const platformCopy = PLATFORM_LABELS[profile.platform];
  const userIdWithAt = ensureAtPrefix(profile.userId);

  const variables: TemplateVariables = {
    platform: platformCopy.mediaLabel,
    platform_label: platformCopy.label,
    service_name: platformCopy.label,
    post_url: profile.normalizedUrl,
    embed_shortcode: `[twitter_embed ${profile.normalizedUrl}]`,
    display_name: profile.userName,
    display_name_link: buildDisplayNameLink(profile.userName, profile.profileUrl),
    normalized_url: profile.normalizedUrl,
    user_id: profile.userId,
    user_id_with_at: userIdWithAt,
    user_name: profile.userName,
    profile_url: profile.profileUrl,
    user_id_link: buildUserIdLink(userIdWithAt, profile.profileUrl),
    credit_text: buildCreditText(creditType, platformCopy.label, profile.userName, userIdWithAt, profile.profileUrl),
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

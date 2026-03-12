const RESERVED_SEGMENTS = new Set([
  "p",
  "reel",
  "reels",
  "tv",
  "explore",
  "share",
  "stories",
  "status",
  "post",
  "video",
  "photo",
  "embed",
  "i",
  "t",
]);

export function sanitizeHandle(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  const normalized = value.trim().replace(/^@/, "").replace(/[/?#].*$/, "");
  return RESERVED_SEGMENTS.has(normalized.toLowerCase()) ? "" : normalized;
}

export function fallbackUserName(userId: string, label: string): string {
  return userId || `${label}ユーザー名を入力`;
}

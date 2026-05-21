import type { SupportedPlatform } from "@/lib/types";

export function normalizeSocialUrl(inputUrl: string, platform: SupportedPlatform): string {
  const url = new URL(inputUrl);
  url.hash = "";
  url.search = "";

  if (platform === "x") {
    url.hostname = "twitter.com";
  }

  if (platform === "threads") {
    url.hostname = "www.threads.net";
  }

  if (platform === "instagram") {
    url.hostname = "www.instagram.com";
    url.pathname = normalizeInstagramPath(url.pathname);
  }

  url.pathname = cleanupPath(url.pathname);

  return url.toString();
}

function normalizeInstagramPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (isCanonicalInstagramPostPath(segments)) {
    return pathname;
  }

  const postTypeIndex = segments.findIndex((segment) =>
    ["p", "reel", "reels"].includes(segment.toLowerCase()),
  );

  if (postTypeIndex === -1) {
    return pathname;
  }

  const shortcode = segments[postTypeIndex + 1];
  return shortcode ? `/p/${shortcode}` : pathname;
}

function isCanonicalInstagramPostPath(segments: string[]): boolean {
  return segments.length === 2 && segments[0].toLowerCase() === "p" && Boolean(segments[1]);
}

function cleanupPath(pathname: string): string {
  const cleaned = pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "");
  return cleaned === "" ? "/" : cleaned;
}

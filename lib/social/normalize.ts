import type { SupportedPlatform } from "@/lib/types";

export function normalizeSocialUrl(inputUrl: string, platform: SupportedPlatform): string {
  const url = new URL(inputUrl);
  url.hash = "";
  url.search = "";

  if (platform === "x") {
    url.hostname = "twitter.com";
  }

  if (platform === "threads") {
    url.hostname = "threads.net";
  }

  url.pathname = cleanupPath(url.pathname);

  return url.toString();
}

function cleanupPath(pathname: string): string {
  const cleaned = pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "");
  return cleaned === "" ? "/" : cleaned;
}

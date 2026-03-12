import type { SupportedPlatform } from "@/lib/types";

const PLATFORM_HOSTS: Record<SupportedPlatform, string[]> = {
  x: ["x.com", "twitter.com", "www.x.com", "www.twitter.com", "mobile.twitter.com"],
  threads: ["threads.com", "threads.net", "www.threads.com", "www.threads.net"],
  instagram: ["instagram.com", "www.instagram.com"],
  tiktok: ["tiktok.com", "www.tiktok.com", "m.tiktok.com", "vm.tiktok.com"],
};

export function detectPlatform(inputUrl: string): SupportedPlatform {
  const hostname = new URL(inputUrl).hostname.toLowerCase();

  for (const [platform, hosts] of Object.entries(PLATFORM_HOSTS) as Array<
    [SupportedPlatform, string[]]
  >) {
    if (hosts.includes(hostname)) {
      return platform;
    }
  }

  throw new Error("対応していない SNS URL です。");
}

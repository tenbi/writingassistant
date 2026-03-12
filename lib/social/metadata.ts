import { execFile } from "node:child_process";
import { promisify } from "node:util";

type FetchedMetadata = {
  title: string;
  description: string;
  ogTitle: string;
  twitterTitle: string;
  html: string;
};

const execFileAsync = promisify(execFile);

export async function fetchSocialMetadata(targetUrl: string): Promise<FetchedMetadata | null> {
  try {
    const html = await fetchHtml(targetUrl);

    if (!html) {
      return null;
    }

    const metadata = buildMetadata(html);

    if (hasUsefulMetadata(metadata)) {
      return metadata;
    }

    const curlHtml = await fetchHtmlViaCurl(targetUrl);

    if (!curlHtml) {
      return metadata;
    }

    const curlMetadata = buildMetadata(curlHtml);
    return hasUsefulMetadata(curlMetadata) ? curlMetadata : metadata;
  } catch {
    return null;
  }
}

export async function fetchSocialMetadataViaCurl(targetUrl: string): Promise<FetchedMetadata | null> {
  const html = await fetchHtmlViaCurl(targetUrl);

  if (!html) {
    return null;
  }

  return buildMetadata(html);
}

async function fetchHtml(targetUrl: string): Promise<string | null> {
  try {
    const response = await fetch(targetUrl, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml",
        "accept-language": "en-US,en;q=0.9,ja;q=0.8",
      },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
      redirect: "follow",
    });

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch {
    return null;
  }
}

async function fetchHtmlViaCurl(targetUrl: string): Promise<string | null> {
  try {
    const result = await execFileAsync("/usr/bin/curl", [
      "-Ls",
      "-A",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "-H",
      "Accept-Language: en-US,en;q=0.9,ja;q=0.8",
      targetUrl,
    ]);

    return result.stdout;
  } catch {
    return null;
  }
}

function buildMetadata(html: string): FetchedMetadata {
  return {
    title: extractTagContent(html, "title"),
    description: extractMetaContent(html, "name", "description"),
    ogTitle: extractMetaContent(html, "property", "og:title"),
    twitterTitle: extractMetaContent(html, "name", "twitter:title"),
    html,
  };
}

function hasUsefulMetadata(metadata: FetchedMetadata): boolean {
  return Boolean(metadata.ogTitle || metadata.twitterTitle || metadata.description || metadata.title);
}

function extractTagContent(html: string, tagName: string): string {
  const pattern = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = html.match(pattern);
  return decodeHtmlEntities(match?.[1] ?? "").trim();
}

function extractMetaContent(html: string, attribute: "name" | "property", key: string): string {
  const pattern = new RegExp(
    `<meta[^>]+${attribute}=["']${escapeRegex(key)}["'][^>]+content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  const reversePattern = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+${attribute}=["']${escapeRegex(key)}["'][^>]*>`,
    "i",
  );
  const match = html.match(pattern) ?? html.match(reversePattern);
  return decodeHtmlEntities(match?.[1] ?? "").trim();
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

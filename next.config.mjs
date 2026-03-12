const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "writingassistant";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubActions ? `/${repoName}` : "",
  assetPrefix: isGitHubActions ? `/${repoName}/` : "",
};

export default nextConfig;

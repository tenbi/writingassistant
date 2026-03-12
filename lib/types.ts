export type SupportedPlatform = "x" | "threads" | "instagram" | "tiktok";

export type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  content: string;
};

export type ResolvedSocialProfile = {
  platform: SupportedPlatform;
  originalUrl: string;
  normalizedUrl: string;
  userId: string;
  userName: string;
  profileUrl: string;
  viewCount: string;
  likeCount: string;
  warnings?: string[];
};

export type ResolveSocialRequest = {
  url: string;
};

export type ResolveSocialResponse = {
  ok: boolean;
  data?: ResolvedSocialProfile;
  error?: string;
};

export type CreditType = "quote" | "permission";

export type RenderTemplateRequest = {
  templateId: string;
  profile: ResolvedSocialProfile;
  creditType: CreditType;
  reactionUrls: string[];
};

export type RenderTemplateResponse = {
  ok: boolean;
  output?: string;
  error?: string;
};

export type TemplateVariables = {
  platform: string;
  platform_label: string;
  intro_platform_post_label: string;
  platform_post_label: string;
  service_name: string;
  author_label: string;
  engagement_count: string;
  engagement_label: string;
  likes_count: string;
  post_url: string;
  embed_shortcode: string;
  embed_shortcode_1: string;
  embed_shortcode_2: string;
  embed_shortcode_3: string;
  embed_shortcode_4: string;
  embed_shortcode_5: string;
  embed_shortcode_6: string;
  display_name: string;
  display_name_link: string;
  normalized_url: string;
  user_id: string;
  user_id_with_at: string;
  user_name: string;
  profile_url: string;
  user_id_link: string;
  credit_text: string;
};

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
};

export type RenderTemplateResponse = {
  ok: boolean;
  output?: string;
  error?: string;
};

export type TemplateVariables = {
  platform: string;
  platform_label: string;
  platform_post_label: string;
  service_name: string;
  author_label: string;
  post_url: string;
  embed_shortcode: string;
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

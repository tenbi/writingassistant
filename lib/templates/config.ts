import type { SupportedPlatform, TemplateDefinition } from "@/lib/types";

export const PLATFORM_LABELS: Record<
  SupportedPlatform,
  { label: string; mediaLabel: string; introPostLabel: string; postLabel: string }
> = {
  x: {
    label: "X",
    mediaLabel: "X公式アカウント",
    introPostLabel: "X（旧Twitter）",
    postLabel: "X",
  },
  threads: {
    label: "Threads",
    mediaLabel: "Threads公式アカウント",
    introPostLabel: "Threads",
    postLabel: "Threads",
  },
  instagram: {
    label: "Instagram",
    mediaLabel: "Instagram公式アカウント",
    introPostLabel: "Instagram",
    postLabel: "Instagram",
  },
  tiktok: {
    label: "TikTok",
    mediaLabel: "TikTok公式アカウント",
    introPostLabel: "TikTok",
    postLabel: "TikTok",
  },
};

export const TEMPLATE_DEFINITIONS: TemplateDefinition[] = [
  {
    id: "reactions-summary",
    name: "ネットの反応を見る",
    description: "反応まとめ用の固定文面テンプレートに、URL由来の情報だけ差し込みます。",
    content: `<!-- wp:paragraph -->
<p>　hogehoge。そんなhogehogeをとらえた写真が、{{intro_platform_post_label}}で注目を集めています。記事執筆時点で投稿は{{engagement_count}}回以上{{engagement_label}}され、およそ{{likes_count}}件の「いいね」を獲得しています。</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:heading -->
<h2 class="wp-block-heading">見出し1</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　投稿者は、{{platform_post_label}}ユーザーの{{display_name}}（{{user_id_link}}）さん。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　段落2つ目</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　段落3つ目</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">見出し2</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　段落4つ目</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　段落5つ目</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">ネットの反応を見る</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_1}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_2}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_3}}"} /-->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">{{credit_text}}</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[next_pagelink]【画像】hogehoge[/next_pagelink]
<!-- /wp:shortcode -->

<!-- wp:nextpage -->
<!--nextpage-->
<!-- /wp:nextpage -->

<!-- wp:heading -->
<h2 class="wp-block-heading">見出し</h2>
<!-- /wp:heading -->

<!-- wp:heading -->
<h2 class="wp-block-heading">話題の投稿</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">{{credit_text}}</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">ネットの反応を見る</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_4}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_5}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_6}}"} /-->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->`,
  },
  {
    id: "author-posts-summary",
    name: "投稿者の他投稿まとめ",
    description: "投稿者の他投稿導線に寄せた固定文面テンプレートに、URL由来の情報だけ差し込みます。",
    content: `<!-- wp:paragraph -->
<p>　hogehoge。そんなhogehogeをとらえた写真が、{{intro_platform_post_label}}で注目を集めています。記事執筆時点で投稿は{{engagement_count}}回以上{{engagement_label}}され、およそ{{likes_count}}件の「いいね」を獲得しています。</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:heading -->
<h2 class="wp-block-heading">見出し1</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　投稿者は、{{platform_post_label}}ユーザーの{{display_name}}（{{user_id_link}}）さん。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　段落2つ目</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　段落3つ目</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">見出し2</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　段落4つ目</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　段落5つ目</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">{{author_label}}さんの投稿をもっと見る</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_1}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_2}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_3}}"} /-->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">{{credit_text}}</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[next_pagelink]【SNSの反応をもっと見る】hogehoge[/next_pagelink]
<!-- /wp:shortcode -->

<!-- wp:nextpage -->
<!--nextpage-->
<!-- /wp:nextpage -->

<!-- wp:heading -->
<h2 class="wp-block-heading">見出し</h2>
<!-- /wp:heading -->

<!-- wp:heading -->
<h2 class="wp-block-heading">話題の投稿</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">{{credit_text}}</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">{{author_label}}さんの投稿をもっと見る</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_4}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_5}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_6}}"} /-->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->`,
  },
];

export function getTemplateById(templateId: string): TemplateDefinition {
  const template = TEMPLATE_DEFINITIONS.find((item) => item.id === templateId);

  if (!template) {
    throw new Error("指定されたテンプレートが見つかりませんでした。");
  }

  return template;
}

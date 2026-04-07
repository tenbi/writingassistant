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
    usesReactionUrls: true,
    content: `<!-- wp:paragraph -->
<p>　○○（※ネタバレをしないように内容を要約）が、{{intro_platform_post_label}}で話題です。{{engagement_count}}回以上{{engagement_label}}され、およそ{{likes_count}}件の「いいね」を獲得しています。</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:heading -->
<h2 class="wp-block-heading">※ネタバレをしない見出しを入れてください※</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　投稿したのは、{{platform_post_label}}ユーザーの{{display_name}}（{{user_id_link}}）さん。普段は□□や□□を投稿しています。（また、以前は□□が注目を集めました。※過去記事がある場合）</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　今回話題を呼んだのは、～～</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">※内容を紹介する見出し※</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　～～～～～～。（内容ごとに自由記述／画像・投稿の埋め込みも適宜）</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">「」「」と反響</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　この投稿に対し、{{platform_post_label}}では「」「」「」「」「」などの声が寄せられました。（また、「」「」「」などの声も上がっています。）</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　{{display_name}}さんはこの他にも、□□や□□などで情報を発信中。～～を見ることができます。</p>
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
[next_pagelink]2p目ボタンの文言を書く[/next_pagelink]
<!-- /wp:shortcode -->

<!-- wp:nextpage -->
<!--nextpage-->
<!-- /wp:nextpage -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading -->
<h2 class="wp-block-heading">※メインの投稿にひとこと【見出し】※</h2>
<!-- /wp:heading -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading -->
<h2 class="wp-block-heading">話題の投稿</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading -->
<h2 class="wp-block-heading">ネットの反応を見る</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_4}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_5}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_6}}"} /-->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">{{credit_text}}</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading {"className":"noindex"} -->
<h2 class="wp-block-heading noindex">この記事を読んだ人におすすめ</h2>
<!-- /wp:heading -->

<!-- wp:tk/nlabogp-block -->
<div class="wp-block-tk-nlabogp-block"><a class="nlab_ogpcard_link" target="_blank" rel="noopener noreferrer"><div class="nlab_ogpcard__detail-col"><div class="nlab_ogpcard__content"><div class="nlab_ogpcard__title"></div><div class="nlab_ogpcard__description">                                          </div></div><div class="nlab_ogpcard__domain">                                          </div></div></a></div>
<!-- /wp:tk/nlabogp-block -->

<!-- wp:tk/nlabogp-block -->
<div class="wp-block-tk-nlabogp-block"><a class="nlab_ogpcard_link" target="_blank" rel="noopener noreferrer"><div class="nlab_ogpcard__detail-col"><div class="nlab_ogpcard__content"><div class="nlab_ogpcard__title"></div><div class="nlab_ogpcard__description">                                          </div></div><div class="nlab_ogpcard__domain">                                          </div></div></a></div>
<!-- /wp:tk/nlabogp-block -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->`,
  },
  {
    id: "author-posts-summary",
    name: "投稿者の他投稿をもっと見る",
    description: "投稿者の他投稿導線に寄せた固定文面テンプレートに、URL由来の情報だけ差し込みます。",
    usesReactionUrls: true,
    content: `<!-- wp:paragraph -->
<p>　○○（※ネタバレをしないように内容を要約）が、{{intro_platform_post_label}}で話題です。{{engagement_count}}回以上{{engagement_label}}され、およそ{{likes_count}}件の「いいね」を獲得しています。</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:heading -->
<h2 class="wp-block-heading">※ネタバレをしない見出しを入れてください※</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　投稿したのは、{{platform_post_label}}ユーザーの{{display_name}}（{{user_id_link}}）さん。普段は□□や□□を投稿しています。（また、以前は□□が注目を集めました。※過去記事がある場合）</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　今回話題を呼んだのは、～～</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">※内容を紹介する見出し※</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　～～～～～～。（内容ごとに自由記述／画像・投稿の埋め込みも適宜）</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">「」「」と反響</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　この投稿に対し、{{platform_post_label}}では「」「」「」「」「」などの声が寄せられました。（また、「」「」「」などの声も上がっています。）</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　{{display_name}}さんはこの他にも、□□や□□などで情報を発信中。～～を見ることができます。</p>
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
[next_pagelink]2p目ボタンの文言を書く[/next_pagelink]
<!-- /wp:shortcode -->

<!-- wp:nextpage -->
<!--nextpage-->
<!-- /wp:nextpage -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading -->
<h2 class="wp-block-heading">※メインの投稿にひとこと【見出し】※</h2>
<!-- /wp:heading -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading -->
<h2 class="wp-block-heading">話題の投稿</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading -->
<h2 class="wp-block-heading">{{author_label}}さんの投稿をもっと見る</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_4}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_5}}"} /-->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode_6}}"} /-->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">{{credit_text}}</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading {"className":"noindex"} -->
<h2 class="wp-block-heading noindex">この記事を読んだ人におすすめ</h2>
<!-- /wp:heading -->

<!-- wp:tk/nlabogp-block -->
<div class="wp-block-tk-nlabogp-block"><a class="nlab_ogpcard_link" target="_blank" rel="noopener noreferrer"><div class="nlab_ogpcard__detail-col"><div class="nlab_ogpcard__content"><div class="nlab_ogpcard__title"></div><div class="nlab_ogpcard__description">                                          </div></div><div class="nlab_ogpcard__domain">                                          </div></div></a></div>
<!-- /wp:tk/nlabogp-block -->

<!-- wp:tk/nlabogp-block -->
<div class="wp-block-tk-nlabogp-block"><a class="nlab_ogpcard_link" target="_blank" rel="noopener noreferrer"><div class="nlab_ogpcard__detail-col"><div class="nlab_ogpcard__content"><div class="nlab_ogpcard__title"></div><div class="nlab_ogpcard__description">                                          </div></div><div class="nlab_ogpcard__domain">                                          </div></div></a></div>
<!-- /wp:tk/nlabogp-block -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->`,
  },
  {
    id: "republish-first-page",
    name: "1p目の画像・投稿を再掲",
    description: "1ページ目の投稿を2ページ目でも再掲する固定文面テンプレートです。",
    usesReactionUrls: false,
    content: `<!-- wp:paragraph -->
<p>　○○（※ネタバレをしないように内容を要約）が、{{intro_platform_post_label}}で話題です。{{engagement_count}}回以上{{engagement_label}}され、およそ{{likes_count}}件の「いいね」を獲得しています。</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:heading -->
<h2 class="wp-block-heading">※ネタバレをしない見出しを入れてください※</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　投稿したのは、{{platform_post_label}}ユーザーの{{display_name}}（{{user_id_link}}）さん。普段は□□や□□を投稿しています。（また、以前は□□が注目を集めました。※過去記事がある場合）</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　今回話題を呼んだのは、～～</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">※内容を紹介する見出し※</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　～～～～～～。（内容ごとに自由記述／画像・投稿の埋め込みも適宜）</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">「」「」と反響</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>　この投稿に対し、{{platform_post_label}}では「」「」「」「」「」などの声が寄せられました。（また、「」「」「」などの声も上がっています。）</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>　{{display_name}}さんはこの他にも、□□や□□などで情報を発信中。～～を見ることができます。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">{{credit_text}}</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[next_pagelink]2p目ボタンの文言を書く[/next_pagelink]
<!-- /wp:shortcode -->

<!-- wp:nextpage -->
<!--nextpage-->
<!-- /wp:nextpage -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading -->
<h2 class="wp-block-heading">※メインの投稿にひとこと【見出し】※</h2>
<!-- /wp:heading -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading -->
<h2 class="wp-block-heading">話題の投稿</h2>
<!-- /wp:heading -->

<!-- wp:shortcode-preview/shortcode-preview {"shortcodeText":"{{embed_shortcode}}"} /-->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">{{credit_text}}</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->

<!-- wp:heading {"className":"noindex"} -->
<h2 class="wp-block-heading noindex">この記事を読んだ人におすすめ</h2>
<!-- /wp:heading -->

<!-- wp:tk/nlabogp-block -->
<div class="wp-block-tk-nlabogp-block"><a class="nlab_ogpcard_link" target="_blank" rel="noopener noreferrer"><div class="nlab_ogpcard__detail-col"><div class="nlab_ogpcard__content"><div class="nlab_ogpcard__title"></div><div class="nlab_ogpcard__description">                                          </div></div><div class="nlab_ogpcard__domain">                                          </div></div></a></div>
<!-- /wp:tk/nlabogp-block -->

<!-- wp:tk/nlabogp-block -->
<div class="wp-block-tk-nlabogp-block"><a class="nlab_ogpcard_link" target="_blank" rel="noopener noreferrer"><div class="nlab_ogpcard__detail-col"><div class="nlab_ogpcard__content"><div class="nlab_ogpcard__title"></div><div class="nlab_ogpcard__description">                                          </div></div><div class="nlab_ogpcard__domain">                                          </div></div></a></div>
<!-- /wp:tk/nlabogp-block -->

<!-- wp:shortcode -->
[page_btn 1]記事を読む[/page_btn]
<!-- /wp:shortcode -->`,
  },
];

export function getTemplateById(templateId: string): TemplateDefinition {
  const template = TEMPLATE_DEFINITIONS.find((item) => item.id === templateId);

  if (!template) {
    throw new Error("指定されたテンプレートが見つかりませんでした。");
  }

  return template;
}

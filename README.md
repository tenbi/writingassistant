# writingassistant

SNS 投稿 URL から、WordPress ブロックエディタ向けのテンプレート本文を生成する Next.js + TypeScript の Web アプリです。

## 概要

このアプリは、X / Threads / Instagram / TikTok の投稿 URL を解析し、媒体掲載向けの固定テンプレートへ必要な情報を差し込んで出力します。

現時点では、以下の情報を扱います。

- `platform`
- `normalizedUrl`
- `userId`
- `userName`
- `profileUrl`

テンプレートは可変生成ではなく、固定文面の決まった位置に URL 由来の情報を差し込む方式です。

## 現在できること

- Next.js App Router ベースの Web UI
- 投稿 URL の platform 判定と正規化
- X / Threads / Instagram / TikTok の resolver
- テンプレート選択
  - `ネットの反応を見る`
  - `投稿者の他投稿まとめ`
- クレジット種別の切り替え
  - `引用`
  - `許諾あり`
- 解析結果の手動編集
  - `platform`
  - `normalized_url`
  - `user_id`
  - `user_name`
  - `profile_url`
- 生成テキストのプレビューとコピー
- 媒体別の embed shortcode 出力
  - X: `[twitter_embed {url}]`
  - Instagram: `[insta_embed {url}]`
  - Threads: `[threads_embed {url}]`
  - TikTok: `[tiktok_embed {url}]`

## 表示名取得の現状

- X は `oEmbed` を使って比較的安定して表示名を取得できます。
- Threads / Instagram は投稿 URL からの表示名自動取得が不安定です。
- TikTok は handle 解決はできますが、表示名取得は未強化です。

そのため、Threads / Instagram では `user_name` の手動補完が前提になる場合があります。

## 投稿指標の取得

- `表示回数`
- `いいね数`

は自動取得ではなく、UI 上で手動入力する前提です。

TikTok の場合は `表示回数` ではなく `再生数` として扱います。

## 使い方

### 1. 依存関係をインストール

```bash
npm install
```

### 2. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

### 3. URL を解析

1. テンプレートを選ぶ
2. クレジット種別を選ぶ
3. SNS 投稿 URL を入力する
4. `URLを解析` を押す

### 4. 必要なら手動で修正

左カラムのプロフィール情報を必要に応じて編集します。

- `user_name` が期待どおりでない場合は手動修正
- `profile_url` から元プロフィールを開いて確認可能

### 5. 生成結果をコピー

右カラムの生成結果を確認し、`コピー` ボタンで使用します。

## ビルド

本番ビルド確認は以下です。

```bash
npm run build
```

注意:

- `npm run dev` 実行中に `npm run build` を同じ `.next` に対して並行実行すると、生成物が競合して不整合が出ることがあります。
- ビルド確認するときは、開発サーバーを止めてから実行するのが安全です。

## 現時点の制約

- テンプレート本文にはまだ仮文言が残っています。
- Threads / Instagram の表示名取得はベストエフォートです。
- shortcode の種類は出し分けていますが、実際の WordPress 側 shortcode 実装との最終整合は別途確認が必要です。
- 大きく作り変える前提ではなく、固定テンプレート方式を維持して改善していく方針です。

## 主要ファイル

- `app/page.tsx`
- `app/api/resolve-social/route.ts`
- `app/api/render-template/route.ts`
- `lib/social/*`
- `lib/templates/config.ts`
- `lib/templates/render.ts`
- `docs/display-name-strategy.md`
- `docs/implementation-plan.md`

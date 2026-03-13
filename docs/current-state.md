# Current State

## アプリ概要

このアプリは、SNS 投稿 URL から WordPress ブロックエディタ向けの固定テンプレート本文を生成する Next.js アプリです。

対象プラットフォーム:

- X
- Threads
- Instagram
- TikTok

## 現在の UI

- テンプレート選択
- クレジット種別切り替え
- 投稿 URL 入力
- サンプル URL ボタン
- 反応 URL / 他投稿 URL の複数入力
- プロフィール情報の手動編集
- 生成結果プレビュー
- クリップボードコピー

## 現在のテンプレート

- `ネットの反応を見る`
- `投稿者の他投稿をもっと見る`
- `1p目の画像・投稿を再掲`

## 現在の実装方針

- 固定テンプレートに URL 由来の値を差し込む
- 自動取得しきれない項目は UI で手動補完する
- GitHub Pages 公開を前提に、ブラウザ上で完結する構成を優先する

## 現在の主要ファイル

- `app/page.tsx`
- `app/globals.css`
- `lib/social/client.ts`
- `lib/social/normalize.ts`
- `lib/social/resolvers/x.ts`
- `lib/social/resolvers/threads.ts`
- `lib/social/resolvers/instagram.ts`
- `lib/social/resolvers/tiktok.ts`
- `lib/templates/config.ts`
- `lib/templates/render.ts`
- `lib/types.ts`

## 補足

表示名取得の詳細な検討メモは `display-name-strategy.md` を参照。

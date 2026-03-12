# Implementation Plan

## 現在の実装状況

### 完了

- Next.js App Router の最小構成
- `app/page.tsx` の UI
- `/api/resolve-social`
- `/api/render-template`
- platform 判定
- URL 正規化
- テンプレート変数置換
- X / Threads / Instagram / TikTok の resolver 雛形
- `user_id`, `user_name`, `profile_url` の手動編集 UI
- X の表示名取得
- サンプル URL ボタン

### 未完了または不安定

- Threads の表示名自動取得
- Instagram の表示名自動取得
- Threads / Instagram の実在投稿 URL による安定検証
- TikTok の表示名自動取得
- テンプレートは仮のまま

## 現時点の詰まりポイント

### Threads

- 公開 profile HTML には `og:title` として表示名が見えるケースがある
- ただし route 実行時の取得経路で安定して反映できていない
- 投稿 URL 単体の公開 metadata は profile URL よりさらに弱い

### Instagram

- profile metadata には表示名相当が含まれるケースがある
- 投稿 URL から handle が取れないケースもある
- 匿名サーバーサイド取得だけだと安定しない

## 次の実装候補

### A. ベストエフォート路線を完成させる

1. Threads / Instagram で実在する公開投稿 URL の固定サンプルを用意する
2. route 内で取得した raw metadata を一時ログ出力できるようにする
3. 文字列抽出ロジックを媒体別にテスト化する
4. `user_name` 未取得時の UI 補助を強化する

### B. ブラウザ依存路線へ切り替える

1. ログイン済みブラウザから情報を読む方式を決める
2. Playwright か拡張機能のどちらを使うか決定する
3. Threads / Instagram をクライアント補助で再解決する
4. サーバー側は fallback として残す

## おすすめの進め方

### 短期

以下を先にやると実運用しやすい。

1. Threads / Instagram の未取得状態を UI 上で明確化する
2. `profileUrl` を開いてコピペ補完しやすくする
3. テンプレート仕様を確定する

### 中期

表示名の完全自動化が必要なら、Threads / Instagram だけブラウザ依存取得に切り替える。

## 主要ファイル

- `app/page.tsx`
- `app/api/resolve-social/route.ts`
- `app/api/render-template/route.ts`
- `lib/social/index.ts`
- `lib/social/platform.ts`
- `lib/social/normalize.ts`
- `lib/social/display-name.ts`
- `lib/social/metadata.ts`
- `lib/social/resolvers/x.ts`
- `lib/social/resolvers/threads.ts`
- `lib/social/resolvers/instagram.ts`
- `lib/social/resolvers/tiktok.ts`
- `lib/templates/render.ts`
- `lib/templates/config.ts`

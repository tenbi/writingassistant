# writingassistant

SNS 投稿 URL から、WordPress ブロックエディタ向けのテンプレート本文を生成する GitHub Pages 対応の Web アプリです。

## アプリ概要

このアプリでは、X / Threads / Instagram / TikTok の投稿 URL をもとに、媒体掲載向けの固定テンプレートを出力できます。

- テンプレートを選ぶ
- クレジット種別を選ぶ
- SNS 投稿 URL を入力する
- 必要ならプロフィール情報を手動で整える
- 生成結果をコピーして使う

URL から取得した情報は左カラムで編集できるので、自動取得しきれない項目があってもそのまま補正できます。

## GitHub Pages での使い方

公開中の GitHub Pages を開いて、そのままブラウザ上で使えます。

1. GitHub Pages の公開 URL にアクセスする
2. テンプレートを選ぶ
3. クレジット種別を選ぶ
4. SNS 投稿 URL を入力して `テンプレートを出力` を押す
5. 必要に応じて `ユーザーID` `表示名` `プロフィールURL` などを修正する
6. 右側の生成結果を確認して `コピー` を押す

## できること

- X / Threads / Instagram / TikTok の投稿 URL 入力
- URL の正規化とプラットフォーム判定
- テンプレート切り替え
- クレジット種別切り替え
- 解析結果の手動編集
- WordPress 向けテンプレートテキストの生成
- 生成結果のコピー

## ドキュメント

内部向けメモや制約、現状、ロードマップは [docs/README.md](/Users/tenbi/Documents/GPT%20Codex/Writing%20Assistant/docs/README.md) にまとめています。

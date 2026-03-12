"use client";

import { useEffect, useState } from "react";
import { resolveSocialProfileClient } from "@/lib/social/client";
import { TEMPLATE_DEFINITIONS } from "@/lib/templates/config";
import { renderTemplate } from "@/lib/templates/render";
import type { CreditType, ResolvedSocialProfile, SupportedPlatform } from "@/lib/types";

const SAMPLE_URLS = [
  { label: "X", url: "https://x.com/WhiteHouse/status/2026476098838532248" },
  { label: "Threads", url: "https://www.threads.com/@zuck/post/DLk8_example" },
  { label: "Instagram", url: "https://www.instagram.com/nasa/reel/DLk8_example/" },
  { label: "TikTok", url: "https://www.tiktok.com/@nba/video/7480000000000000000" },
];

const INITIAL_PROFILE: ResolvedSocialProfile = {
  platform: "x",
  originalUrl: "",
  normalizedUrl: "",
  userId: "",
  userName: "",
  profileUrl: "",
  viewCount: "",
  likeCount: "",
  warnings: [],
};

const EMPTY_REACTION_URLS = Array.from({ length: 6 }, () => "");

export default function Page() {
  const [templateId, setTemplateId] = useState(TEMPLATE_DEFINITIONS[0].id);
  const [inputUrl, setInputUrl] = useState("");
  const [profile, setProfile] = useState<ResolvedSocialProfile>(INITIAL_PROFILE);
  const [reactionUrls, setReactionUrls] = useState<string[]>(EMPTY_REACTION_URLS);
  const [creditType, setCreditType] = useState<CreditType>("permission");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState(
    "URL を入力して解析すると、手動編集付きでテンプレートを生成できます。",
  );
  const [isResolving, setIsResolving] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [copyToastVisible, setCopyToastVisible] = useState(false);
  const selectedTemplate =
    TEMPLATE_DEFINITIONS.find((template) => template.id === templateId) ?? TEMPLATE_DEFINITIONS[0];
  const displayNameNeedsAttention = needsDisplayNameAttention(profile);

  useEffect(() => {
    void generateOutput();
  }, [templateId, profile, creditType, reactionUrls]);

  useEffect(() => {
    if (!copyToastVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopyToastVisible(false);
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [copyToastVisible]);

  async function handleResolve() {
    setIsResolving(true);
    setStatus("URL を解析しています。");

    try {
      const data = await resolveSocialProfileClient(inputUrl);
      setProfile(data);
      setStatus(
        data.warnings?.length
          ? data.warnings.join(" ")
          : "URL から情報を取得しました。必要なら下の項目を手動で編集できます。",
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "URL の解析に失敗しました。";
      setStatus(message);
    } finally {
      setIsResolving(false);
    }
  }

  async function generateOutput() {
    if (!profile.normalizedUrl || !profile.userId || !profile.profileUrl) {
      setOutput("");
      return;
    }

    setIsRendering(true);

    try {
      const rendered = renderTemplate({
        templateId,
        profile,
        creditType,
        reactionUrls,
      });

      setOutput(rendered);
    } catch (error) {
      const message = error instanceof Error ? error.message : "テンプレートの生成に失敗しました。";
      setStatus(message);
    } finally {
      setIsRendering(false);
    }
  }

  async function handleCopy() {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
    setStatus("生成テキストをクリップボードにコピーしました。");
    setCopyToastVisible(true);
  }

  function updateProfile<K extends keyof ResolvedSocialProfile>(key: K, value: ResolvedSocialProfile[K]) {
    setProfile((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function applySampleUrl(sampleUrl: string) {
    setInputUrl(sampleUrl);
    setStatus("サンプル URL を入力しました。解析ボタンで挙動を確認できます。");
  }

  function updateReactionUrl(index: number, value: string) {
    setReactionUrls((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  return (
    <main className="page">
      <section className="hero">
        <h1>SNS URL Template Generator</h1>
        <p>
          X / Threads / Instagram / TikTok の投稿 URL から、媒体掲載向けの WordPress
          ブロックエディタ用テキストを生成します。URL 解析後の値はそのまま手動調整できます。
        </p>
      </section>

      <section className="grid">
        <div className="panel stack">
          <div className="field">
            <label>テンプレート</label>
            <div className="choiceGrid">
              {TEMPLATE_DEFINITIONS.map((template) => (
                <label key={template.id} className={`choiceCard${templateId === template.id ? " active" : ""}`}>
                  <input
                    type="radio"
                    name="templateId"
                    value={template.id}
                    checked={templateId === template.id}
                    onChange={() => setTemplateId(template.id)}
                  />
                  <span className="choiceTitle">{template.name}</span>
                  <span className="choiceDescription">{template.description}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label>クレジット種別</label>
            <div className="choiceGrid compact">
              <label className={`choiceCard compact${creditType === "quote" ? " active" : ""}`}>
                <input
                  type="radio"
                  name="creditType"
                  value="quote"
                  checked={creditType === "quote"}
                  onChange={() => setCreditType("quote")}
                />
                <span className="choiceTitle">引用</span>
              </label>
              <label className={`choiceCard compact${creditType === "permission" ? " active" : ""}`}>
                <input
                  type="radio"
                  name="creditType"
                  value="permission"
                  checked={creditType === "permission"}
                  onChange={() => setCreditType("permission")}
                />
                <span className="choiceTitle">許諾あり</span>
              </label>
            </div>
          </div>

          <div className="field">
            <label htmlFor="inputUrl">SNS投稿URL</label>
            <input
              id="inputUrl"
              className="input"
              type="url"
              placeholder="https://x.com/username/status/1234567890"
              value={inputUrl}
              onChange={(event) => setInputUrl(event.target.value)}
            />
            <span>投稿 URL でも解析します。取得しきれない値は下で手動編集できます。</span>
          </div>

          <div className="field">
            <label>サンプルURL</label>
            <div className="chips">
              {SAMPLE_URLS.map((sample) => (
                <button
                  key={sample.label}
                  className="chip"
                  type="button"
                  onClick={() => applySampleUrl(sample.url)}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {selectedTemplate.usesReactionUrls !== false ? (
            <div className="field">
              <label>ネットの反応URL</label>
              <div className="stack">
                {reactionUrls.map((reactionUrl, index) => (
                  <input
                    key={`reaction-url-${index + 1}`}
                    id={`reactionUrl${index + 1}`}
                    className="input"
                    type="url"
                    placeholder={`https://example.com/post/${index + 1}`}
                    value={reactionUrl}
                    onChange={(event) => updateReactionUrl(index, event.target.value)}
                  />
                ))}
              </div>
              <span>空欄は未挿入になります。入力したURLは既存ルールで正規化して shortcode-preview に差し込みます。</span>
            </div>
          ) : null}

          <button className="button" type="button" onClick={handleResolve} disabled={isResolving}>
            {isResolving ? "解析中..." : "URLを解析"}
          </button>

          <div className="profileSection">
            <h2 className="sectionTitle">編集可能なプロフィール情報</h2>

            <div className="field">
              <label htmlFor="platform">プラットフォーム</label>
              <select
                id="platform"
                className="select"
                value={profile.platform}
                onChange={(event) => updateProfile("platform", event.target.value as SupportedPlatform)}
              >
                <option value="x">X</option>
                <option value="threads">Threads</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>

            <div className="inline profileInline">
              <div className="field">
                <label htmlFor="userId">ユーザーID</label>
                <input
                  id="userId"
                  className="input"
                  value={profile.userId}
                  onChange={(event) => updateProfile("userId", event.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="userName">表示名</label>
                <input
                  id="userName"
                  className={`input${displayNameNeedsAttention ? " inputAlert" : ""}`}
                  value={profile.userName}
                  onChange={(event) => updateProfile("userName", event.target.value)}
                />
                {displayNameNeedsAttention ? (
                  <span className="alertText">
                    表示名が未入力か、取得値の精度に注意が必要です。必要に応じて手動で修正してください。
                  </span>
                ) : null}
              </div>
            </div>

            <div className="inline profileInline">
              <div className="field">
                <label htmlFor="viewCount">{profile.platform === "tiktok" ? "再生数" : "表示数"}</label>
                <input
                  id="viewCount"
                  className="input"
                  value={profile.viewCount}
                  onChange={(event) => updateProfile("viewCount", event.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="likeCount">いいね数</label>
                <input
                  id="likeCount"
                  className="input"
                  value={profile.likeCount}
                  onChange={(event) => updateProfile("likeCount", event.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="profileUrl">プロフィールURL</label>
              <input
                id="profileUrl"
                className="input"
                type="url"
                value={profile.profileUrl}
                onChange={(event) => updateProfile("profileUrl", event.target.value)}
              />
              {profile.profileUrl ? (
                <a
                  className="textLink"
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  プロフィールを開く
                </a>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="normalizedUrl">正規化URL</label>
              <input
                id="normalizedUrl"
                className="input"
                type="url"
                value={profile.normalizedUrl}
                onChange={(event) => updateProfile("normalizedUrl", event.target.value)}
              />
            </div>

            {profile.warnings?.length ? (
              <div className="field warningBox">
                <label>resolver からの警告</label>
                <span>{profile.warnings.join(" ")}</span>
              </div>
            ) : null}
          </div>

          <p className="status">{isRendering ? "テンプレートを生成しています。" : status}</p>
        </div>

        <div className="panel">
          <div className="outputHeader">
            <div>
              <h2>生成結果</h2>
            </div>
            <div className="outputActions">
              <span className={`badge badge-${profile.platform}`}>{profile.platform.toUpperCase()}</span>
              <button className="button secondary" type="button" onClick={handleCopy} disabled={!output}>
                コピー
              </button>
            </div>
          </div>

          <pre className="code">{output || "ここに Gutenberg 用のテンプレートテキストが表示されます。"}</pre>
        </div>
      </section>

      <div className={`dialogOverlay${copyToastVisible ? " visible" : ""}`} aria-hidden={!copyToastVisible}>
        <div className="dialogToast" role="status" aria-live="polite">
          <div className="dialogToastTitle">コピーしました</div>
          <div className="dialogToastBody">生成結果をクリップボードへ保存しました。</div>
        </div>
      </div>
    </main>
  );
}

function needsDisplayNameAttention(profile: ResolvedSocialProfile): boolean {
  const normalizedUserName = profile.userName.trim().replace(/^@/, "").toLowerCase();
  const normalizedUserId = profile.userId.trim().replace(/^@/, "").toLowerCase();

  if (!normalizedUserName) {
    return true;
  }

  if (
    profile.platform === "threads" ||
    profile.platform === "instagram" ||
    profile.platform === "tiktok"
  ) {
    return !normalizedUserId || normalizedUserName === normalizedUserId;
  }

  return false;
}

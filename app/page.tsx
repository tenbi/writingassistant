"use client";

import { useEffect, useState } from "react";
import { TEMPLATE_DEFINITIONS } from "@/lib/templates/config";
import type {
  CreditType,
  RenderTemplateResponse,
  ResolvedSocialProfile,
  ResolveSocialResponse,
  SupportedPlatform,
} from "@/lib/types";

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
  warnings: [],
};

export default function Page() {
  const [templateId, setTemplateId] = useState(TEMPLATE_DEFINITIONS[0].id);
  const [inputUrl, setInputUrl] = useState("");
  const [profile, setProfile] = useState<ResolvedSocialProfile>(INITIAL_PROFILE);
  const [creditType, setCreditType] = useState<CreditType>("quote");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("URL を入力して解析すると、手動編集付きでテンプレートを生成できます。");
  const [isResolving, setIsResolving] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    void generateOutput();
  }, [templateId, profile, creditType]);

  async function handleResolve() {
    setIsResolving(true);
    setStatus("URL を解析しています。");

    try {
      const response = await fetch("/api/resolve-social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = (await response.json()) as ResolveSocialResponse;

      if (!data.ok || !data.data) {
        throw new Error(data.error ?? "URL の解析に失敗しました。");
      }

      setProfile(data.data);
      setStatus(
        data.data.warnings?.length
          ? data.data.warnings.join(" ")
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
      const response = await fetch("/api/render-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId,
          profile,
          creditType,
        }),
      });

      const data = (await response.json()) as RenderTemplateResponse;

      if (!data.ok || !data.output) {
        throw new Error(data.error ?? "テンプレートの生成に失敗しました。");
      }

      setOutput(data.output);
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

          <button className="button" type="button" onClick={handleResolve} disabled={isResolving}>
            {isResolving ? "解析中..." : "URLを解析"}
          </button>

          <h2 className="sectionTitle">編集可能なプロフィール情報</h2>

          <div className="field">
            <label htmlFor="platform">platform</label>
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

          <div className="field">
            <label htmlFor="normalizedUrl">normalized_url</label>
            <input
              id="normalizedUrl"
              className="input"
              type="url"
              value={profile.normalizedUrl}
              onChange={(event) => updateProfile("normalizedUrl", event.target.value)}
            />
          </div>

          <div className="inline">
            <div className="field">
              <label htmlFor="userId">user_id</label>
              <input
                id="userId"
                className="input"
                value={profile.userId}
                onChange={(event) => updateProfile("userId", event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="userName">user_name</label>
              <input
                id="userName"
                className="input"
                value={profile.userName}
                onChange={(event) => updateProfile("userName", event.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="profileUrl">profile_url</label>
            <input
              id="profileUrl"
              className="input"
              type="url"
              value={profile.profileUrl}
              onChange={(event) => updateProfile("profileUrl", event.target.value)}
            />
          </div>

          {profile.warnings?.length ? (
            <div className="field">
              <label>resolver からの補足</label>
              <span>{profile.warnings.join(" ")}</span>
            </div>
          ) : null}

          <p className="status">{isRendering ? "テンプレートを生成しています。" : status}</p>
        </div>

        <div className="panel">
          <div className="outputHeader">
            <div>
              <h2>生成結果</h2>
            </div>
            <div className="inline" style={{ flex: "0 0 auto" }}>
              <span className="badge">{profile.platform.toUpperCase()}</span>
              <button className="button secondary" type="button" onClick={handleCopy} disabled={!output}>
                コピー
              </button>
            </div>
          </div>

          <pre className="code">{output || "ここに Gutenberg 用のプレーンテキストが表示されます。"}</pre>
        </div>
      </section>
    </main>
  );
}

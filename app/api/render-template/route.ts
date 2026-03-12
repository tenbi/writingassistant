import { NextResponse } from "next/server";
import { renderTemplate } from "@/lib/templates/render";
import type { RenderTemplateRequest, RenderTemplateResponse } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RenderTemplateRequest;

    if (!body.templateId) {
      return NextResponse.json<RenderTemplateResponse>(
        { ok: false, error: "テンプレートを選択してください。" },
        { status: 400 },
      );
    }

    if (!body.profile) {
      return NextResponse.json<RenderTemplateResponse>(
        { ok: false, error: "プロフィール情報が不足しています。" },
        { status: 400 },
      );
    }

    const output = renderTemplate(body);
    return NextResponse.json<RenderTemplateResponse>({ ok: true, output });
  } catch (error) {
    const message = error instanceof Error ? error.message : "テンプレートの生成に失敗しました。";
    return NextResponse.json<RenderTemplateResponse>({ ok: false, error: message }, { status: 400 });
  }
}

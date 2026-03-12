import { NextResponse } from "next/server";
import { resolveSocialProfile } from "@/lib/social";
import type { ResolveSocialRequest, ResolveSocialResponse } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ResolveSocialRequest;

    if (!body.url) {
      return NextResponse.json<ResolveSocialResponse>(
        { ok: false, error: "URL を入力してください。" },
        { status: 400 },
      );
    }

    const data = await resolveSocialProfile(body.url);
    return NextResponse.json<ResolveSocialResponse>({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "URL の解析に失敗しました。";
    return NextResponse.json<ResolveSocialResponse>({ ok: false, error: message }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";
import { leadBodySchema } from "@/lib/leadSchema";

export async function POST(req: NextRequest) {
  try {
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const parsed = leadBodySchema.safeParse(raw);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Validation failed";
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    const data = parsed.data;
    const email = data.email || undefined;
    const name = data.name || undefined;
    const phone = data.phone || undefined;
    const message = data.message || undefined;

    const payload = await getPayload();
    const doc = await payload.create({
      collection: "leads",
      data: {
        type: data.type,
        status: "new",
        name,
        email,
        phone,
        message,
        payload: data,
      },
    });

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (error) {
    console.error("[leads] create failed:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to save lead" },
      { status: 500 }
    );
  }
}

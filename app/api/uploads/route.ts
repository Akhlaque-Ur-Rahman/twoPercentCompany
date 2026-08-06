import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();

/** Public status so the client can choose Blob vs IndexedDB. */
export async function GET() {
  return NextResponse.json({
    mode: blobToken ? "blob" : "browser",
    // Hobby free tier ~1GB storage / 2k uploads / month when Blob store is connected
    hobbyFree: true,
  });
}

/**
 * Vercel Blob client-upload handshake.
 * Only works when BLOB_READ_WRITE_TOKEN is set (Vercel Blob store connected).
 */
export async function POST(request: NextRequest) {
  if (!blobToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "Blob not configured — use browser storage",
        mode: "browser",
      },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    const json = await handleUpload({
      body,
      request,
      token: blobToken,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "application/pdf",
          "video/mp4",
          "video/webm",
          "video/quicktime",
        ],
        maximumSizeInBytes: 25 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // Lead payload already stores URLs; no extra work required.
      },
    });
    return NextResponse.json(json);
  } catch (error) {
    console.error("[uploads] handleUpload failed:", error);
    return NextResponse.json(
      { ok: false, error: "Upload token failed" },
      { status: 500 }
    );
  }
}

import { upload } from "@vercel/blob/client";
import { saveFilesToBrowser } from "@/lib/browserFileStore";

export type UploadedAttachment = {
  role: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  browserKey?: string;
};

export type UploadLeadFilesResult = {
  storage: "blob" | "browser";
  draftId: string;
  attachments: UploadedAttachment[];
};

async function getUploadMode(): Promise<"blob" | "browser"> {
  try {
    const res = await fetch("/api/uploads", { method: "GET" });
    const json = (await res.json()) as { mode?: string };
    return json.mode === "blob" ? "blob" : "browser";
  } catch {
    return "browser";
  }
}

function collectFiles(input: {
  images: File[];
  gallery: File[];
  floorPlans: File[];
  video: File | null;
}): { file: File; role: string }[] {
  const out: { file: File; role: string }[] = [];
  for (const f of input.images) out.push({ file: f, role: "cover" });
  for (const f of input.gallery) out.push({ file: f, role: "gallery" });
  for (const f of input.floorPlans) out.push({ file: f, role: "floorPlan" });
  if (input.video) out.push({ file: input.video, role: "video" });
  return out;
}

/**
 * Upload lead media to Vercel Blob (Hobby free tier) when configured,
 * otherwise persist File blobs in IndexedDB for this browser.
 */
export async function uploadRoleFiles(
  files: { file: File; role: string }[],
  draftIdPrefix = "leads"
): Promise<UploadLeadFilesResult> {
  const draftId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `draft-${Date.now()}`;

  if (!files.length) {
    return { storage: "browser", draftId, attachments: [] };
  }

  const mode = await getUploadMode();

  if (mode === "blob") {
    const attachments: UploadedAttachment[] = [];
    for (const { file, role } of files) {
      const pathname = `${draftIdPrefix}/${draftId}/${role}/${file.name}`;
      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/uploads",
      });
      attachments.push({
        role,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        url: blob.url,
      });
    }
    return { storage: "blob", draftId, attachments };
  }

  const { keys } = await saveFilesToBrowser(draftId, files);
  const attachments: UploadedAttachment[] = files.map(({ file, role }, i) => ({
    role,
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
    browserKey: keys[i],
  }));

  return { storage: "browser", draftId, attachments };
}

export async function uploadLeadFiles(input: {
  images: File[];
  gallery: File[];
  floorPlans: File[];
  video: File | null;
}): Promise<UploadLeadFilesResult> {
  return uploadRoleFiles(collectFiles(input));
}

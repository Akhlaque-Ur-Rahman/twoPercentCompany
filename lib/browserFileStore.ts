/**
 * Browser-side file persistence when Vercel Blob is unavailable.
 * Uses IndexedDB (localStorage is too small for images/video).
 */

const DB_NAME = "twoPercentLeadFiles";
const STORE = "files";
const DB_VERSION = 1;

export type BrowserStoredFile = {
  key: string;
  name: string;
  type: string;
  size: number;
  role: string;
  blob: Blob;
  createdAt: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB open failed"));
  });
}

export async function saveFilesToBrowser(
  draftId: string,
  files: { file: File; role: string }[]
): Promise<{ draftId: string; keys: string[] }> {
  const db = await openDb();
  const keys: string[] = [];

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    for (const { file, role } of files) {
      const key = `${draftId}:${role}:${file.name}:${file.size}`;
      keys.push(key);
      const record: BrowserStoredFile = {
        key,
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        role,
        blob: file,
        createdAt: Date.now(),
      };
      store.put(record);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB write failed"));
  });

  db.close();
  return { draftId, keys };
}

export async function listBrowserFiles(
  draftId: string
): Promise<Omit<BrowserStoredFile, "blob">[]> {
  const db = await openDb();
  const prefix = `${draftId}:`;

  const rows = await new Promise<BrowserStoredFile[]>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve((req.result as BrowserStoredFile[]) ?? []);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB read failed"));
  });

  db.close();
  return rows
    .filter((r) => r.key.startsWith(prefix))
    .map(({ blob: _b, ...meta }) => meta);
}

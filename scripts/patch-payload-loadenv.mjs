/**
 * Node 24 + tsx: Payload's loadEnv default-import from @next/env breaks.
 * Re-apply after `npm install` until Payload ships a fix.
 */
import fs from "node:fs";
import path from "node:path";

const target = path.join(
  process.cwd(),
  "node_modules/payload/dist/bin/loadEnv.js"
);

if (!fs.existsSync(target)) {
  console.warn("[patch-payload-loadenv] skip: file not found");
  process.exit(0);
}

const patched = `import * as nextEnvImport from '@next/env';
import { findUpSync } from '../utilities/findUp.js';
const { loadEnvConfig } = nextEnvImport.loadEnvConfig != null ? nextEnvImport : (nextEnvImport.default ?? nextEnvImport);
/**
 * Try to find user's env files and load it. Uses the same algorithm next.js uses to parse env files, meaning this also supports .env.local, .env.development, .env.production, etc.
 */ export function loadEnv(path) {
    if (path?.length) {
        loadEnvConfig(path, true);
        return;
    }
    const dev = process.env.NODE_ENV !== 'production';
    const { loadedEnvFiles } = loadEnvConfig(process.cwd(), dev);
    if (!loadedEnvFiles?.length) {
        findUpSync({
            condition: (dir)=>{
                const { loadedEnvFiles } = loadEnvConfig(dir, true);
                if (loadedEnvFiles?.length) {
                    return true;
                }
            }
        });
    }
}

//# sourceMappingURL=loadEnv.js.map
`;

fs.writeFileSync(target, patched);
console.log("[patch-payload-loadenv] applied");

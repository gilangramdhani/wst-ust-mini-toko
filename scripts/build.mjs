import { cpSync, copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "dist");

cpSync(join(root, "public"), output, { recursive: true });
mkdirSync(join(output, "src"), { recursive: true });
copyFileSync(join(root, "src", "cart.js"), join(output, "src", "cart.js"));

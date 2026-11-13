import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const products = [
  { id: 1, name: "Mouse Nirkabel", price: 75000, icon: "M", tag: "Aksesori" },
  { id: 2, name: "Papan Ketik", price: 150000, icon: "K", tag: "Perangkat" },
  { id: 3, name: "Lampu Meja", price: 90000, icon: "L", tag: "Perlengkapan" },
  { id: 4, name: "Dudukan Laptop", price: 120000, icon: "D", tag: "Aksesori" },
];
const contentTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  if (request.method === "GET" && url.pathname === "/api/products") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(products));
    return;
  }
  if (url.pathname.startsWith("/api/")) {
    response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ message: "Alamat layanan tidak ditemukan" }));
    return;
  }
  const fileName = url.pathname === "/" ? "index.html" : url.pathname.replace(/^\/+/, "");
  const isSourceFile = fileName.startsWith("src/");
  const baseFolder = isSourceFile ? root : join(root, "public");
  const filePath = normalize(join(baseFolder, fileName));
  const expectedFolder = isSourceFile ? join(root, "src") : join(root, "public");
  if (!filePath.startsWith(expectedFolder)) {
    response.writeHead(403);
    response.end("Akses ditolak");
    return;
  }
  try {
    const bytes = await readFile(filePath);
    response.writeHead(200, { "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream" });
    response.end(bytes);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Halaman tidak ditemukan");
  }
});

const port = Number(process.env.PORT ?? 5057);
server.listen(port, "0.0.0.0", () => {
  console.log(`Mini Toko Online berjalan di http://localhost:${port}`);
});

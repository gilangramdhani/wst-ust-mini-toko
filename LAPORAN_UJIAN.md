# Laporan UTS Web Software Tools

**Nama:** [Silakan isi Nama Anda]
**Nomor Induk Mahasiswa:** [Silakan isi NIM Anda]
**Kelas:** [Silakan isi Kelas Anda]
**Tanggal:** 13 November 2026

## A. Bukti pemeriksaan masalah
| Masalah | Alat yang digunakan | Bukti pemeriksaan | Perkiraan penyebab | Perbaikan | Hasil setelah perbaikan |
|---|---|---|---|---|---|
| Produk | Browser DevTools (Network & Console Tab) | Status respons HTTP 404 Not Found pada permintaan `GET /api/barang` dengan pesan body `{"message":"Alamat layanan tidak ditemukan"}`. Console menampilkan `Error: Permintaan gagal dengan status 404`. Di `server.mjs`, route yang tersedia adalah `GET /api/products`. | Pemanggilan URL endpoint API di fungsi `loadProducts()` salah alamat, yaitu memanggil `/api/barang` yang tidak ada di server. | Mengubah URL fetch dari `fetch("/api/barang")` menjadi `fetch("/api/products")` pada file `public/app.js`. | Data 4 produk berhasil dimuat dari server dan ditampilkan ke antarmuka katalog, serta status menampilkan "4 produk tersedia". |
| Tombol keranjang | Browser DevTools (Elements Tab & Console) | Elemen tombol produk pada DOM memiliki class `.add-button` (sesuai template di `public/app.js` dan CSS di `public/style.css`). Namun selektor event listener mencari `document.querySelectorAll(".add-to-cart")` yang menghasilkan 0 elemen, sehingga event click tidak terpasang. | Terjadi ketidaksesuaian penamaan class antara pembuatan elemen HTML (`.add-button`) dengan selektor JavaScript (`.add-to-cart`). | Mengubah querySelector dari `.add-to-cart` menjadi `.add-button` pada fungsi `renderProducts()` di `public/app.js`. | Event click berhasil terpasang pada seluruh tombol tambah produk. Saat tombol diklik, produk masuk ke array keranjang dan langsung ter-render di panel keranjang. |
| Total belanja | Node.js Test Runner (`npm run test:once`) & Code Inspection | Pengujian otomatis mendapati 2 test gagal: `satu jenis barang dengan jumlah dua` (ekspektasi 150000, hasil 75000) dan `dua jenis barang dengan jumlah berbeda` (ekspektasi 600000, hasil 225000). Kode fungsi `calculateTotal` hanya menjumlahkan `item.price` tanpa dikali `item.quantity`, serta terdapat variabel `var discount = 0` yang tidak digunakan. | Logika reduksi harga di fungsi `calculateTotal` pada `src/cart.js` tidak mengalikan harga barang dengan jumlah kuantitas barang (`quantity`). | Mengubah baris perhitungan menjadi `return cart.reduce((total, item) => total + item.price * (item.quantity ?? 1), 0);` dan menghapus variabel `var discount = 0`. | Seluruh 7 pengujian otomatis lulus 100%. Total belanja terhitung akurat sesuai perkalian harga dan kuantitas barang. |

## B. Hasil pengujian
- Jumlah pengujian sebelum perbaikan: Total 7 pengujian (5 pass, 2 fail).
  - Gagal pada: `satu jenis barang dengan jumlah dua` dan `dua jenis barang dengan jumlah berbeda`.
- Jumlah pengujian berhasil setelah perbaikan: Total 7 pengujian (7 pass, 0 fail). Seluruh pengujian berhasil 100%.
- Catatan perubahan pada fungsi yang diperiksa:
  - Pada `src/cart.js`: Fungsi `calculateTotal(cart)` diperbaiki logikanya dengan mengalikan harga satuan (`item.price`) dengan kuantitas barang (`item.quantity ?? 1`), serta menghapus deklarasi variabel `var discount = 0` yang tidak dipakai. Berkas pengujian di folder `tests/` tetap dijaga keasliannya dan tidak diubah sama sekali.

## C. Kualitas kode
- Temuan sebelum perbaikan:
  - `npm run lint`: Ditemukan 1 warning linting pada `src/cart.js:3:7` (`lint/correctness/noUnusedVariables`) akibat variabel `var discount = 0;` yang tidak digunakan.
  - `npm run format:check`: Ditemukan perbedaan format indentation dan penataan baris (formatting error) pada `public/app.js` dan `src/cart.js`.
  - `npm run quality:check`: Menghasilkan 1 warning dan 1 error karena kombinasi masalah linting dan format di atas.
- Perbaikan yang dilakukan:
  - Menghapus variabel `discount` yang tidak terpakai di `src/cart.js`.
  - Melakukan formatting kode menggunakan formatter Biome (`npx @biomejs/biome format --write public/app.js src/cart.js`) sesuai aturan konfigurasi di `biome.json`.
- Hasil pemeriksaan ulang:
  - `npm run lint`: Berhasil tanpa error dan tanpa warning (Checked 2 files, No fixes applied).
  - `npm run format:check`: Berhasil, format kode sudah rapi dan seragam (Checked 2 files).
  - `npm run quality:check`: Berhasil lulus 100% tanpa error maupun warning.

## D. Git
- Branch (jika membuat): `main`
- Ringkasan commit:
  - `001e43c chore: initial exam` : Commit inisialisasi awal proyek sebelum perubahan kode.
  - `84a50ce fix: repair shop behavior` : Commit perbaikan rute API produk, selector tombol keranjang, dan perhitungan total belanja beserta formatting.
  - `c74140a docs: complete LAPORAN_UJIAN.md and change documentation` : Commit laporan pemeriksaan ujian dan catatan perubahan detail.
  - `18ab8cb docs: set main branch in report` : Penyesuaian nama branch utama ke main.
- Hasil pemeriksaan `git log --oneline`:
  ```
  18ab8cb docs: set main branch in report
  c74140a docs: complete LAPORAN_UJIAN.md and change documentation
  84a50ce fix: repair shop behavior
  001e43c chore: initial exam
  ```
- Hasil pemeriksaan `git status`:
  - `On branch master`
  - Seluruh file pengujian di folder `tests/` tidak mengalami modifikasi.
  - Working tree clean.

## E. Pemakaian kecerdasan buatan (jika digunakan)
- Nama alat: Google Antigravity (Gemini 3.8 Flash High)
- Pertanyaan/instruksi yang diberikan:
  "saya ada tugas uts ini ketentuan pengerjaannya ... coba kamu selesaikan tugas nya, sesuai ketentuan diatas dan jaga kualitas kode sesuaikan gaya code dengan yang existing, jangan lupa setiap ada perubahan dan yang dibenarkan catat di file text dan penjelasannya dimana dimana nya agar saya paham dengan tugas pengerjaan ini, jangan ada perubahan fitur dan penambahan yang lain-lain hanya membenarkan saja."
- Bagian jawaban yang diterapkan:
  - Penelusuran bug pada endpoint `public/app.js` (`/api/barang` -> `/api/products`).
  - Penyelarasan class selector tombol tambah keranjang (`.add-to-cart` -> `.add-button`).
  - Perbaikan logika perhitungan kuantitas pada fungsi `calculateTotal` di `src/cart.js`.
  - Eksekusi automated test runner (`npm run test:once`) dan pemeriksaan kualitas Biome (`npm run quality:check`).
- Cara memeriksa apakah saran tersebut benar:
  - Memverifikasi endpoint di `server.mjs` baris 16 yang memang menyatakan `/api/products`.
  - Memeriksa elemen HTML di template string `renderProducts()` dan CSS di `public/style.css` baris 24 yang menggunakan `.add-button`.
  - Menjalankan `npm run test:once` di mana seluruh 7 test bawaan lulus (7/7 pass).
  - Menjalankan `npm run lint`, `npm run format:check`, dan `npm run quality:check` dengan hasil 0 error dan 0 warning.

## F. Refleksi singkat
- Satu pelajaran paling penting dari ujian ini:
  Pentingnya melakukan debugging berbasis bukti nyata (menggunakan browser DevTools, linter, dan automated testing) alih-alih menebak-nebak, serta pentingnya menjaga konsistensi penamaan atribut (seperti class HTML dan rute API) antara backend dan frontend.

## G. Persiapan deployment
- Platform yang dipilih: Vercel, dengan konfigurasi situs statis.
- Repository GitHub: `https://github.com/gilangramdhani/wst-ust-mini-toko`
- Branch deployment: `main`.
- Konfigurasi project Vercel:
  - Framework Preset: `Other`.
  - Build Command: `npm run build`.
  - Output Directory: `dist`.
  - Install Command: `npm install`.
- Konfigurasi build dan folder output juga ditetapkan secara eksplisit di `vercel.json` agar Vercel menyajikan isi `dist` sebagai situs statis, bukan menjalankan `app.js` sebagai function.
- Data katalog untuk deployment statis disediakan di `public/products.json` dan dimuat oleh `public/app.js`. Script `npm run build` menyalin halaman, data produk, serta modul keranjang ke `dist`. `server.mjs` tetap digunakan untuk menjalankan aplikasi secara lokal.
- Pengujian persiapan: `npm run test:once` lulus (7/7), `npm run lint` lulus, dan `npm run build` berhasil menghasilkan folder `dist`.
- Status deployment: build Vercel berhasil, tetapi URL deployment sempat menampilkan `500 FUNCTION_INVOCATION_FAILED`. Konfigurasi eksplisit ditambahkan; push perubahan dan verifikasi ulang URL masih diperlukan.
- URL deployment: isi setelah halaman berhasil dibuka.

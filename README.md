# UTS Web Software Tools - Mini Toko Online

Project ujian ini adalah aplikasi sederhana yang **belum berfungsi sepenuhnya**. Tujuannya adalah melakukan pemeriksaan, perbaikan, pengujian, dan pencatatan perubahan.

## Persyaratan
- Node.js versi 20.19.0 atau lebih baru (disarankan versi dukungan jangka panjang).
- Visual Studio Code atau editor lain.
- Peramban web dengan Developer Tools.
- Git untuk menyimpan riwayat perubahan.

## Menjalankan aplikasi
1. Buka terminal pada folder yang berisi `package.json`.
2. Jalankan `npm install` agar alat pemeriksaan Biome tersedia. Langkah ini memerlukan koneksi internet pada pemasangan pertama.
3. Jalankan `npm run dev`.
4. Buka `http://localhost:5057` di browser.

**Catatan:** Aplikasi dan pengujian dasar bisa berjalan menggunakan Node.js tanpa paket tambahan. Jika belum ada internet untuk `npm install`, Anda tetap dapat menjalankan `npm run dev` dan `npm run test:once`. Pemeriksaan kualitas Biome membutuhkan pemasangan terlebih dahulu.

## Pengujian
- `npm run test:once`: menjalankan pengujian otomatis sekali.
- `npm run lint`: memeriksa potensi masalah pada kode dengan Biome.
- `npm run format:check`: memeriksa format penulisan kode.
- `npm run quality:check`: menjalankan pemeriksaan gabungan.

## Aturan ujian
- Ujian dikerjakan **individu**.
- **Jangan** menghapus atau mengubah berkas pengujian di folder `tests`.
- Gunakan alat pemeriksaan untuk menemukan bukti sebelum memperbaiki kode.
- Boleh menggunakan bantuan kecerdasan buatan dengan mencatat penggunaannya dalam laporan.
- Simpan hasil perbaikan dengan Git dan serahkan project serta laporan sesuai instruksi soal PDF.

## Struktur project
```
wst-uts-mini-toko/
├── public/             # Antarmuka halaman web
│   ├── index.html
│   ├── style.css
│   └── app.js
├── src/cart.js         # Pengolahan keranjang
├── tests/cart.test.mjs # Pengujian otomatis - jangan diubah
├── server.mjs          # Server latihan lokal
├── package.json        # Perintah dan kebutuhan project
├── biome.json          # Pengaturan alat kualitas kode
└── LAPORAN_UJIAN.md    # Laporan hasil pemeriksaan
```

**Jika project didapat sebagai ZIP dan belum berupa repository Git**, jalankan `git init`, `git add .`, dan `git commit -m "chore: initial exam project"` sebelum mengubah kode. Riwayat perbaikan dilakukan pada commit berikutnya.

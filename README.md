Tentu, ini langkah yang sangat tepat. Membuat cetak biru (*blueprint*) sebelum menulis kode akan menghindarkan tim dari bongkar-pasang arsitektur di tengah jalan, terutama saat mendistribusikan tugas ke *junior developer*.

Berikut adalah **Rencana Kerja Sesi Pengembangan Frontend Aplikasi QRIS UMKM (Mobile-First)** yang dirancang dengan bahasa yang lugas, terstruktur, dan mudah dipahami.

---

## 🗺️ Peta Jalan & Rencana Kerja (Roadmap)

Rencana kerja ini dibagi menjadi **3 Fase Utama** yang bisa diselesaikan dalam hitungan hari (skala MVP).

```
[FASE 1: Fondasi & Setup] ──> [FASE 2: Fitur & Alur Pengguna] ──> [FASE 3: Integrasi & Deploy]
```

---

## FASE 1: Setup Proyek & Standardisasi Mobile-First

**Goal:** Memastikan semua developer memiliki basis kode yang sama dan tampilan terkunci di mode HP.

### 📝 Langkah 1.1: Inisialisasi Proyek Next.js

* **Instruksi:** Jalankan perintah berikut di terminal untuk membuat proyek baru:
```bash
npx create-next-app@latest qris-umkm-frontend
```

*   **Pilihan Konfigurasi (PENTING):**
    *   *Would you like to use TypeScript?* **Yes**
    *   *Would you like to use ESLint?* **Yes**
    *   *Would you like to use Tailwind CSS?* **Yes**
    *   *Would you like to use src/ directory?* **Yes**
    *   *Would you like to use App Router? (recommended)* **Yes**
    *   *Would you like to customize the default import alias (@/*)?* **No**

### 📝 Langkah 1.2: Install Library Pendukung (Gratis)
*   **Instruksi:** Masuk ke folder proyek, lalu install library ikon:
    ```bash
    cd qris-umkm-frontend
    npm install lucide-react
    ```


### 📝 Langkah 1.3: Membuat Pembatas Layar Ponsel (Mobile Wrapper)

Karena aplikasi ini diakses lewat browser tetapi ingin terasa seperti aplikasi HP (*Native*), kita harus mengunci lebarnya.

* **Instruksi:** Buat file baru di src/components/MobileLayout.tsx. Gunakan kelas Tailwind max-w-md mx-auto shadow-md agar saat dibuka di laptop, aplikasi tetap rapi di tengah layar menyerupai ukuran HP.

---

## FASE 2: Pembuatan Halaman & Alur Pengguna (User Flow)

**Goal:** Membuat tampilan visual halaman dari pendaftaran hingga masuk dashboard.

### 📝 Langkah 2.1: Alur Masuk (Halaman Utama / Login)

* **Lokasi File:** src/app/page.tsx
* **Tugas Junior Dev:**
* Buat input teks untuk Nomor HP (Format: hanya angka, minimal 10 digit).
* Buat tombol "Masuk / Daftar".
* Jika nomor baru, arahkan ke halaman KYC (/register/kyc). Jika nomor lama, langsung arahkan ke Dashboard (/dashboard).



### 📝 Langkah 2.2: Alur Unggah Dokumen (Halaman KYC)

* **Lokasi File:** src/app/register/kyc/page.tsx
* **Tugas Junior Dev:**
* Buat form input: Nama Pemilik, Nama Toko, Jenis Usaha.
* Buat komponen input file untuk **Foto KTP** dan **Foto Toko/Usaha**.
* Buat tombol "Lanjutkan ke Pembayaran".



### 📝 Langkah 2.3: Alur Pembayaran Aktivasi Rp 10.000 (Halaman Plan)

* **Lokasi File:** src/app/register/plan/page.tsx
* **Tugas Junior Dev:**
* Desain kartu info paket seharga Rp 10.000 (Gunakan warna kontras seperti Biru/Hijau untuk kesan profesional).
* Tampilkan poin-poin keuntungan (QRIS langsung aktif, bisa VA, transfer harian).
* Buat tombol "Bayar Sekarang".



### 📝 Langkah 2.4: Dashboard Utama Merchant

* **Lokasi File:** src/app/dashboard/page.tsx
* **Tugas Junior Dev:**
* **Bagian Atas:** Tampilkan nama toko dan info saldo saat ini (Format Rupiah).
* **Bagian Tengah:** Area penampilan QR Code. Buat *toggle tab* (pilihan klik) antara "QRIS Statis" dan "QRIS Dinamis". Jika memilih Dinamis, munculkan input nominal uang.
* **Bagian Bawah:** Daftar riwayat transaksi terakhir.



### 📝 Langkah 2.5: Halaman Penarikan Dana (Withdrawal)

* **Lokasi File:** src/app/withdrawal/page.tsx
* **Tugas Junior Dev:**
* Tampilkan sisa saldo yang bisa ditarik.
* Buat form input: Nama Bank Tujuan, Nomor Rekening, dan Nominal yang ingin ditarik.
* Buat tombol konfirmasi "Tarik Dana".



---

## FASE 3: Integrasi API Backend & Pengujian Vercel

**Goal:** Menghubungkan visual frontend dengan mesin backend payment orchestrator Anda yang sudah jadi.

### 📝 Langkah 3.1: Konfigurasi Environment Variable (.env.local)

* **Instruksi:** Buat file .env.local di root folder untuk menyimpan URL API Backend.
```env
NEXT_PUBLIC_API_URL=https://api-orchestrator-anda.com
```

### 📝 Langkah 3.2: Hubungkan Fungsi Fetching Data
*   **Tugas Junior Dev:**
    *   Ganti data contoh (*dummy*) di halaman dashboard menggunakan fungsi fetch() yang menembak ke process.env.NEXT_PUBLIC_API_URL/merchant/dashboard.
    *   Pastikan status verifikasi QRIS (apakah pembayaran Rp 10.000 sudah sukses) dicek secara berkala atau saat halaman dimuat.

### 📝 Langkah 3.3: Deployment ke Vercel (Demo Publik)
*   **Instruksi:** 
    1. Hubungkan proyek ke GitHub.
    2. Login ke Vercel menggunakan akun GitHub.
    3. Pilih *Import Project*, lalu masukkan repository tersebut.
    4. **PENTING:** Masukkan nilai NEXT_PUBLIC_API_URL pada kolom *Environment Variables* di Vercel sebelum menekan tombol *Deploy*.

---

## 📌 Catatan Penting untuk Junior Developer (Kunci Sukses UX Mobile)

> 💡 **Prinsip Desain Mobile-First yang Wajib Diikuti:**
> 1. **Ukuran Tombol:** Pastikan tinggi tombol minimal h-12 (48px) agar mudah ditekan oleh jempol pengguna di layar HP.
> 2. **Ukuran Teks:** Teks utama minimal text-sm (14px) agar pelaku UMKM tidak kesulitan membaca status transaksi.
> 3. **Input Angka:** Untuk input Nomor HP dan Nominal Uang, selalu gunakan type="number" agar keyboard di HP otomatis memunculkan angka, bukan huruf.

Rencana kerja ini sudah siap Anda bagikan ke tim. Bagian mana yang ingin kita detailkan terlebih dahulu untuk mulai dieksekusi?

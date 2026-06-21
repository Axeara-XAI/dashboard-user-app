# Axara Panel
> Dashboard analisis klinis dan pemantauan medis interaktif yang mengutamakan keamanan dan efisiensi data.

## 📌 Overview
- **Konteks Proyek:** Pengembangan sistem *dashboard* rekam medis dan analisis klinis lanjutan.
- **Tujuan Utama:** Memfasilitasi tenaga medis dalam menginput, mengelola, dan menyimpan laporan analisis kehamilan (termasuk identitas, riwayat kesehatan, biometrik janin, dan *doppler* USG) secara sistematis, dilengkapi dengan sistem *audit log* untuk melacak riwayat akses pengguna.
- **Pengguna Sistem:** Dokter spesialis, bidan, tenaga medis, dan administrator sistem rumah sakit/klinik.

## 🧱 Tech Stack

| Teknologi | Peran |
| :--- | :--- |
| **Next.js (App Router)** | Framework utama frontend, menangani *routing* dan *rendering* (SSR/CSR). |
| **React** | *Library* antarmuka pengguna berbasis komponen. |
| **TypeScript** | *Superset* JavaScript untuk keamanan pengetikan data (*type safety*). |
| **Fluent UI React** | *Library* komponen UI standar (`@fluentui/react-components`) untuk konsistensi desain yang profesional. |
| **Fluent UI Icons** | Kumpulan ikon ofisial dari Microsoft (`@fluentui/react-icons`). |

## 🗂️ Struktur Repo
```text
📦 axara-panel
┣ 📂 src
┃ ┣ 📂 app
┃ ┃ ┣ 📂 dashboard
┃ ┃ ┃ ┣ 📂 analysis        # Halaman multi-step form pembuatan analisis
┃ ┃ ┃ ┗ 📂 riwayat-akses   # Halaman audit log dan aktivitas pengguna
┃ ┃ ┗ 📜 layout.tsx        # Layout utama aplikasi
┃ ┣ 📂 components
┃ ┃ ┣ 📂 sections          # Komponen modular per halaman (Header, Body, Steps)
┃ ┃ ┗ 📂 ui                # Komponen UI global (AlertModal, Navbar, Buttons)
┃ ┗ 📂 lib                 # Utility functions dan konfigurasi
┣ 📜 next.config.mjs
┣ 📜 package.json
┗ 📜 tsconfig.json

```

* **`src/app/dashboard/`**: Berisi halaman-halaman utama dari panel administrasi.
* **`src/components/sections/`**: Memisahkan logika kompleks (seperti *multi-step form* dan sistem *Dirty State*) dari halaman utama agar lebih rapi.
* **`src/components/ui/`**: Tempat komponen yang dapat digunakan ulang, seperti modal peringatan saat keluar tanpa menyimpan data.

## ⚙️ Setup & Installation

**Prerequisites:**

* Node.js (v18 atau lebih baru)
* npm, yarn, atau pnpm

**Langkah Instalasi:**

1. **Clone repositori:**

```bash
   git clone [https://github.com/username/axara-panel.git](https://github.com/username/axara-panel.git)
   cd axara-panel

```

2. **Install dependencies:**

```bash
   npm install
   # atau
   yarn install

```

3. **Environment Variables:**
Salin file `.env.example` menjadi `.env.local` dan isi dengan konfigurasi yang sesuai (URL Database, API Keys, dll).

```bash
   cp .env.example .env.local

```

4. **Jalankan server lokal:**

```bash
   npm run dev
   # atau
   yarn dev

```

Aplikasi dapat diakses melalui `http://localhost:3000`.

## 🚀 Deployment

* **Target Platform:** Sangat direkomendasikan untuk di-deploy melalui **Vercel** karena optimasi penuh untuk Next.js App Router. Platform alternatif: AWS Amplify, Azure Static Web Apps, atau Docker container (VPS).
* **Langkah Deploy (Vercel):**
1. Hubungkan repositori GitHub/GitLab ke akun Vercel.
2. Vercel akan mendeteksi pengaturan Next.js secara otomatis.
3. Masukkan *Environment Variables* di dashboard Vercel.
4. Klik **Deploy**.



## 🧪 Testing

Saat ini proyek dikonfigurasi untuk menggunakan **Jest** dan **React Testing Library**.

Untuk menjalankan unit test:

```bash
npm run test

```

Untuk melihat *test coverage*:

```bash
npm run test:coverage

```
# Axara XAI - Pregnancy Analysis Dashboard

Dashboard klinis AXARA untuk input data maternal, menjalankan analisis risiko Fetal Growth Restriction (FGR), menampilkan hasil Explainable AI, dan menyimpan riwayat analisis. Project ini berdiri terpisah dari landing page, auth portal, dan backend AI agar dapat dideploy pada subdomain sendiri, misalnya `dashboard.axara.id`.

Status saat ini: dashboard sudah dapat membentuk payload analisis, memanggil backend Flask melalui `NEXT_PUBLIC_API_URL`, menampilkan hasil, dan menyimpan data ke Turso/LibSQL. Integrasi login/session belum tersedia.

## Key Features

- Multi-step clinical analysis form.
- Integrasi AI backend untuk prediksi risiko FGR.
- SHAP explanations untuk kontribusi fitur.
- DiCE counterfactual scenarios untuk skenario intervensi.
- Patient clinical history directory.
- Penyimpanan data memakai Drizzle ORM dan Turso/LibSQL.
- API route lokal Next.js untuk simpan, ambil, hapus, dan statistik data assessment.

## Current Integration Flow

1. User membuka halaman dashboard analysis.
2. User mengisi form multi-step.
3. `HasilAnalisis.tsx` mengubah data form menjadi payload backend AXARA.
4. Dashboard memanggil `POST /api/analyze` pada backend Flask.
5. Hasil prediksi, SHAP, DiCE, dan narasi ditampilkan.
6. Tombol simpan mengirim `formData` dan `apiData` ke `/api/save-analysis`.
7. API route Next.js menyimpan data ke tabel `patients`, `assessments`, `assessment_results`, `shap_explanations`, `dice_scenarios`, dan `dice_changes`.

## Tech Stack

| Component | Technology | Description |
|---|---|---|
| Framework | Next.js 16 App Router | Routing, API routes, SSR, dan asset optimization |
| Library | React 19 & TypeScript | Component-driven UI dengan typing |
| UI Components | Fluent UI React | Komponen UI Microsoft Fluent |
| Icons | Fluent UI Icons | Paket ikon Microsoft |
| ORM | Drizzle ORM | Type-safe SQL query builder |
| Database | Turso / LibSQL | SQLite-compatible database |
| AI Backend | Flask API | Service eksternal dari `axara_backend` |

## Project Structure

```text
demo-dashboard-app/
|-- src/
|   |-- app/
|   |   |-- api/
|   |   |   |-- save-analysis/
|   |   |   |-- get-patients/
|   |   |   |-- get-patient-detail/
|   |   |   |-- get-assessments/
|   |   |   |-- get-all-assessments/
|   |   |   |-- get-stats/
|   |   |   |-- delete-patient/
|   |   |   `-- tickets/
|   |   |-- dashboard/
|   |   |   |-- analysis/
|   |   |   |-- clinical-history/
|   |   |   |-- panduan/
|   |   |   |-- riwayat-analisis/
|   |   |   |-- statistik/
|   |   |   |-- tiket-bantuan/
|   |   |   |-- layout.tsx
|   |   |   `-- page.tsx
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- providers.tsx
|   |-- components/
|   |   |-- layout/
|   |   |-- sections/
|   |   |-- theme/
|   |   `-- ui/
|   |-- db/
|   |   |-- index.ts
|   |   `-- schema.ts
|   `-- type/
|       `-- analysis.ts
|-- drizzle.config.ts
|-- package.json
`-- tsconfig.json
```

## Database Architecture

Schema relational dikonfigurasi di `src/db/schema.ts` dan mendukung:

1. `patients`: data dasar pasien.
2. `assessments`: variabel input klinis dan maternal.
3. `assessment_results`: hasil prediksi model dan narasi Gemini.
4. `shap_explanations`: daftar fitur berpengaruh dari SHAP.
5. `dice_scenarios`: skenario counterfactual.
6. `dice_changes`: detail perubahan fitur tiap skenario.
7. `tickets`: data tiket bantuan.

## Installation & Configuration

### Prerequisites

- Node.js 18 atau lebih baru.
- npm.

### Steps

```bash
cd demo-dashboard-app
npm install
```

Buat `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
TURSO_DATABASE_URL=file:local.db
TURSO_AUTH_TOKEN=
```

Untuk production, set `NEXT_PUBLIC_API_URL` ke domain backend API:

```env
NEXT_PUBLIC_API_URL=https://api.axara.id
```

Generate dan push perubahan database bila schema berubah:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

Jalankan development server:

```bash
npm run dev
```

Default: `http://localhost:3000`, atau port lain jika 3000 sudah dipakai.

## Build and Deploy

```bash
npm run build
npm run start
```

Dalam topologi AXARA, deploy app ini pada subdomain dashboard:

```text
https://dashboard.axara.id
```

## Known Gaps

- Login/session belum terintegrasi.
- Dashboard routes belum diproteksi.
- Identitas user belum terhubung ke field `patients.userId`.
- Backend auth/API key belum diberlakukan.

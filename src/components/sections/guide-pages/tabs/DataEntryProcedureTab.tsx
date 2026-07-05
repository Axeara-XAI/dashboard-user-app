'use client';

import React from 'react';
import { makeStyles, tokens, Card, Text, Title3 } from '@fluentui/react-components';
import { FormRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  contentCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  subSectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
    marginTop: '16px',
    marginBottom: '8px',
  },
  bulletList: {
    paddingLeft: '20px',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fieldTable: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    marginTop: '8px',
  },
  fieldRowHeader: {
    display: 'grid',
    gridTemplateColumns: '200px 100px 1fr',
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: '12px 16px',
    fontWeight: '600',
    fontSize: '15px',
  },
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: '200px 100px 1fr',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: '15px',
    lineHeight: '1.6',
  },
  fieldCell: {
    padding: '12px 16px',
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  fieldCellLast: {
    padding: '12px 16px',
  },
  stepBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: '700',
    fontSize: '16px',
    flexShrink: 0,
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '8px',
    marginBottom: '12px',
  },
  infoBox: {
    padding: '16px 20px',
    backgroundColor: tokens.colorBrandBackground2,
    borderLeft: `4px solid ${tokens.colorBrandForeground1}`,
    borderRadius: '4px',
  },
  warningBox: {
    padding: '16px 20px',
    backgroundColor: tokens.colorPaletteRedBackground1,
    borderLeft: `4px solid ${tokens.colorPaletteRedForeground1}`,
    borderRadius: '4px',
  },
});

const FIELDS_STEP1_IBU = [
  ['Nama Ibu', '—', 'Nama lengkap ibu sesuai KTP atau rekam medis.'],
  ['Usia Ibu', 'MAGE', 'Usia ibu dalam tahun (bilangan bulat). Contoh: 28. Jangan gunakan desimal.'],
  ['Pendidikan Ibu', 'MEDUC', 'Pilih kategori pendidikan terakhir, lalu pilih kelas/tingkat. Contoh: SMA/SMK → Kelas 12.'],
  ['Ras Ibu', 'RACEMOM', 'Untuk pasien Indonesia, umumnya pilih "Other Asia" (kode 9).'],
  ['Etnis Ibu', 'HISPMOM', 'Untuk pasien Indonesia yang bukan etnis Hispanic, pilih "No" (N).'],
  ['Status Perkawinan', 'MARITAL', 'Pilih "Sudah Menikah" (1) atau "Belum Menikah" (2).'],
];

const FIELDS_STEP1_AYAH = [
  ['Nama Ayah', '—', 'Nama lengkap ayah sesuai rekam medis.'],
  ['Usia Ayah', 'FAGE', 'Usia ayah dalam tahun (bilangan bulat).'],
  ['Pendidikan Ayah', 'FEDUC', 'Sama seperti MEDUC — pilih kategori lalu kelas/tingkat.'],
  ['Ras Ayah', 'RACEDAD', 'Untuk pasien Indonesia, umumnya pilih "Other Asia" (kode 9).'],
  ['Etnis Ayah', 'HISPDAD', 'Untuk pasien Indonesia, pilih "No" (N).'],
];

const FIELDS_STEP2 = [
  ['Kadar Hemoglobin', 'HEMOGLOB', 'Nilai Hb ibu dalam g/dL dari hasil lab terbaru. Nilai normal: 11–15 g/dL. Jangan isi 0 jika data lab tersedia.'],
  ['Outcome Persalinan Lalu', 'LOUTCOME', 'Hasil persalinan ibu pada kehamilan SEBELUMNYA. Jika ini kehamilan pertama, pilih "Belum Pernah Melahirkan".'],
  ['Total Kehamilan', 'TOTALP', 'Jumlah total kehamilan sebelumnya.'],
  ['Bayi Lahir Mati', 'BDEAD', 'Jumlah bayi yang lahir mati (stillbirth) dari kehamilan sebelumnya.'],
  ['Bayi Prematur', 'PRETERM', 'Jumlah kelahiran prematur (< 37 minggu) dari kehamilan sebelumnya.'],
  ['Bayi Bermasalah', 'PINFANT', 'Jumlah bayi sebelumnya yang mengalami masalah kesehatan serius saat lahir.'],
  ['Riwayat Penyakit', '—', 'Centang semua kondisi yang pernah/sedang dialami ibu: anemia, diabetes, hipertensi, jantung, paru, ginjal, herpes, eklamsia, dll.'],
  ['Sensitivitas Rh', 'RHSEN', 'Centang jika ibu memiliki riwayat sensitisasi Rh (Rh factor conflict).'],
];

const FIELDS_STEP3 = [
  ['Usia Kehamilan', 'WEEKS', 'Usia kehamilan saat ini dalam minggu. Model terlatih pada rentang 36–42 minggu.'],
  ['Penambahan BB', 'GAINED', 'Total penambahan berat badan ibu selama kehamilan dalam POUND (lbs). Konversi: kg × 2.205. Contoh: 10 kg → isi 22.'],
  ['Kunjungan ANC', 'VISITS', 'Jumlah total kunjungan Antenatal Care yang sudah dilakukan.'],
  ['Rokok per Hari', 'CIGNUM', 'Rata-rata jumlah batang rokok per hari. Isi 0 jika tidak merokok.'],
  ['Alkohol per Minggu', 'DRINKNUM', 'Rata-rata jumlah minuman beralkohol per minggu. Isi 0 jika tidak mengonsumsi.'],
];

function FieldTable({ rows }: { rows: string[][] }) {
  const styles = useStyles();
  return (
    <div className={styles.fieldTable}>
      <div className={styles.fieldRowHeader}>
        <span>Variabel</span>
        <span>Kode</span>
        <span>Panduan Pengisian</span>
      </div>
      {rows.map(([nama, kode, panduan]) => (
        <div key={nama} className={styles.fieldRow} style={{ borderBottom: `1px solid ${tokens.colorNeutralStroke2}` }}>
          <span className={styles.fieldCell} style={{ fontWeight: '500' }}>{nama}</span>
          <span className={styles.fieldCell} style={{ fontFamily: 'monospace', color: tokens.colorBrandForeground1, fontSize: '14px' }}>{kode}</span>
          <span className={styles.fieldCellLast}>{panduan}</span>
        </div>
      ))}
    </div>
  );
}

export default function DataEntryProcedureTab() {
  const styles = useStyles();

  return (
    <Card className={styles.contentCard}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${tokens.colorNeutralStroke1}`, paddingBottom: '12px' }}>
        <FormRegular style={{ color: tokens.colorBrandForeground1, fontSize: '20px' }} />
        <Title3>Prosedur Pengisian Data Analisis Baru</Title3>
      </div>

      <div className={styles.infoBox}>
        <Text size={300}>
          Form analisis baru terdiri dari <strong>4 langkah</strong> yang harus diisi secara berurutan.
          Pastikan setiap data diambil dari rekam medis terkini pasien untuk akurasi prediksi AI yang optimal.
        </Text>
      </div>

      {/* LANGKAH 1 */}
      <div className={styles.stepHeader}>
        <span className={styles.stepBadge}>1</span>
        <div>
          <Text weight="semibold" size={400}>Identitas Orang Tua</Text>
          <Text size={300} style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>Data demografis ibu dan ayah bayi</Text>
        </div>
      </div>
      <p className={styles.subSectionTitle}>Bagian Identitas Ibu</p>
      <FieldTable rows={FIELDS_STEP1_IBU} />
      <p className={styles.subSectionTitle}>Bagian Identitas Ayah</p>
      <FieldTable rows={FIELDS_STEP1_AYAH} />

      {/* LANGKAH 2 */}
      <div className={styles.stepHeader}>
        <span className={styles.stepBadge}>2</span>
        <div>
          <Text weight="semibold" size={400}>Riwayat Kesehatan Ibu</Text>
          <Text size={300} style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>Kondisi klinis, riwayat penyakit, dan data laboratorium</Text>
        </div>
      </div>
      <FieldTable rows={FIELDS_STEP2} />
      <div className={styles.warningBox}>
        <Text size={300} style={{ color: tokens.colorPaletteRedForeground1 }}>
          <strong>⚠️ Perhatian LOUTCOME:</strong> Field ini wajib diisi dan sering menjadi sumber kesalahan.
          Pastikan mengacu pada riwayat kehamilan <em>sebelumnya</em>, bukan kehamilan yang sedang berlangsung saat ini.
        </Text>
      </div>

      {/* LANGKAH 3 */}
      <div className={styles.stepHeader}>
        <span className={styles.stepBadge}>3</span>
        <div>
          <Text weight="semibold" size={400}>Data Kehamilan Saat Ini</Text>
          <Text size={300} style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>Parameter kehamilan aktif dan kebiasaan ibu</Text>
        </div>
      </div>
      <FieldTable rows={FIELDS_STEP3} />
      <div className={styles.infoBox}>
        <Text size={300}>
          <strong>💡 Catatan GAINED:</strong> Satuan yang digunakan adalah <strong>pound (lbs)</strong>, bukan kilogram.
          Rumus konversi: berat bertambah (kg) × 2.205 = nilai GAINED.
          Contoh: penambahan 10 kg → isi <strong>22</strong>.
        </Text>
      </div>

      {/* LANGKAH 4 */}
      <div className={styles.stepHeader}>
        <span className={styles.stepBadge}>4</span>
        <div>
          <Text weight="semibold" size={400}>Hasil Analisis AI</Text>
          <Text size={300} style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>Review hasil prediksi dan simpan data rekam medis</Text>
        </div>
      </div>
      <ul className={styles.bulletList}>
        <li><Text>Setelah Langkah 3 selesai, sistem akan memproses data ke model AI AXARA secara otomatis.</Text></li>
        <li><Text>Halaman ini menampilkan <strong>probabilitas risiko FGR</strong>, visualisasi SHAP (kontribusi faktor risiko), skenario intervensi DiCE, dan narasi klinis dari Gemini AI.</Text></li>
        <li><Text>Tinjau hasil analisis bersama pasien dan tim medis sebelum menyimpan.</Text></li>
        <li><Text>Klik <strong>"Simpan Data"</strong> untuk menyimpan seluruh hasil ke rekam medis digital secara permanen. Setelah tersimpan, sistem akan mengarahkan kembali ke halaman Beranda.</Text></li>
      </ul>
    </Card>
  );
}
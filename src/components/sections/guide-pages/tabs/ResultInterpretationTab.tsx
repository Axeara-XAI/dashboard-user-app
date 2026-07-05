'use client';

import React from 'react';
import { makeStyles, tokens, Card, Text, Title3 } from '@fluentui/react-components';
import { BookOpen24Regular, ClipboardPulseRegular, CheckmarkCircleRegular, InfoRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  contentCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: tokens.colorBrandForeground1,
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  bulletList: {
    paddingLeft: '20px',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  disclaimerBox: {
    padding: '16px 20px',
    backgroundColor: tokens.colorPaletteYellowBackground1,
    borderLeft: `4px solid ${tokens.colorPaletteYellowForeground1}`,
    borderRadius: '4px',
  },
});

export default function ResultInterpretationTab() {
  const styles = useStyles();

  return (
    <Card className={styles.contentCard}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${tokens.colorNeutralStroke1}`, paddingBottom: '12px' }}>
        <BookOpen24Regular style={{ color: tokens.colorBrandForeground1 }} />
        <Title3>Cara Membaca Hasil Analisis</Title3>
      </div>

      <p className={styles.sectionTitle}><CheckmarkCircleRegular />1. Prediksi Risiko Utama</p>
      <Text>
        Model AXARA (Deep Neural Network) memprediksi risiko berdasarkan 33 parameter klinis ibu.
        Hasil dikategorikan menjadi dua:
      </Text>
      <ul className={styles.bulletList}>
        <li><Text weight="bold">Risiko Tinggi (FGR):</Text> Probabilitas bayi mengalami FGR di atas 50%. Intervensi pencegahan perlu segera direncanakan.</li>
        <li><Text weight="bold">Risiko Rendah (Non-FGR):</Text> Probabilitas FGR di bawah 50%. Lanjutkan perawatan ANC standar.</li>
      </ul>

      <p className={styles.sectionTitle}><ClipboardPulseRegular />2. Analisis Faktor Risiko (SHAP)</p>
      <Text>
        Grafik batang "Kontribusi Faktor Risiko" menunjukkan variabel mana yang paling mendorong
        probabilitas ke arah FGR (warna merah) atau menurunkannya (warna biru).
        Fokuskan perhatian medis pada variabel merah yang nilainya abnormal
        (misal: tekanan darah tinggi, hemoglobin rendah, atau merokok).
      </Text>

      <p className={styles.sectionTitle}><InfoRegular />3. Rekomendasi Intervensi (DiCE)</p>
      <Text>
        Fitur ini memberikan simulasi tindakan medis (counterfactuals). Model menunjukkan variabel mana
        yang jika diubah (misalnya menaikkan berat badan ibu atau menghentikan merokok) dapat menurunkan
        probabilitas FGR secara signifikan. Gunakan skenario ini sebagai basis diskusi rencana perawatan.
      </Text>

      <p className={styles.sectionTitle}><InfoRegular />Definisi Variabel Penting</p>
      <ul className={styles.bulletList}>
        <li><Text weight="bold">LOUTCOME:</Text> Hasil persalinan ibu pada kehamilan <em>sebelumnya</em> (bukan kehamilan saat ini).</li>
        <li><Text weight="bold">HEMOGLOB:</Text> Kadar hemoglobin ibu dalam g/dL (normalnya 11–15 g/dL).</li>
        <li><Text weight="bold">GAINED:</Text> Penambahan berat badan ibu selama kehamilan dalam <strong>pound/lbs</strong> (bukan kg).</li>
        <li><Text weight="bold">VISITS:</Text> Jumlah kunjungan ANC (Antenatal Care) selama kehamilan.</li>
      </ul>

      <div className={styles.disclaimerBox}>
        <Text weight="bold" style={{ display: 'block', marginBottom: '8px', color: tokens.colorPaletteYellowForeground3 }}>⚠️ Disclaimer Medis</Text>
        <Text>
          Aplikasi AXARA adalah alat bantu pendukung keputusan klinis berbasis AI (Clinical Decision Support System).
          Hasil analisis probabilitas, visualisasi risiko, dan rekomendasi intervensi yang dihasilkan{' '}
          <b>tidak menggantikan diagnosis maupun keputusan klinis dari dokter spesialis atau tenaga medis profesional.</b>{' '}
          Segala tindakan medis harus divalidasi ulang dengan observasi klinis, USG, dan standar operasional prosedur rumah sakit.
        </Text>
      </div>
    </Card>
  );
}
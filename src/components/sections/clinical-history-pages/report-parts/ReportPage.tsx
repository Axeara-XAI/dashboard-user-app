'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles, tokens, Spinner, Text } from '@fluentui/react-components';
import ReportHeader from './ReportHeader';
import ReportBody, { ReportData } from './ReportBody';
import PrintCover from './PrintCover';

const useStyles = makeStyles({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  contentScrollable: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  topBarContainer: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  contentInner: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '24px',
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: '16px',
    padding: '48px',
  },
  printFooter: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '16px',
    backgroundColor: tokens.colorBrandBackground,
    zIndex: 999,
  }
});

export default function ReportPage({ id }: { id: string }) {
  const styles = useStyles();
  const [data, setData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`/api/get-assessment-report/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        } else {
          setError(json.message || 'Gagal memuat laporan');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat menghubungi server');
      } finally {
        setIsLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Memuat hasil laporan analisis..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.loadingContainer}>
        <Text color="danger">⚠️ {error || 'Data laporan tidak ditemukan'}</Text>
      </div>
    );
  }

  return (
    <div className={`${styles.pageContainer} print-block`}>
      <div className={`${styles.contentScrollable} print-block`}>
        
        {/* Tombol kembali ditaruh di luar kertas putih */}
        <div className={`${styles.topBarContainer} print-hidden`}>
          <ReportHeader.BackButton patientId={(data as any).patient_id} />
        </div>

        {/* Cover diletakkan di luar contentInner agar bisa edge-to-edge */}
        <PrintCover patient={(data as any).patients} />

        {/* contentInner bertindak sebagai lembar kertas A4 untuk isi laporan */}
        <div className={styles.contentInner}>
          <ReportHeader patient={(data as any).patients} />
          <ReportBody data={data} />
        </div>
        
        {/* Footer dekoratif yang muncul di setiap lembar cetak */}
        <div className={`${styles.printFooter} print-only`} />
        
      </div>
    </div>
  );
}

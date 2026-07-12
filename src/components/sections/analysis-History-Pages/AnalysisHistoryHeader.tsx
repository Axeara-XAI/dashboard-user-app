'use client';

import React from 'react';
import { makeStyles, tokens, Button, Text, Body1 } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const useStyles = makeStyles({
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '16px',
    marginBottom: '16px',
  },
  breadcrumb: {
    color: tokens.colorNeutralForeground3,
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '4px',
  },
  breadcrumbLink: {
    color: tokens.colorNeutralForeground3,
    textDecoration: 'none',
    ':hover': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'underline',
    },
  },
  backButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-12px', 
  },
  pageTitle: {
    marginTop: '4px', 
  }
});

export default function AnalysisHistoryHeader() {
  const styles = useStyles();
  const router = useRouter();

  return (
    <div className={styles.headerSection}>
      
      {/* 1. Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/dashboard" className={styles.breadcrumbLink}>Beranda</Link> 
        <span>&gt;</span> 
        <Text>Riwayat Semua Analisis</Text>
      </div>
      
      {/* 2. Tombol Kembali */}
      <div className={styles.backButtonWrapper}>
        <Button
          appearance="subtle"
          icon={<ArrowLeft24Regular />}
          onClick={() => router.push('/dashboard')}
          aria-label="Kembali"
        >
          Kembali ke halaman utama
        </Button>
      </div>

      {/* 3. Judul Halaman */}
      <div>
        <Text 
          size={900} 
          weight="semibold" 
          className={styles.pageTitle} 
          style={{ color: tokens.colorNeutralForeground1, display: 'block' }}
        >
          Riwayat Semua Analisis
        </Text>
        <Body1 style={{ display: 'block', color: tokens.colorNeutralForeground3, marginTop: '4px' }}>
          Log lengkap seluruh prediksi FGR yang pernah dilakukan di sistem
        </Body1>
      </div>

    </div>
  );
}
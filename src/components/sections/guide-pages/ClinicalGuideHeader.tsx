'use client';

import React from 'react';
import { makeStyles, tokens, Button, Text, Body1, Link } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

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
    cursor: 'pointer',
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
  },
});

export default function ClinicalGuideHeader() {
  const styles = useStyles();
  const router = useRouter();

  return (
    <div className={styles.headerSection}>
      
      {/* 1. Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link className={styles.breadcrumbLink} onClick={() => router.push('/dashboard')}>
          Beranda
        </Link>
        <span>&gt;</span>
        <Text>Panduan Klinis</Text>
      </div>

      {/* 2. Tombol Kembali */}
      <div className={styles.backButtonWrapper}>
        <Button
          appearance="subtle"
          icon={<ArrowLeft24Regular />}
          onClick={() => router.back()}
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
          Panduan Klinis Axara
        </Text>
        <Body1 style={{ display: 'block', color: tokens.colorNeutralForeground3, marginTop: '4px' }}>
          Prosedur pengisian data & referensi penggunaan AI untuk deteksi risiko FGR
        </Body1>
      </div>

    </div>
  );
}
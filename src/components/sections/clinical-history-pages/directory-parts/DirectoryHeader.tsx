'use client';

import React from 'react';
import { makeStyles, tokens, Text, Link, Button } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

const useStyles = makeStyles({
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', // Mengatur jarak antar elemen secara vertikal
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
  backButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-12px', // Menarik tombol sedikit ke kiri agar ikonnya sejajar lurus dengan teks judul di bawahnya
  },
  pageTitle: {
    marginTop: '4px', 
  }
});

export default function DirectoryHeader() {
  const styles = useStyles();
  const router = useRouter();

  return (
    <div className={styles.headerSection}>
      
      {/* 1. Breadcrumb di paling atas */}
      <div className={styles.breadcrumb}>
        <Link href="/dashboard">Beranda</Link> <span>&gt;</span> <Text>Riwayat Klinis</Text>
      </div>
      
      {/* 2. Tombol panah + Teks "Kembali ke halaman utama" */}
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

      {/* 3. Judul Halaman tepat di bawah tombol kembali */}
      <Text 
        size={900} 
        weight="semibold" 
        className={styles.pageTitle} 
        style={{ color: tokens.colorNeutralForeground1 }}
      >
        Riwayat Klinis
      </Text>
      
    </div>
  );
}
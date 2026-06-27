'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { makeStyles, tokens, Button, Link } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons'; 

// Import komponen AlertModal dari folder UI
import AlertModal from '../../ui/AlertModal';

// ============================================================================
// INTERFACE PROPS
// ============================================================================
interface AnalysisHeaderProps {
  isFormDirty?: boolean; 
}

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  headerContainer: {
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  breadcrumb: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  breadcrumbLink: {
    color: tokens.colorNeutralForeground2,
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'underline',
    },
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  titleText: {
    fontSize: '24px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
  },
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AnalysisHeader({ isFormDirty = false }: AnalysisHeaderProps) {
  const styles = useStyles();
  const router = useRouter();
  
  // State untuk mengontrol kemunculan Alert Modal
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  // Fungsi evaluasi saat navigasi keluar diklik (berlaku untuk tombol X dan Beranda)
  const handleCloseClick = () => {
    if (isFormDirty) {
      // Jika form sudah diisi sebagian, tampilkan peringatan
      setIsCloseModalOpen(true);
    } else {
      // Jika form masih kosong, langsung keluar tanpa peringatan
      router.push('/dashboard');
    }
  };

  // Fungsi saat pengguna mengonfirmasi ingin keluar (mengabaikan isian)
  const handleConfirmClose = () => {
    setIsCloseModalOpen(false);
    router.push('/dashboard');
  };

  return (
    <>
      <div className={styles.headerContainer}>
        
        {/* --- BREADCRUMB SECTION --- */}
        <div className={styles.breadcrumb}>
          <Link className={styles.breadcrumbLink} onClick={handleCloseClick}>
            Beranda
          </Link>
          <span>&gt;</span>
          <span>Analisis Baru</span>
        </div>

        {/* --- TITLE & ACTIONS SECTION --- */}
        <div className={styles.titleRow}>
          <div className={styles.titleLeft}>
            <Button 
              appearance="subtle" 
              icon={<ArrowLeft24Regular />} 
              aria-label="Back" 
              onClick={handleCloseClick} 
            />
            <h1 className={styles.titleText}>Buat Laporan Analisis</h1>
          </div>
        </div>
      </div>

      {/* --- MEMANGGIL ALERT MODAL --- */}
      <AlertModal
        isOpen={isCloseModalOpen}
        title="Batalkan Pembuatan Laporan?"
        content="Anda memiliki data yang belum disimpan. Jika Anda keluar sekarang, semua data yang telah diisi pada formulir ini akan hilang secara permanen."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        isDanger={true} 
        onConfirm={handleConfirmClose}
        onCancel={() => setIsCloseModalOpen(false)}
      />
    </>
  );
}

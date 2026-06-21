'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { MoreHorizontal20Regular, Dismiss24Regular } from '@fluentui/react-icons';

// Import komponen AlertModal dari folder UI
import AlertModal from '../../ui/AlertModal';

// ============================================================================
// INTERFACE PROPS
// ============================================================================
interface AnalysisHeaderProps {
  // Properti ini nantinya dikirim dari parent (page.tsx) untuk memberi tahu 
  // apakah pengguna sudah mengetik sesuatu di form atau belum.
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
    fontSize: '12px',
    color: tokens.colorNeutralForeground2,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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

  // Fungsi evaluasi saat tombol X diklik
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
          <span>Beranda</span>
          <span>&gt;</span>
          <span>Analysis</span>
        </div>

        {/* --- TITLE & ACTIONS SECTION --- */}
        <div className={styles.titleRow}>
          <div className={styles.titleLeft}>
            <h1 className={styles.titleText}>Buat Laporan Analisis</h1>
            <Button 
              appearance="subtle" 
              icon={<MoreHorizontal20Regular />} 
              aria-label="More options" 
            />
          </div>
          
          {/* Tombol Close [X] sekarang menjalankan fungsi handleCloseClick */}
          <Button 
            appearance="subtle" 
            icon={<Dismiss24Regular />} 
            aria-label="Close" 
            onClick={handleCloseClick} 
          />
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
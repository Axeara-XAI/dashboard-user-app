'use client';

import React, { useState } from 'react';
import { makeStyles, tokens, Button, Input } from '@fluentui/react-components';
import {
  Bot24Regular,
  Settings24Regular,
  Person24Regular,
  SignOut24Regular,
  Search24Regular,
} from '@fluentui/react-icons';

// Import komponen AlertModal yang baru dibuat
import AlertModal from '../ui/AlertModal';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  header: {
    height: '56px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    boxShadow: tokens.shadow2,
  },

  /* --- Left Section (Brand & Navigation) --- */
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandLogo: {
    display: 'block',
  },
  brandTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: tokens.colorCompoundBrandStroke,
  },
  navGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  /* --- Center Section (Search Bar) --- */
  headerCenter: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 24px',
  },
  searchBar: {
    width: '100%',
    maxWidth: '480px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },

  /* --- Right Section (User Actions) --- */
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Navbar() {
  const styles = useStyles();

  // State untuk mengontrol kemunculan Alert Modal Logout
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Fungsi eksekusi saat user benar-benar klik "Ya, Keluar"
  const handleConfirmLogout = () => {
    console.log('Proses logout berjalan...');
    
    setIsLogoutModalOpen(false); // Tutup modal setelah selesai
  };

  return (
    <>
      <header className={styles.header}>
        
        {/* --- LEFT SECTION: BRAND & NAV --- */}
        <div className={styles.headerLeft}>
          <div className={styles.brandContainer}>
            <img
              src="/logo.svg"
              alt="Axara Panel Logo"
              width={24}
              height={24}
              className={styles.brandLogo}
            />
            <div className={styles.brandTitle}>Axara Panel</div>
          </div>

          <nav className={styles.navGroup}>
            <Button appearance="subtle" icon={<Bot24Regular />}>
              Ai Asisten
            </Button>
            <Button appearance="subtle" icon={<Settings24Regular />}>
              Settings
            </Button>
          </nav>
        </div>

        {/* --- CENTER SECTION: SEARCH BAR --- */}
        <div className={styles.headerCenter}>
          <Input
            className={styles.searchBar}
            placeholder="Cari sumber daya, layanan, dan dokumen..."
            contentBefore={<Search24Regular />}
            appearance="outline"
          />
        </div>

        {/* --- RIGHT SECTION: PROFILE & LOGOUT --- */}
        <div className={styles.headerRight}>
          {/* Tombol Profil dengan nama "Guest" */}
          <Button
            appearance="subtle"
            icon={<Person24Regular />}
            title="Profile"
          >
            Guest
          </Button>
          
          {/* Tombol Logout memicu pembukaan Modal */}
          <Button
            appearance="subtle"
            icon={<SignOut24Regular />}
            shape="circular"
            title="Logout"
            onClick={() => setIsLogoutModalOpen(true)}
          />
        </div>
        
      </header>

      {/* --- MEMANGGIL ALERT MODAL --- */}
      <AlertModal
        isOpen={isLogoutModalOpen}
        title="Konfirmasi Keluar"
        content="Apakah Anda yakin ingin keluar dari sesi Axara Panel saat ini? Anda harus masuk kembali untuk mengakses data medis dan laporan analisis."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        isDanger={true} 
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
'use client';

import React, { useState } from 'react';
import { makeStyles, mergeClasses, tokens, Button, Input } from '@fluentui/react-components';
import {
  Bot24Regular,
  Settings24Regular,
  Person24Regular,
  SignOut24Regular,
  Search24Regular,
  Navigation24Regular,
  Dismiss24Regular,
} from '@fluentui/react-icons';

import AlertModal from '../ui/AlertModal';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  /* --- Main Header Bar --- */
  header: {
    height: '56px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    boxShadow: tokens.shadow2,
    position: 'relative',
    zIndex: 100,
    '@media (max-width: 768px)': {
      padding: '0 16px',
    },
  },

  /* --- Left Section --- */
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandLogo: { display: 'block' },
  brandTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: tokens.colorCompoundBrandStroke,
  },

  /* Desktop nav — hidden on mobile */
  navGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginLeft: '16px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },

  /* --- Center Section (Search) — hidden on mobile --- */
  headerCenter: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 24px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  searchBar: {
    width: '100%',
    maxWidth: '480px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },

  /* --- Right Section --- */
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  /* Profile label hidden on mobile */
  profileLabel: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },

  /* Hamburger button — only visible on mobile */
  hamburgerBtn: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  },

  /* ====================================================================
     MOBILE DRAWER
  ==================================================================== */

  /* Dark overlay behind drawer */
  overlay: {
    position: 'fixed',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 200,
    transition: 'opacity 0.25s ease',
    opacity: '1',
  },
  overlayHidden: {
    opacity: '0',
    pointerEvents: 'none',
  },

  /* Slide-out drawer panel */
  drawer: {
    position: 'fixed',
    top: '0',
    left: '0',
    bottom: '0',
    width: '280px',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow64,
    zIndex: 300,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateX(0)',
  },
  drawerHidden: {
    transform: 'translateX(-100%)',
  },

  /* Drawer inner sections */
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    height: '56px',
    flexShrink: '0',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  drawerBody: {
    flex: '1',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflowY: 'auto',
  },
  drawerSearch: {
    width: '100%',
    marginBottom: '8px',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '8px 8px 4px 8px',
  },
  divider: {
    height: '1px',
    backgroundColor: tokens.colorNeutralStroke1,
    margin: '8px 0',
  },
  drawerBtn: {
    width: '100%',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
});

// ============================================================================
// COMPONENT
// ============================================================================
export default function Navbar() {
  const styles = useStyles();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMenu  = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleConfirmLogout = () => {
    console.log('Proses logout berjalan...');
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      {/* ================================================================
          MAIN HEADER BAR
      ================================================================ */}
      <header className={styles.header}>

        {/* LEFT: Hamburger (mobile) + Brand + Desktop Nav */}
        <div className={styles.headerLeft}>
          {/* Hamburger — visible only on mobile */}
          <Button
            id="hamburger-menu-btn"
            className={styles.hamburgerBtn}
            appearance="subtle"
            icon={<Navigation24Regular />}
            shape="circular"
            aria-label="Buka menu navigasi"
            onClick={openMenu}
          />

          {/* Brand */}
          <div className={styles.brandContainer}>
            <img src="/logo.svg" alt="Axara Panel Logo" width={24} height={24} className={styles.brandLogo} />
            <div className={styles.brandTitle}>Axara Panel</div>
          </div>

          {/* Desktop nav links */}
          <nav className={styles.navGroup}>
            <Button appearance="subtle" icon={<Bot24Regular />}>Ai Asisten</Button>
            <Button appearance="subtle" icon={<Settings24Regular />}>Settings</Button>
          </nav>
        </div>

        {/* CENTER: Search bar (desktop only) */}
        <div className={styles.headerCenter}>
          <Input
            className={styles.searchBar}
            placeholder="Cari sumber daya, layanan, dan dokumen..."
            contentBefore={<Search24Regular />}
            appearance="outline"
          />
        </div>

        {/* RIGHT: Profile + Logout */}
        <div className={styles.headerRight}>
          <Button appearance="subtle" icon={<Person24Regular />} title="Profile">
            <span className={styles.profileLabel}>Guest</span>
          </Button>
          <Button
            id="logout-btn"
            appearance="subtle"
            icon={<SignOut24Regular />}
            shape="circular"
            title="Logout"
            onClick={() => setIsLogoutModalOpen(true)}
          />
        </div>

      </header>

      {/* ================================================================
          MOBILE DRAWER — Overlay
      ================================================================ */}
      <div
        className={mergeClasses(styles.overlay, !isMobileMenuOpen && styles.overlayHidden)}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ================================================================
          MOBILE DRAWER — Slide-out panel
      ================================================================ */}
      <div
        className={mergeClasses(styles.drawer, !isMobileMenuOpen && styles.drawerHidden)}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        {/* Drawer header */}
        <div className={styles.drawerHeader}>
          <div className={styles.brandContainer}>
            <img src="/logo.svg" alt="Axara Panel Logo" width={20} height={20} />
            <div className={styles.brandTitle}>Axara Panel</div>
          </div>
          <Button
            appearance="subtle"
            icon={<Dismiss24Regular />}
            shape="circular"
            aria-label="Tutup menu"
            onClick={closeMenu}
          />
        </div>

        {/* Drawer body */}
        <div className={styles.drawerBody}>

          {/* Search inside drawer */}
          <Input
            className={styles.drawerSearch}
            placeholder="Cari sumber daya..."
            contentBefore={<Search24Regular />}
            appearance="outline"
          />

          <div className={styles.divider} />
          <div className={styles.sectionLabel}>Menu</div>

          <Button
            className={styles.drawerBtn}
            appearance="subtle"
            icon={<Bot24Regular />}
            onClick={closeMenu}
          >
            Ai Asisten
          </Button>
          <Button
            className={styles.drawerBtn}
            appearance="subtle"
            icon={<Settings24Regular />}
            onClick={closeMenu}
          >
            Settings
          </Button>

          <div className={styles.divider} />
          <div className={styles.sectionLabel}>Akun</div>

          <Button
            className={styles.drawerBtn}
            appearance="subtle"
            icon={<Person24Regular />}
            onClick={closeMenu}
          >
            Guest
          </Button>
          <Button
            className={styles.drawerBtn}
            appearance="subtle"
            icon={<SignOut24Regular />}
            onClick={() => { closeMenu(); setIsLogoutModalOpen(true); }}
          >
            Keluar dari Sesi
          </Button>

        </div>
      </div>

      {/* ================================================================
          LOGOUT ALERT MODAL
      ================================================================ */}
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
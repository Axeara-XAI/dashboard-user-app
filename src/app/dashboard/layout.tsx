'use client';

import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
// Sesuaikan path import Navbar dengan struktur foldermu
import Navbar from '../../components/layout/Navbar'; 

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
  },
  contentBody: {
    width: '100%',
    padding: '0px', // KITA NOL-KAN AGAR JARAK DIATUR OLEH PAGE.TSX
    // maxWidth dan margin auto kita hapus agar bisa membentang full screen
  },
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      
      {/* Navbar otomatis akan ada di semua sub-halaman /dashboard */}
      <Navbar />

      <div className={styles.mainContent}>
        <main className={styles.contentBody}>
          {children}
        </main>
      </div>

    </div>
  );
}

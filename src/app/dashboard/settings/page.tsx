'use client';

import React from 'react';
import { makeStyles, Spinner } from '@fluentui/react-components';
import { useSession } from 'next-auth/react';
import { SettingsMain } from '../../../components/sections/setting-pages/setting-pages';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    height: '100%',
    overflowY: 'auto',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 56px)', // Kurangi tinggi navbar agar pas 1 layar penuh
  }
});

export default function SettingsPage() {
  const styles = useStyles();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Memuat pengaturan..." />
      </div>
    );
  }

  if (status === 'unauthenticated' || !session?.user) {
    return (
      <div className={styles.container}>
        <h2>Akses Ditolak</h2>
        <div>Harap login untuk melihat halaman ini.</div>
      </div>
    );
  }

  return (
    <SettingsMain 
      initialName={session.user.name || ''} 
      email={session.user.email || ''} 
      role={(session.user as any).role || 'user'} 
    />
  );
}

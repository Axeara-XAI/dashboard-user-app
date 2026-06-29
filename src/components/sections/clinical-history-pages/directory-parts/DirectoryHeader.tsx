'use client';

import React from 'react';
import { makeStyles, tokens, Text, Link } from '@fluentui/react-components';

const useStyles = makeStyles({
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px', 
  },
  breadcrumb: {
    color: tokens.colorNeutralForeground3,
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
});

export default function DirectoryHeader() {
  const styles = useStyles();

  return (
    <div className={styles.headerSection}>
      <div className={styles.breadcrumb}>
        <Link href="/dashboard">Beranda</Link> <span>&gt;</span> <Text>Riwayat Klinis</Text>
      </div>
      
      <div className={styles.titleRow}>
        <Text size={900} weight="semibold" style={{ color: tokens.colorNeutralForeground1 }}>
          Riwayat Klinis
        </Text>
      </div>
    </div>
  );
}
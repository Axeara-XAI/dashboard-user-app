'use client';

import React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';
import { ArrowLeftRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  headerSection: { 
    display: 'flex', 
    justifyContent: 'flex-start', // PERBAIKAN: Membuat tombol merapat ke sisi kiri
    alignItems: 'center', 
    paddingBottom: '16px' 
  },
});

interface AssessmentHeaderProps {
  onBack: () => void;
}

export default function AssessmentHeader({ onBack }: AssessmentHeaderProps) {
  const styles = useStyles();

  return (
    <div className={styles.headerSection}>
      <Button appearance="transparent" icon={<ArrowLeftRegular />} onClick={onBack}>
        Kembali ke Daftar Pasien
      </Button>
    </div>
  );
}
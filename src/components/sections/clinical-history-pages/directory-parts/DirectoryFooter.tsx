'use client';

import React from 'react';
import { makeStyles, tokens, Text, Button } from '@fluentui/react-components';
import { 
  BookQuestionMarkRegular, HeartPulseRegular, 
  ChevronLeftRegular, ChevronRightRegular 
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  footerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto', 
    padding: '16px 0px 16px 0px', 
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`, 
    flexWrap: 'wrap',
    gap: '16px',
  },
  footerRightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  quickActionsFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  paginationGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  divider: {
    width: '1px',
    height: '16px',
    backgroundColor: tokens.colorNeutralStroke2,
    margin: '0 8px',
  },
});

interface DirectoryFooterProps {
  totalPatients: number;
}

export default function DirectoryFooter({ totalPatients }: DirectoryFooterProps) {
  const styles = useStyles();

  return (
    <div className={styles.footerSection}>
      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
        Menampilkan 1 - {totalPatients} dari {totalPatients} data.
      </Text>

      <div className={styles.footerRightGroup}>
        <div className={styles.quickActionsFooter}>
          <Button appearance="transparent" size="small" icon={<BookQuestionMarkRegular />}>
            Panduan Manajemen
          </Button>
          <Button appearance="transparent" size="small" icon={<HeartPulseRegular />}>
            Diagnosis Performa Sistem
          </Button>
        </div>

        {totalPatients > 20 && <div className={styles.divider} />}

        {totalPatients > 20 && (
          <div className={styles.paginationGroup}>
            <Button appearance="subtle" size="small" icon={<ChevronLeftRegular />} disabled>
              Sebel.
            </Button>
            <Text size={200} weight="semibold" style={{ padding: '0 8px' }}>1</Text>
            <Button appearance="subtle" size="small" icon={<ChevronRightRegular />} iconPosition="after">
              Selanj.
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
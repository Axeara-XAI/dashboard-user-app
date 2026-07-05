'use client';

import React from 'react';
import { makeStyles, tokens, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    marginTop: '16px',
    color: tokens.colorNeutralForeground3,
  }
});

interface AnalysisHistoryFooterProps {
  totalData: number;
}

export default function AnalysisHistoryFooter({ totalData }: AnalysisHistoryFooterProps) {
  const styles = useStyles();
  
  return (
    <div className={styles.footerContainer}>
      <Text size={300}>
        Menampilkan {totalData > 0 ? 1 : 0} - {totalData} dari {totalData} data.
      </Text>
    </div>
  );
}
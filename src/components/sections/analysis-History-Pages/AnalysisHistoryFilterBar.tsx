'use client';

import React from 'react';
import { makeStyles, tokens, Button, Input } from '@fluentui/react-components';
import { SearchRegular, ArrowClockwiseRegular, DocumentArrowDownRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '16px',
    marginBottom: '16px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexWrap: 'wrap',
    gap: '12px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  searchBox: {
    minWidth: '280px',
  }
});

export default function AnalysisHistoryFilterBar() {
  const styles = useStyles();

  return (
    <div className={styles.filterContainer}>
      <div className={styles.actions}>
        <Button icon={<ArrowClockwiseRegular />} appearance="subtle">Refresh</Button>
        <Button icon={<DocumentArrowDownRegular />} appearance="subtle">Ekspor ke CSV</Button>
      </div>
      <Input
        className={styles.searchBox}
        placeholder="Cari berdasarkan nama pasien atau No. RM"
        contentBefore={<SearchRegular />}
      />
    </div>
  );
}
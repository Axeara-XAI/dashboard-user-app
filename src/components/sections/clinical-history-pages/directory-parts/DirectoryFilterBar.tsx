'use client';

import React from 'react';
import { makeStyles, tokens, Input, Text, Button } from '@fluentui/react-components';
import { SearchRegular, DismissRegular, AddRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  filterArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0 8px 0',
    flexWrap: 'wrap',
  },
  filterInput: {
    minWidth: '240px',
  },
  activeFilterBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '2px 10px',
    borderRadius: '16px',
    fontSize: '13px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  boldText: {
    fontWeight: '600',
  },
  blueIcon: {
    color: tokens.colorBrandForeground1,
  },
});

export default function DirectoryFilterBar() {
  const styles = useStyles();

  return (
    <div className={styles.filterArea}>
      <Input 
        className={styles.filterInput}
        placeholder="Cari sumber daya, pasien, dan No. RM..." 
        contentBefore={<SearchRegular />} 
      />
      
      <div className={styles.activeFilterBadge}>
        <Text>Status Kehamilan <span className={styles.boldText}>sama dengan</span> Aktif</Text>
        <Button icon={<DismissRegular />} appearance="transparent" size="small" style={{ minWidth: 'auto', padding: '2px' }} />
      </div>
      <div className={styles.activeFilterBadge}>
        <Text>Risiko FGR <span className={styles.boldText}>sama dengan</span> Semua</Text>
        <Button icon={<DismissRegular />} appearance="transparent" size="small" style={{ minWidth: 'auto', padding: '2px' }} />
      </div>

      <Button appearance="subtle" icon={<AddRegular className={styles.blueIcon} />}>Tambahkan filter</Button>
    </div>
  );
}
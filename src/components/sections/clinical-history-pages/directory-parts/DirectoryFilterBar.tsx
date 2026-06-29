'use client';

import React from 'react';
import { makeStyles, Input } from '@fluentui/react-components';
import { SearchRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  filterArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0 8px 0',
    flexWrap: 'wrap',
  },
  filterInput: {
    minWidth: '300px',
  },
});

interface DirectoryFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function DirectoryFilterBar({ searchQuery, onSearchChange }: DirectoryFilterBarProps) {
  const styles = useStyles();

  return (
    <div className={styles.filterArea}>
      <Input 
        className={styles.filterInput}
        placeholder="Cari berdasarkan nama pasien atau No. RM..." 
        contentBefore={<SearchRegular />} 
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
'use client';

import React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { 
  AddRegular, 
  ArrowClockwiseRegular, 
  DocumentArrowDownRegular 
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  commandBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '16px',
    paddingBottom: '8px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexWrap: 'wrap',
  },
  blueIcon: {
    color: tokens.colorBrandForeground1,
  },
  divider: {
    width: '1px',
    height: '16px',
    backgroundColor: tokens.colorNeutralStroke2,
    margin: '0 8px',
  },
});

interface DirectoryCommandBarProps {
  onNew: () => void;
  onRefresh?: () => void;
  onExportCSV: () => void;
}

export default function DirectoryCommandBar({ onNew, onRefresh, onExportCSV }: DirectoryCommandBarProps) {
  const styles = useStyles();

  return (
    <div className={styles.commandBar}>
      <Button appearance="transparent" icon={<AddRegular className={styles.blueIcon} />} onClick={onNew}>
        Buat Baru
      </Button>
      <div className={styles.divider} />
      <Button appearance="transparent" icon={<ArrowClockwiseRegular className={styles.blueIcon} />} onClick={onRefresh}>
        Refresh
      </Button>
      <Button appearance="transparent" icon={<DocumentArrowDownRegular className={styles.blueIcon} />} onClick={onExportCSV}>
        Ekspor ke CSV
      </Button>
    </div>
  );
}
'use client';

import React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { 
  PlayRegular, 
  DeleteRegular, 
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

export default function DirectoryCommandBar() {
  const styles = useStyles();

  return (
    <div className={styles.commandBar}>
      <Button appearance="transparent" icon={<PlayRegular className={styles.blueIcon} />}>Mulai Analisis</Button>
      <Button appearance="transparent" icon={<DeleteRegular className={styles.blueIcon} />}>Hapus</Button>
      <div className={styles.divider} />
      <Button appearance="transparent" icon={<ArrowClockwiseRegular className={styles.blueIcon} />}>Refresh</Button>
      <Button appearance="transparent" icon={<DocumentArrowDownRegular className={styles.blueIcon} />}>Ekspor ke CSV</Button>
    </div>
  );
}
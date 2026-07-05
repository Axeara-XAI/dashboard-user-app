'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

// Impor komponen terpisah
import AnalysisHistoryHeader from './AnalysisHistoryHeader';
import AnalysisHistoryFilterBar from './AnalysisHistoryFilterBar';
import AnalysisHistoryFooter from './AnalysisHistoryFooter';
import HistoryTable from './history-part/HistoryTable';

const useStyles = makeStyles({
  pageWrapper: {
    padding: '24px 32px 32px 32px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 56px)',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: 'transparent', 
  },
  innerContent: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function AnalysisHistoryPage() {
  const styles = useStyles();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-all-assessments')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAssessments(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        
        {/* Panggil Header */}
        <AnalysisHistoryHeader />

        <div className={styles.innerContent}>
          {/* Panggil Filter Bar */}
          <AnalysisHistoryFilterBar />

          {/* Panggil Tabel */}
          <HistoryTable assessments={assessments} isLoading={loading} />

          {/* Panggil Footer */}
          <AnalysisHistoryFooter totalData={assessments.length} />
        </div>

      </div>
    </div>
  );
}
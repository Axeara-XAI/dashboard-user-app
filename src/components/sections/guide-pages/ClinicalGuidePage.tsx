'use client';

import React, { useState } from 'react';
import { makeStyles, tokens, Tab, TabList } from '@fluentui/react-components';
import { BookOpen24Regular, FormRegular } from '@fluentui/react-icons';

// Import komponen modular
import ClinicalGuideHeader from './ClinicalGuideHeader';
import DataEntryProcedureTab from './tabs/DataEntryProcedureTab';
import ResultInterpretationTab from './tabs/ResultInterpretationTab';

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
  tabWrapper: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    marginBottom: '24px', 
  },
  innerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
});

export default function ClinicalGuidePage() {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState('procedure');

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>

        {/* --- MEMANGGIL HEADER TERPISAH --- */}
        <ClinicalGuideHeader />

        {/* --- TAB NAVIGASI --- */}
        <div className={styles.tabWrapper}>
          <TabList selectedValue={activeTab} onTabSelect={(_, d) => setActiveTab(d.value as string)}>
            <Tab value="procedure" icon={<FormRegular />}>Prosedur Pengisian Data</Tab>
            <Tab value="interpretation" icon={<BookOpen24Regular />}>Cara Membaca Hasil</Tab>
          </TabList>
        </div>

        {/* --- KONTEN TAB --- */}
        <div className={styles.innerContent}>
          {activeTab === 'procedure' && <DataEntryProcedureTab />}
          {activeTab === 'interpretation' && <ResultInterpretationTab />}
        </div>
        
      </div>
    </div>
  );
}
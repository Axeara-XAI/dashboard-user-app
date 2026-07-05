'use client';

import React, { useState } from 'react';
import { makeStyles, tokens, Button, Title3, Body1, Link, Tab, TabList } from '@fluentui/react-components';
import { ArrowLeft24Regular, BookOpen24Regular, FormRegular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

// Import sub-components
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
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    boxShadow: tokens.shadow4,
  },
  innerContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'auto',
  },
  breadcrumb: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '24px 24px 0 24px',
  },
  breadcrumbLink: {
    color: tokens.colorNeutralForeground2,
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'underline',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '0 24px 16px 24px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

export default function ClinicalGuidePage() {
  const styles = useStyles();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('procedure');

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>

        <div className={styles.breadcrumb}>
          <Link className={styles.breadcrumbLink} onClick={() => router.push('/dashboard')}>
            Beranda
          </Link>
          <span>&gt;</span>
          <span>Panduan Klinis</span>
        </div>

        <div className={styles.header} style={{ marginTop: '16px' }}>
          <Button appearance="subtle" icon={<ArrowLeft24Regular />} onClick={() => router.back()} />
          <div>
            <Title3>Panduan Klinis AXARA</Title3>
            <Body1 style={{ display: 'block', color: tokens.colorNeutralForeground2 }}>
              Prosedur pengisian data & referensi penggunaan AI untuk deteksi risiko FGR
            </Body1>
          </div>
        </div>

        <div style={{ padding: '0 24px', borderBottom: `1px solid ${tokens.colorNeutralStroke1}` }}>
          <TabList selectedValue={activeTab} onTabSelect={(_, d) => setActiveTab(d.value as string)}>
            <Tab value="procedure" icon={<FormRegular />}>Prosedur Pengisian Data</Tab>
            <Tab value="interpretation" icon={<BookOpen24Regular />}>Cara Membaca Hasil</Tab>
          </TabList>
        </div>

        <div className={styles.innerContent}>
          {activeTab === 'procedure' && <DataEntryProcedureTab />}
          {activeTab === 'interpretation' && <ResultInterpretationTab />}
        </div>
        
      </div>
    </div>
  );
}
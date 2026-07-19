'use client';

import React, { useState } from 'react';
import { 
  makeStyles, 
  tokens, 
  TabList, 
  Tab, 
  Input, 
  Title3,
  Divider
} from '@fluentui/react-components';
import { Search20Regular, Person20Regular } from '@fluentui/react-icons';
import { AccountSettings } from './setting-part/AccountSettings';
import { SecuritySettings } from './setting-part/SecuritySettings';

const useStyles = makeStyles({
  layout: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  sidebar: {
    width: '280px',
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 16px',
    gap: '16px',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  sidebarTitle: {
    marginBottom: '8px',
  },
  sidebarSearch: {
    width: '100%',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0px',
  },
  contentArea: {
    flex: 1,
    padding: '32px 48px',
    overflowY: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  contentMaxWidth: {
    maxWidth: '800px',
  }
});

interface SettingsMainProps {
  initialName: string;
  email: string;
  role: string;
}

type TabValue = 'profile';

export const SettingsMain: React.FC<SettingsMainProps> = ({ initialName, email, role }) => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<TabValue>('profile');

  const onTabSelect = (event: unknown, data: { value: unknown }) => {
    setActiveTab(data.value as TabValue);
  };

  return (
    <div className={styles.layout}>
      {/* SIDEBAR KIRI */}
      <div className={styles.sidebar}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className={styles.sidebarTitle}>
            <Title3>Pengaturan Akun</Title3>
          </div>
          
          <Input 
            className={styles.sidebarSearch}
            placeholder="Cari pengaturan..." 
            contentBefore={<Search20Regular />} 
          />
          
          <Divider style={{ margin: '0' }} />

          <div className={styles.sidebarNav}>
            {/* Menu Item Aktif dengan Background Abu-abu */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                backgroundColor: tokens.colorNeutralBackground1Selected,
                borderRadius: tokens.borderRadiusMedium,
                cursor: 'pointer',
                color: tokens.colorNeutralForeground1,
                fontWeight: 600
              }}
            >
              <Person20Regular />
              <span>Informasi Akun</span>
            </div>
          </div>
        </div>
      </div>

      {/* KONTEN KANAN */}
      <div className={styles.contentArea}>
        <div className={styles.contentMaxWidth}>
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <AccountSettings initialName={initialName} email={email} role={role} />
              <SecuritySettings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { 
  makeStyles, 
  tokens, 
  Text, 
  TabList, 
  Tab, 
  Table, 
  TableHeader, 
  TableHeaderCell, 
  TableBody, 
  TableRow, 
  TableCell 
} from '@fluentui/react-components';
import { 
  DataTrending24Regular, 
  Clipboard24Regular, 
  Box24Regular, 
  Share24Regular 
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
  },
  tableContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '8px 16px',
    boxShadow: tokens.shadow2,
  },
  tabList: {
    marginBottom: '16px',
  },
  resourceLink: {
    color: tokens.colorBrandForegroundLink,
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  iconWrapper: {
    color: tokens.colorCompoundBrandStroke,
    display: 'flex',
    marginRight: '12px',
  }
});

// Mock Data: Riwayat aktivitas yang disesuaikan dengan layanan
const recentHistoryData = [
  { name: 'Analisis Prediksi DataSpace', type: 'Analysis', lastAccessed: '10 menit yang lalu', icon: <DataTrending24Regular /> },
  { name: 'Rekam Medis Pasien 012', type: 'Riwayat Klinis', lastAccessed: '2 jam yang lalu', icon: <Clipboard24Regular /> },
  { name: 'Dataset Mentah V1', type: 'Kontainer data', lastAccessed: 'Kemarin', icon: <Box24Regular /> },
  { name: 'Laporan Sinkronisasi', type: 'Berbagi Data', lastAccessed: '3 hari yang lalu', icon: <Share24Regular /> },
  { name: 'Konfigurasi Endpoint API', type: 'Kontainer data', lastAccessed: '1 minggu yang lalu', icon: <Box24Regular /> },
];

export default function RecentHistorySection() {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState<string>('terbaru');

  return (
    <div className={styles.container}>
      <Text className={styles.sectionTitle} as="h2">
        Riwayat Akses
      </Text>
      
      <div className={styles.tableContainer}>
        {/* Tab Navigasi untuk Riwayat */}
        <TabList 
          className={styles.tabList} 
          selectedValue={selectedTab} 
          onTabSelect={(e, data) => setSelectedTab(data.value as string)}
        >
          <Tab value="terbaru">Terbaru</Tab>
          <Tab value="favorit">Favorit</Tab>
        </TabList>

        {/* Tabel Riwayat */}
        <Table size="medium">
          <TableHeader>
            <TableRow>
              <TableHeaderCell style={{ width: '400px' }}>Nama Item</TableHeaderCell>
              <TableHeaderCell style={{ width: '250px' }}>Tipe Layanan</TableHeaderCell>
              <TableHeaderCell>Terakhir Diakses</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentHistoryData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={styles.iconWrapper}>
                      {row.icon}
                    </span>
                    <span className={styles.resourceLink}>{row.name}</span>
                  </div>
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.lastAccessed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
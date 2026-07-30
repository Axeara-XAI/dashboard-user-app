'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles, Title3, Spinner } from '@fluentui/react-components';

import useSWR from 'swr';
// Impor sub-sections internal
import ServicesSection from './ServicesSection';
import DashboardStatsSection from '../dashboard-pages/dashboard-part/DashboardStatsSection';
import DashboardRecentSection from '../dashboard-pages/dashboard-part/DashboardRecentSection';

import { fetcher } from '@/utils/api-helpers';

const useStyles = makeStyles({
  dashboardWrapper: {
    padding: '24px 32px 32px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    boxSizing: 'border-box',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '64px',
  },
  sectionHeading: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '-8px'
  }
});

export default function DashboardMain() {
  const styles = useStyles();
  
  const { data: statsResponse, error, isLoading } = useSWR('/api/get-stats', fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
  });

  const stats = statsResponse?.success ? statsResponse.data : null;
  const errorMessage = error?.message || (statsResponse && !statsResponse.success ? statsResponse.error || statsResponse.message : null);

  return (
    <div className={styles.dashboardWrapper}>
      {/* 1. Bagian Menu Utama / Navigasi Layanan */}
      <ServicesSection />

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Spinner size="medium" label="Sinkronisasi data ringkasan..." />
        </div>
      ) : (
        stats ? (
          <>
            {/* 2. Judul dan Bagian Statistik Metrik */}
            <Title3 className={styles.sectionHeading}>Statistik Ringkas Pasien</Title3>
            <DashboardStatsSection 
              totalPatients={stats.totalPatients}
              totalAssessments={stats.totalAssessments}
              totalFGR={stats.totalFGR}
              totalNonFGR={stats.totalNonFGR}
              fgrPercentage={stats.fgrPercentage}
            />

            {/* 3. Bagian Log Aktivitas Analisis Terakhir */}
            <DashboardRecentSection assessments={stats.latestAssessments} />
          </>
        ) : errorMessage ? (
          <div style={{ padding: '24px', backgroundColor: '#ffe5e5', borderRadius: '8px', border: '1px solid #ff4d4d' }}>
            <Title3 style={{ color: '#d10000' }}>Gagal Memuat Statistik</Title3>
            <p style={{ color: '#d10000', marginTop: '8px' }}>
              Error: {typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)}
            </p>
            <p style={{ marginTop: '8px', fontSize: '12px' }}>
              Pesan ini hanya terlihat saat terjadi kesalahan pada server (Database atau Konfigurasi).
            </p>
          </div>
        ) : null
      )}
    </div>
  );
}
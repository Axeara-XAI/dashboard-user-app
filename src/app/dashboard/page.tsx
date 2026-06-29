'use client';

import React from 'react';
import { makeStyles } from '@fluentui/react-components';

import { ServicesSection, RecentHistorySection } from '../../components/sections/dashboard-pages/dashboard-pages';

const useStyles = makeStyles({
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', 
  },
});

export default function DashboardPage() {
  const styles = useStyles();

  return (
    <div className={styles.dashboardContainer}>
      <ServicesSection />
    </div>
  );
}

'use client';

import React, { Suspense } from 'react';
import ReportPage from '../../../../../components/sections/clinical-history-pages/report-parts/ReportPage';
import { Spinner } from '@fluentui/react-components';

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params);
  
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner size="large" label="Memuat halaman laporan..." /></div>}>
      <ReportPage id={params.id} />
    </Suspense>
  );
}

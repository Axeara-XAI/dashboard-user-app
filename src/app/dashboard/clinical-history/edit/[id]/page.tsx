'use client';

import React, { Suspense } from 'react';
import EditAnalysisPage from '../../../../../components/sections/clinical-history-pages/edit-part/EditAnalysisPage';
import { Spinner } from '@fluentui/react-components';

export default function Page(props: { params: Promise<{ id: string }> }) {
  // We use React.use() to unwrap the params promise inside the client component
  // Or we can just use params directly if it's available, but Next 16 might require unwrapping
  const params = React.use(props.params);
  
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner size="large" label="Memuat halaman pengeditan..." /></div>}>
      <EditAnalysisPage id={params.id} />
    </Suspense>
  );
}

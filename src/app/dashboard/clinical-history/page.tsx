'use client';

import React, { Suspense } from 'react';
import { ClinicalHistoryMain } from '../../../components/sections/clinical-history-pages/clinical-history-pages';
import { Spinner } from '@fluentui/react-components';

export default function ClinicalHistoryPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner size="large" label="Memuat laman..." /></div>}>
      <ClinicalHistoryMain />
    </Suspense>
  );
}

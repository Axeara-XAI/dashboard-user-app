import React from 'react';
import PatientSummaryPage from '../../../../components/sections/clinical-history-pages/summary-part/PatientSummaryPage';

export const dynamic = 'force-dynamic';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <PatientSummaryPage id={params.id} />;
}

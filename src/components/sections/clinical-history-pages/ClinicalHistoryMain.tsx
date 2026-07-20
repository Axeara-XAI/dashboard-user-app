'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { makeStyles, tokens, Button, Spinner, Text } from '@fluentui/react-components';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AssessmentList,
  PatientDirectory,
} from './clinical-history-pages';

const useStyles = makeStyles({
  pageContainer: {
    padding: '24px 32px 0px 32px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 56px)',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: '16px',
    padding: '60px 0',
  },
});

import { 
  fetcher, 
  PatientContainer, 
  AssessmentRecord, 
  mapToPatientContainer, 
  mapToAssessmentRecord 
} from '@/utils/api-helpers';
// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ClinicalHistoryMain() {
  const styles = useStyles();
  const router = useRouter();

  const [selectedPatient, setSelectedPatient] = useState<PatientContainer | null>(null);

  // SWR untuk Pasien
  const { data: patientsRes, error: patientsSwrError, mutate: mutatePatients, isLoading: isPatientsLoading } = useSWR('/api/get-patients', fetcher);
  
  const patientsError = patientsSwrError ? 'Gagal memuat daftar pasien.' : (patientsRes && !patientsRes.success ? patientsRes.message : null);
  const patients: PatientContainer[] = (patientsRes?.data || []).map(mapToPatientContainer);

  const fetchPatients = useCallback(() => mutatePatients(), [mutatePatients]);

  // State Asesmen (SWR)
  const { 
    data: assessmentsRes, 
    error: assessmentsSwrError, 
    isLoading: isAssessmentsLoading 
  } = useSWR(selectedPatient ? `/api/get-assessments/${selectedPatient.id}` : null, fetcher);

  const assessmentsError = assessmentsSwrError ? 'Gagal memuat riwayat asesmen.' : (assessmentsRes && !assessmentsRes.success ? assessmentsRes.message : null);
  const assessments: AssessmentRecord[] = (assessmentsRes?.data || []).map(mapToAssessmentRecord);

  const searchParams = useSearchParams();
  const patientIdFromQuery = searchParams.get('patientId');

  const handleSelectPatient = useCallback(async (patient: PatientContainer) => {
    setSelectedPatient(patient);
  }, []);

  useEffect(() => {
    if (patientIdFromQuery && patients.length > 0 && !selectedPatient) {
      const patient = patients.find(p => p.id === patientIdFromQuery);
      if (patient) {
        handleSelectPatient(patient);
      }
    }
  }, [patientIdFromQuery, patients, selectedPatient, handleSelectPatient]);



  return (
    <div className={styles.pageContainer}>

      {/* TAMPILAN JIKA BELUM ADA PASIEN YANG DIPILIH */}
      {!selectedPatient && (
        <>
          {isPatientsLoading && (
            <div className={styles.centerContainer}>
              <Spinner size="large" label="Memuat daftar pasien dari database..." />
            </div>
          )}

          {patientsError && !isPatientsLoading && (
            <div className={styles.centerContainer}>
              <Text style={{ color: tokens.colorPaletteRedForeground1 }}>⚠️ {patientsError}</Text>
              <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
            </div>
          )}

          {!isPatientsLoading && !patientsError && (
            <PatientDirectory
              patients={patients}
              onSelectPatient={handleSelectPatient}
              onRefresh={fetchPatients}
            />
          )}
        </>
      )}

      {/* TAMPILAN PROFIL PASIEN */}
      {selectedPatient && (
        <AssessmentList 
          patient={selectedPatient}
          onBack={() => {
            setSelectedPatient(null);
            if (patientIdFromQuery) {
              router.replace('/dashboard/clinical-history');
            }
          }}
          onNewAnalysis={() => router.push(`/dashboard/analysis?patientId=${selectedPatient.id}`)}
          assessments={assessments}
          isLoading={isAssessmentsLoading}
          error={assessmentsError}
        />
      )}

    </div>
  );
}

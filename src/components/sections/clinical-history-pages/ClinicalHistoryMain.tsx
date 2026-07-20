'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { makeStyles, tokens, Button, Spinner, Text } from '@fluentui/react-components';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AssessmentList,
  PatientDirectory,
  PatientContainer,
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

export interface AssessmentRecord {
  id: string;
  date: string;
  probability: number;
  riskLabel: string;
  narrative: string;
}

// ============================================================================
// HELPERS: Mapping data API → tipe yang dibutuhkan UI
// ============================================================================
function mapToPatientContainer(raw: any): PatientContainer {
  const dob = raw.dateOfBirth || '1990-01-01';
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  const formattedDob = new Date(dob).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const lastVisit = raw.createdAt
    ? new Date(raw.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '-';

  return {
    id: String(raw.id),
    name: raw.patientName,
    mrn: raw.medicalRecordNumber,
    dob: `${formattedDob} (${age} Tahun)`,
    lastVisit,
    bloodType: raw.bloodType,
    patientStatus: raw.patientStatus,
    healthInsurance: raw.healthInsurance,
    primaryRiskFactor: raw.primaryRiskFactor,
  };
}

function mapToAssessmentRecord(raw: any): AssessmentRecord {
  const date = raw.createdAt
    ? new Date(raw.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '-';

  return {
    id: String(raw.assessmentId),
    date,
    probability: Math.round((raw.probability ?? 0) * 100),
    riskLabel: raw.riskLabel ?? 'LOW',
    narrative: raw.narrativeExplanation ?? 'Narasi tidak tersedia.',
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
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

  // State Asesmen (Asesmen tidak butuh SWR global karena per pasien)
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([]);
  const [isAssessmentsLoading, setIsAssessmentsLoading] = useState(false);
  const [assessmentsError, setAssessmentsError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const patientIdFromQuery = searchParams.get('patientId');

  const handleSelectPatient = useCallback(async (patient: PatientContainer) => {
    setSelectedPatient(patient);
    setAssessments([]);
    setIsAssessmentsLoading(true);
    setAssessmentsError(null);

    try {
      const res = await fetch(`/api/get-assessments/${patient.id}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setAssessments(json.data.map(mapToAssessmentRecord));
    } catch (err: any) {
      setAssessmentsError(err.message || 'Gagal memuat riwayat asesmen.');
    } finally {
      setIsAssessmentsLoading(false);
    }
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

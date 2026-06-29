'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, tokens, Button, Spinner, Text } from '@fluentui/react-components';
import {
  AssessmentList,
  PatientDirectory,
  PatientContainer,
} from '../../../components/sections/clinical-history-pages/clinical-history-pages';

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

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ClinicalHistoryPage() {
  const styles = useStyles();

  const [selectedPatient, setSelectedPatient] = useState<PatientContainer | null>(null);

  // State Pasien
  const [patients, setPatients] = useState<PatientContainer[]>([]);
  const [isPatientsLoading, setIsPatientsLoading] = useState(true);
  const [patientsError, setPatientsError] = useState<string | null>(null);

  // State Asesmen
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([]);
  const [isAssessmentsLoading, setIsAssessmentsLoading] = useState(false);
  const [assessmentsError, setAssessmentsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      setIsPatientsLoading(true);
      setPatientsError(null);
      try {
        const res = await fetch('/api/get-patients');
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setPatients(json.data.map(mapToPatientContainer));
      } catch (err: any) {
        setPatientsError(err.message || 'Gagal memuat daftar pasien.');
      } finally {
        setIsPatientsLoading(false);
      }
    };
    fetchPatients();
  }, []);

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
            <PatientDirectory patients={patients} onSelectPatient={handleSelectPatient} />
          )}
        </>
      )}

      {/* TAMPILAN PROFIL PASIEN (KOMPONEN BARU KITA) */}
      {selectedPatient && (
        <AssessmentList 
          patient={selectedPatient}
          onBack={() => setSelectedPatient(null)}
          onNewAnalysis={() => alert('Buka form analisis baru!')}
          
          // Melempar data API ke dalam AssessmentList
          assessments={assessments}
          isLoading={isAssessmentsLoading}
          error={assessmentsError}
        />
      )}

    </div>
  );
}
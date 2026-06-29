'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, tokens, Button, Spinner, Text, Title3, Link, Body1 } from '@fluentui/react-components';
import { ArrowLeftRegular, ArrowLeft24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
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
  backButton: {
    marginBottom: '24px',
    alignSelf: 'flex-start',
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
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '16px',
    marginBottom: '16px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`
  },
  breadcrumb: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  breadcrumbLink: {
    color: tokens.colorNeutralForeground2,
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'underline',
    },
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
export default function ClinicalHistoryMain() {
  const styles = useStyles();
  const router = useRouter();

  const [selectedPatient, setSelectedPatient] = useState<PatientContainer | null>(null);

  // State Pasien
  const [patients, setPatients] = useState<PatientContainer[]>([]);
  const [isPatientsLoading, setIsPatientsLoading] = useState(true);
  const [patientsError, setPatientsError] = useState<string | null>(null);

  // State Asesmen
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([]);
  const [isAssessmentsLoading, setIsAssessmentsLoading] = useState(false);
  const [assessmentsError, setAssessmentsError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

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
      <div className={styles.breadcrumb}>
        <Link className={styles.breadcrumbLink} onClick={() => router.push('/dashboard')}>
          Beranda
        </Link>
        <span>&gt;</span>
        <span>Riwayat Klinis</span>
      </div>

      <div className={styles.header}>
        <Button appearance="subtle" icon={<ArrowLeft24Regular />} onClick={() => router.back()} />
        <div>
          <Title3>Riwayat Klinis Pasien</Title3>
          <Body1 style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>Sistem Manajemen Rekam Medis</Body1>
        </div>
      </div>

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

      {/* TAMPILAN PROFIL PASIEN (KOMPONEN BARU KITA) */}
      {selectedPatient && (
        <>
          <Button
            appearance="subtle"
            icon={<ArrowLeftRegular />}
            onClick={() => setSelectedPatient(null)}
            className={styles.backButton}
          >
            Kembali ke Daftar Pasien
          </Button>

          <AssessmentList 
            patient={selectedPatient}
            onBack={() => setSelectedPatient(null)}
            onNewAnalysis={() => router.push('/dashboard/analysis')}
            
            // Melempar data API ke dalam AssessmentList
            assessments={assessments}
            isLoading={isAssessmentsLoading}
            error={assessmentsError}
          />
        </>
      )}

    </div>
  );
}

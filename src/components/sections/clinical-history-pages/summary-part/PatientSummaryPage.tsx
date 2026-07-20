'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles, tokens, Spinner, Text, Divider, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@fluentui/react-components';
import { AlertRegular, HeartPulseRegular, PersonRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  contentScrollable: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  contentInner: {
    width: '100%',
    maxWidth: '1000px', // Wider for table
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '48px', // A4 padding
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: '16px',
    padding: '48px',
  },
  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: `2px solid ${tokens.colorBrandBackground}`,
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  clinicInfo: {
    textAlign: 'right',
    color: tokens.colorNeutralForeground3,
  },
  patientInfoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground1Hover,
    borderRadius: tokens.borderRadiusMedium,
  },
  infoRow: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr',
    alignItems: 'center',
    gap: '8px',
  },
  infoLabel: {
    color: tokens.colorNeutralForeground3,
    fontWeight: '500',
  },
  tableContainer: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflowX: 'auto',
  },
  recommendationRow: {
    backgroundColor: tokens.colorBrandBackground2,
  },
  recommendationContent: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    padding: '12px 16px',
    color: tokens.colorBrandForeground1,
  },
  noData: {
    textAlign: 'center',
    padding: '32px',
    color: tokens.colorNeutralForeground3,
  }
});

interface SummaryData {
  patient: any;
  assessments: any[];
}

export default function PatientSummaryPage({ id }: { id: string }) {
  const styles = useStyles();
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch patient details
        const patientRes = await fetch(`/api/get-patient-detail/${id}`);
        const patientJson = await patientRes.json();
        if (!patientJson.success || !patientJson.data.patient) {
          throw new Error('Gagal memuat data pasien');
        }

        // Fetch assessments
        const assessmentsRes = await fetch(`/api/get-assessments/${id}`);
        const assessmentsJson = await assessmentsRes.json();
        if (!assessmentsJson.success) {
          throw new Error('Gagal memuat riwayat medis');
        }

        setData({
          patient: patientJson.data.patient,
          assessments: assessmentsJson.data
        });
        
        // Wait a bit for render then print
        setTimeout(() => {
          window.print();
        }, 800);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="huge" />
        <Text>Menyiapkan Ringkasan Medis...</Text>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.loadingContainer}>
        <AlertRegular fontSize={48} color="red" />
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </div>
    );
  }

  const { patient, assessments } = data;
  const birthDate = new Date(patient.date_of_birth);
  const age = Math.floor((new Date().getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentScrollable}>
        <div className={styles.contentInner}>
          
          {/* HEADER KOP SURAT */}
          <div className={styles.headerBox}>
            <div className={styles.titleGroup}>
              <Text size={700} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                RINGKASAN MEDIS PASIEN
              </Text>
              <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                Sistem Deteksi Dini Fetal Growth Restriction (FGR)
              </Text>
            </div>
            <div className={styles.clinicInfo}>
              <Text size={300} weight="bold" block>Klinik Utama Axara</Text>
              <Text size={200} block>Jl. Kesehatan No. 123, Jakarta</Text>
              <Text size={200} block>Telp: (021) 555-0198</Text>
            </div>
          </div>

          {/* BIODATA PASIEN */}
          <div className={styles.patientInfoGrid}>
            <div className={styles.infoRow}>
              <Text className={styles.infoLabel}>Nama Pasien</Text>
              <Text weight="bold">: {patient.patient_name}</Text>
            </div>
            <div className={styles.infoRow}>
              <Text className={styles.infoLabel}>No. Rekam Medis</Text>
              <Text weight="bold">: {patient.medical_record_number}</Text>
            </div>
            <div className={styles.infoRow}>
              <Text className={styles.infoLabel}>Tanggal Lahir</Text>
              <Text>: {birthDate.toLocaleDateString('id-ID')} ({age} Tahun)</Text>
            </div>
            <div className={styles.infoRow}>
              <Text className={styles.infoLabel}>Golongan Darah</Text>
              <Text>: {patient.blood_type || '-'}</Text>
            </div>
            <div className={styles.infoRow}>
              <Text className={styles.infoLabel}>Jaminan Kesehatan</Text>
              <Text>: {patient.health_insurance || '-'}</Text>
            </div>
            <div className={styles.infoRow}>
              <Text className={styles.infoLabel}>Tanggal Cetak</Text>
              <Text>: {new Date().toLocaleDateString('id-ID')}</Text>
            </div>
          </div>

          {/* TABEL RIWAYAT KLINIS */}
          <Text size={500} weight="semibold" block style={{ marginBottom: '16px' }}>
            Riwayat Analisis Kunjungan
          </Text>

          {assessments.length === 0 ? (
            <div className={styles.noData}>
              <Text>Belum ada riwayat kunjungan/analisis untuk pasien ini.</Text>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <Table aria-label="Riwayat Medis Pasien">
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell style={{ width: '60px' }}>No</TableHeaderCell>
                    <TableHeaderCell>Tanggal Periksa</TableHeaderCell>
                    <TableHeaderCell>Probabilitas</TableHeaderCell>
                    <TableHeaderCell>Prediksi Risiko FGR</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.map((a: any, index: number) => {
                    const isFGR = a.riskLabel === 'FGR';
                    return (
                      <React.Fragment key={a.assessmentId}>
                        {/* Baris 1: Data Utama */}
                        <TableRow>
                          <TableCell>{assessments.length - index}</TableCell>
                          <TableCell>{new Date(a.createdAt).toLocaleDateString('id-ID')}</TableCell>
                          <TableCell>{(a.probability * 100).toFixed(0)}%</TableCell>
                          <TableCell>
                            <Badge 
                              appearance={isFGR ? 'filled' : 'outline'}
                              color={isFGR ? 'danger' : 'success'}
                            >
                              {a.riskLabel}
                            </Badge>
                          </TableCell>
                        </TableRow>

                        {/* Baris 2: Rekomendasi AI */}
                        {a.narrativeRecommendation && (
                          <TableRow className={styles.recommendationRow}>
                            <TableCell colSpan={4} style={{ padding: 0 }}>
                              <div className={styles.recommendationContent}>
                                <HeartPulseRegular fontSize={24} />
                                <div>
                                  <Text size={200} weight="bold" block>Saran Klinis AI:</Text>
                                  <Text size={200}>{a.narrativeRecommendation}</Text>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

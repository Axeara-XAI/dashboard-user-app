'use client';

import React from 'react';
import { 
  makeStyles, tokens, Button, Text, Table, TableHeader, TableRow, 
  TableHeaderCell, TableBody, TableCell, Badge 
} from '@fluentui/react-components';
import { AddRegular, DocumentRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  wrapperSolid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    marginTop: '8px'
  },
  actionRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  tableContainer: { 
    overflowX: 'auto', 
    border: `1px solid ${tokens.colorNeutralStroke2}`, 
    borderRadius: '8px',
    backgroundColor: tokens.colorNeutralBackground1
  },
});

// Data Dummy Dinamis
const MOCK_DATABASE_ASSESSMENTS: Record<string, { id: string; date: string; weeks: string; risk: 'LOW' | 'HIGH'; hb: string }[]> = {
  '1': [
    { id: 'A01', date: '12 Jan 2026', weeks: '12', risk: 'LOW', hb: '12.1' },
    { id: 'A02', date: '16 Mar 2026', weeks: '20', risk: 'LOW', hb: '11.8' },
    { id: 'A03', date: '18 Mei 2026', weeks: '28', risk: 'HIGH', hb: '10.2' },
  ],
  '2': [
    { id: 'B01', date: '05 Feb 2026', weeks: '16', risk: 'LOW', hb: '12.4' },
    { id: 'B02', date: '08 Apr 2026', weeks: '24', risk: 'LOW', hb: '12.2' },
  ],
  '3': [
    { id: 'C01', date: '20 Mei 2026', weeks: '32', risk: 'HIGH', hb: '9.5' },
  ]
};

interface AssessmentTableProps {
  patientId: string; 
  onNewAnalysis: () => void;
}

export default function AssessmentTable({ patientId, onNewAnalysis }: AssessmentTableProps) {
  const styles = useStyles();

  // Ambil data sesuai ID, jika tidak ada, default ke data ID '1' agar demo selalu jalan
  const assessments = MOCK_DATABASE_ASSESSMENTS[patientId] || MOCK_DATABASE_ASSESSMENTS['1'];

  return (
    <div className={styles.wrapperSolid}>
      
      <div className={styles.actionRow}>
        <Text size={500} weight="semibold">Riwayat Analisis & Pemeriksaan</Text>
        <Button appearance="primary" icon={<AddRegular />} onClick={onNewAnalysis}>
          Buat Analisis Baru
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <Table aria-label="Riwayat Penilaian">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Tanggal Periksa</TableHeaderCell>
              <TableHeaderCell>Usia Kehamilan</TableHeaderCell>
              <TableHeaderCell>Hemoglobin</TableHeaderCell>
              <TableHeaderCell>Prediksi Risiko FGR</TableHeaderCell>
              <TableHeaderCell>Aksi</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>{assessment.date}</TableCell>
                <TableCell>{assessment.weeks} Minggu</TableCell>
                <TableCell>{assessment.hb} g/dL</TableCell>
                <TableCell>
                  <Badge 
                    color={assessment.risk === 'LOW' ? 'success' : 'danger'} 
                    appearance="filled"
                  >
                    {assessment.risk} RISK
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" icon={<DocumentRegular />}>Lihat Laporan</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
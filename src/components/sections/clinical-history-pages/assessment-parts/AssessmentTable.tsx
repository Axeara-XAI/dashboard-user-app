'use client';

import React from 'react';
import { 
  makeStyles, tokens, Button, Text, Table, TableHeader, TableRow, 
  TableHeaderCell, TableBody, TableCell, Badge, Spinner 
} from '@fluentui/react-components';
import { AddRegular, DocumentRegular } from '@fluentui/react-icons';
import { AssessmentRecord } from '../../../../app/dashboard/clinical-history/page';

const useStyles = makeStyles({
  wrapperSolid: { display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', marginTop: '8px' },
  actionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tableContainer: { 
    overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, 
    borderRadius: '8px', backgroundColor: tokens.colorNeutralBackground1
  },
  centerBox: { padding: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }
});

interface AssessmentTableProps {
  assessments: AssessmentRecord[];
  isLoading: boolean;
  error: string | null;
  onNewAnalysis: () => void;
}

export default function AssessmentTable({ assessments, isLoading, error, onNewAnalysis }: AssessmentTableProps) {
  const styles = useStyles();

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
              <TableHeaderCell>Probabilitas</TableHeaderCell>
              <TableHeaderCell>Prediksi Risiko FGR</TableHeaderCell>
              <TableHeaderCell>Aksi</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className={styles.centerBox}><Spinner size="tiny" label="Memuat data..." /></div>
                </TableCell>
              </TableRow>
            )}

            {error && !isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className={styles.centerBox}><Text color="danger">⚠️ {error}</Text></div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !error && assessments.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className={styles.centerBox}><Text color="neutral">Belum ada riwayat analisis untuk pasien ini.</Text></div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !error && assessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>{assessment.date}</TableCell>
                <TableCell>{assessment.probability}%</TableCell>
                <TableCell>
                  <Badge 
                    color={assessment.riskLabel === 'LOW' ? 'success' : 'danger'} 
                    appearance="filled"
                  >
                    {assessment.riskLabel}
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
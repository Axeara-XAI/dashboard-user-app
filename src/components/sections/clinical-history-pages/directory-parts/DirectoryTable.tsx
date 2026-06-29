'use client';

import React from 'react';
import { 
  makeStyles, tokens, Table, TableHeader, TableRow, 
  TableHeaderCell, TableBody, TableCell, Avatar, Text, Button 
} from '@fluentui/react-components';
import { PersonRegular, ArrowRightRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  tableContainer: {
    overflowX: 'auto',
    marginTop: '4px',
  },
  patientNameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  interactiveRow: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    }
  },
  statusBadge: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
});

// PASTIKAN BARIS INI ADA KATA "export" AGAR BISA DIBACA FILE LAIN
export interface PatientContainer {
  id: string;
  name: string;
  mrn: string;
  dob: string;
  lastVisit: string;
}

interface DirectoryTableProps {
  patients: PatientContainer[];
  onSelectPatient: (patient: PatientContainer) => void;
}

export default function DirectoryTable({ patients, onSelectPatient }: DirectoryTableProps) {
  const styles = useStyles();

  return (
    <div className={styles.tableContainer}>
      <Table aria-label="Daftar Pasien" style={{ minWidth: '800px' }}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Nama Pasien</TableHeaderCell>
            <TableHeaderCell>No. Rekam Medis</TableHeaderCell>
            <TableHeaderCell>Tanggal Lahir</TableHeaderCell>
            <TableHeaderCell>Kunjungan Terakhir</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Aksi</TableHeaderCell>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {patients.map((patient) => (
            <TableRow 
              key={patient.id} 
              className={styles.interactiveRow}
              onClick={() => onSelectPatient(patient)}
            >
              <TableCell>
                <div className={styles.patientNameCell}>
                  <Avatar color="brand" icon={<PersonRegular />} name={patient.name} size={32} />
                  <Text weight="semibold">{patient.name}</Text>
                </div>
              </TableCell>
              <TableCell>{patient.mrn}</TableCell>
              <TableCell>{patient.dob.split('(')[0].trim()}</TableCell>
              <TableCell>{patient.lastVisit}</TableCell>
              <TableCell>
                <span className={styles.statusBadge}>Aktif</span>
              </TableCell>
              <TableCell>
                <Button 
                  appearance="subtle" 
                  icon={<ArrowRightRegular />} 
                  iconPosition="after"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPatient(patient);
                  }}
                >
                  Buka
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
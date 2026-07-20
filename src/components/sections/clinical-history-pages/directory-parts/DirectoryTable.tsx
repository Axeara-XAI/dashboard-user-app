'use client';

import React, { useState } from 'react';
import { 
  makeStyles, tokens, Table, TableHeader, TableRow, 
  TableHeaderCell, TableBody, TableCell, Avatar, Text, Button 
} from '@fluentui/react-components';
import { PersonRegular, ArrowRightRegular, EditRegular, DeleteRegular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
import AlertModal from '../../../ui/AlertModal';

const useStyles = makeStyles({
  tableContainer: {
    marginTop: '4px',
    overflowX: 'auto',
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
});

export interface PatientContainer {
  id: string;
  name: string;
  mrn: string;
  dob: string;
  lastVisit: string;
  bloodType?: string;
  patientStatus?: string;
  healthInsurance?: string;
  primaryRiskFactor?: string;
}

interface DirectoryTableProps {
  patients: PatientContainer[];
  onSelectPatient: (patient: PatientContainer) => void;
  onRefresh?: () => void;
}

export default function DirectoryTable({ patients, onSelectPatient, onRefresh }: DirectoryTableProps) {
  const styles = useStyles();
  const router = useRouter();

  const [patientToDelete, setPatientToDelete] = useState<PatientContainer | null>(null);

  const handleConfirmDelete = async () => {
    if (!patientToDelete) return;
    try {
      const res = await fetch(`/api/delete-patient/${patientToDelete.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        if (onRefresh) onRefresh();
      } else {
        alert('Gagal menghapus: ' + json.message);
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus data.');
    } finally {
      setPatientToDelete(null);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <Table aria-label="Daftar Pasien" style={{ width: '100%' }}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Nama Pasien</TableHeaderCell>
            <TableHeaderCell>No. Rekam Medis</TableHeaderCell>
            <TableHeaderCell>Kunjungan Terakhir</TableHeaderCell>
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
              <TableCell>{patient.lastVisit}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button 
                    appearance="subtle" 
                    icon={<EditRegular />} 
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/clinical-history/edit/${patient.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    appearance="subtle" 
                    style={{ color: tokens.colorPaletteRedForeground1 }}
                    icon={<DeleteRegular />} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPatientToDelete(patient);
                    }}
                  >
                    Hapus
                  </Button>
                  <Button 
                    appearance="subtle" 
                    icon={<ArrowRightRegular />} 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPatient(patient);
                    }}
                  >
                    Buka
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {patients.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: 'center', padding: '24px' }}>
                <Text>Tidak ada pasien yang ditemukan.</Text>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AlertModal
        isOpen={!!patientToDelete}
        title="Konfirmasi Hapus Data"
        content={`Apakah Anda yakin ingin menghapus data pasien ${patientToDelete?.name}? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPatientToDelete(null)}
      />
    </div>
  );
}
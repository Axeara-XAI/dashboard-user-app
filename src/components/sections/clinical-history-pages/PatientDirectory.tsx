'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  makeStyles, 
  tokens, 
  Table, 
  TableHeader, 
  TableRow, 
  TableHeaderCell, 
  TableBody, 
  TableCell,
  Avatar, 
  Text, 
  Button, 
  Input,
  Link
} from '@fluentui/react-components';
import { 
  SearchRegular, 
  PersonRegular, 
  ArrowRightRegular,
  AddRegular,
  DeleteRegular,
  ArrowClockwiseRegular,
  DocumentArrowDownRegular,
  BookQuestionMarkRegular,
  ChevronLeftRegular,
  ChevronRightRegular,
  HeartPulseRegular,
  EditRegular
} from '@fluentui/react-icons';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: 1, 
  },
  commandBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '16px',
    paddingBottom: '8px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexWrap: 'wrap',
  },
  blueIcon: {
    color: tokens.colorBrandForeground1,
  },
  divider: {
    width: '1px',
    height: '16px',
    backgroundColor: tokens.colorNeutralStroke2,
    margin: '0 8px',
  },
  filterArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0 8px 0',
    flexWrap: 'wrap',
  },
  filterInput: {
    minWidth: '300px',
  },
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
    fontSize: '14px',
    fontWeight: '500',
  },
  footerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto', 
    padding: '16px 0px 16px 0px', 
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`, 
    flexWrap: 'wrap',
    gap: '16px',
  },
  footerRightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  quickActionsFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  paginationGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }
});

export interface PatientContainer {
  id: string;
  name: string;
  mrn: string;
  dob: string;
  lastVisit: string;
}

interface PatientDirectoryProps {
  patients: PatientContainer[];
  onSelectPatient: (patient: PatientContainer) => void;
  onRefresh?: () => void;
}

export default function PatientDirectory({ patients, onSelectPatient, onRefresh }: PatientDirectoryProps) {
  const styles = useStyles();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Logika Hapus (Mock untuk demo)
  const handleDelete = () => {
    alert('Fitur hapus pasien memerlukan otorisasi tingkat lanjut. Hubungi Administrator sistem Anda.');
  };

  // 2. Logika Export CSV
  const handleExportCSV = () => {
    if (patients.length === 0) return;
    const headers = ['Nama Pasien', 'No. Rekam Medis', 'Kunjungan Terakhir'];
    const rows = patients.map(p => `"${p.name}","${p.mrn}","${p.lastVisit}"`);
    const csvContent = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Data_Pasien_AXARA.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. Logika Filter Search
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.mrn.includes(searchQuery)
  );

  return (
    <div className={styles.container}>
      
      {/* 1. COMMAND BAR */}
      <div className={styles.commandBar}>
        <Button 
          appearance="transparent" 
          icon={<AddRegular className={styles.blueIcon} />}
          onClick={() => router.push('/dashboard/analysis')}
        >
          Buat Baru
        </Button>
        <div className={styles.divider} />
        <Button 
          appearance="transparent" 
          icon={<ArrowClockwiseRegular className={styles.blueIcon} />}
          onClick={onRefresh}
        >
          Refresh
        </Button>
        <Button 
          appearance="transparent" 
          icon={<DocumentArrowDownRegular className={styles.blueIcon} />}
          onClick={handleExportCSV}
        >
          Ekspor ke CSV
        </Button>
      </div>

      {/* 2. FILTER BAR */}
      <div className={styles.filterArea}>
        <Input 
          className={styles.filterInput}
          placeholder="Cari berdasarkan nama pasien atau No. RM..." 
          contentBefore={<SearchRegular />} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 3. DATA GRID / TABLE */}
      <div className={styles.tableContainer}>
        <Table aria-label="Daftar Pasien" style={{ minWidth: '700px' }}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nama Pasien</TableHeaderCell>
              <TableHeaderCell>No. Rekam Medis</TableHeaderCell>
              <TableHeaderCell>Kunjungan Terakhir</TableHeaderCell>
              <TableHeaderCell>Aksi</TableHeaderCell>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {filteredPatients.map((patient) => (
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
                        router.push(`/dashboard/analysis?editId=${patient.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      appearance="subtle" 
                      style={{ color: tokens.colorPaletteRedForeground1 }}
                      icon={<DeleteRegular />} 
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (confirm(`Apakah Anda yakin ingin menghapus data pasien ${patient.name}?`)) {
                          try {
                            const res = await fetch(`/api/delete-patient/${patient.id}`, { method: 'DELETE' });
                            const json = await res.json();
                            if (json.success) {
                              if (onRefresh) onRefresh();
                            } else {
                              alert('Gagal menghapus: ' + json.message);
                            }
                          } catch (err) {
                            alert('Terjadi kesalahan saat menghapus data.');
                          }
                        }
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
            
            {filteredPatients.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center', padding: '24px' }}>
                  <Text>Tidak ada pasien yang ditemukan.</Text>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* 4. FOOTER */}
      <div className={styles.footerSection}>
        <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
          Menampilkan 1 - {filteredPatients.length} dari {filteredPatients.length} data.
        </Text>

        <div className={styles.footerRightGroup}>
          <div className={styles.quickActionsFooter}>
            <Button appearance="transparent" size="small" icon={<BookQuestionMarkRegular />}>
              Panduan Manajemen
            </Button>
            <Button appearance="transparent" size="small" icon={<HeartPulseRegular />}>
              Diagnosis Performa Sistem
            </Button>
          </div>

          {filteredPatients.length > 20 && <div className={styles.divider} />}

          {filteredPatients.length > 20 && (
            <div className={styles.paginationGroup}>
              <Button appearance="subtle" size="small" icon={<ChevronLeftRegular />} disabled>
                Sebel.
              </Button>
              <Text size={300} weight="semibold" style={{ padding: '0 8px' }}>1</Text>
              <Button appearance="subtle" size="small" icon={<ChevronRightRegular />} iconPosition="after">
                Selanj.
              </Button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

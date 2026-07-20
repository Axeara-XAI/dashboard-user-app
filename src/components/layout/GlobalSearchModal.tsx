'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Input,
  makeStyles,
  tokens,
  Text,
  Spinner,
} from '@fluentui/react-components';
import { Search24Regular, Document20Regular, Person20Regular, Navigation20Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/utils/api-helpers';

const useStyles = makeStyles({
  popoverSurface: {
    padding: '0',
    width: '480px',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
  },
  searchInputWrapper: {
    width: '100%',
    maxWidth: '480px',
  },
  searchInput: {
    width: '100%',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  resultsContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '8px',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground3,
    padding: '8px 12px',
    textTransform: 'uppercase',
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  resultIcon: {
    color: tokens.colorBrandForeground1,
  },
  resultTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  resultTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: tokens.colorNeutralForeground1,
  },
  resultSubtitle: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground2,
  },
  emptyState: {
    padding: '32px',
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '32px',
  }
});

interface GlobalSearchModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}



const NAV_LINKS = [
  { id: 'nav-dashboard', title: 'Dashboard', url: '/dashboard' },
  { id: 'nav-analysis', title: 'Analisis Baru', url: '/dashboard/analysis' },
  { id: 'nav-clinical-history', title: 'Riwayat Klinis & Pasien', url: '/dashboard/clinical-history' },
  { id: 'nav-analysis-history', title: 'Riwayat Analisis', url: '/dashboard/analysis-history' },
  { id: 'nav-statistics', title: 'Statistik Data', url: '/dashboard/statistisc' },
  { id: 'nav-settings', title: 'Pengaturan Akun', url: '/dashboard/settings' },
  { id: 'nav-support', title: 'Bantuan & Dukungan', url: '/dashboard/support-ticket' },
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onOpenChange }) => {
  const styles = useStyles();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch real data
  const { data: patientsRes, isLoading: patientsLoading } = useSWR(isOpen ? '/api/get-patients' : null, fetcher);
  const { data: assessmentsRes, isLoading: assessmentsLoading } = useSWR(isOpen ? '/api/get-all-assessments' : null, fetcher);

  const isLoading = patientsLoading || assessmentsLoading;

  const patients = patientsRes?.data || [];
  const assessments = assessmentsRes?.data || [];

  const lowerQuery = query.toLowerCase();

  const filteredNav = NAV_LINKS.filter(nav => nav.title.toLowerCase().includes(lowerQuery));
  
  const filteredPatients = patients.filter((p: any) => 
    p.patientName.toLowerCase().includes(lowerQuery) || 
    p.medicalRecordNumber.toLowerCase().includes(lowerQuery)
  );

  const filteredAssessments = assessments.filter((a: any) => 
    a.patientName?.toLowerCase().includes(lowerQuery) || 
    a.riskLabel?.toLowerCase().includes(lowerQuery)
  );

  const hasResults = filteredNav.length > 0 || filteredPatients.length > 0 || filteredAssessments.length > 0;

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    router.push(url);
  };

  return (
    <Popover 
      open={isOpen} 
      onOpenChange={(e, data) => onOpenChange(data.open)} 
      positioning="below-start"
      withArrow={false}
      trapFocus={false}
    >
      <PopoverTrigger disableButtonEnhancement>
        <div className={styles.searchInputWrapper}>
          <Input 
            ref={inputRef}
            className={styles.searchInput}
            placeholder="Cari sumber daya (Ctrl+K)..."
            contentBefore={<Search24Regular />}
            value={query}
            onChange={(e, data) => {
              setQuery(data.value);
              if (!isOpen && data.value) onOpenChange(true);
            }}
            appearance="outline"
            onClick={() => onOpenChange(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverSurface className={styles.popoverSurface}>
          <div className={styles.resultsContainer}>
            {isLoading && (
              <div className={styles.loadingContainer}>
                <Spinner size="medium" label="Mengambil data dari server..." />
              </div>
            )}

            {!isLoading && !hasResults && query && (
              <div className={styles.emptyState}>
                <Text>Tidak ada hasil yang ditemukan untuk "{query}".</Text>
              </div>
            )}

            {!isLoading && hasResults && (
              <>
                {/* NAVIGATION RESULTS */}
                {filteredNav.length > 0 && (
                  <div>
                    <div className={styles.sectionTitle}>Halaman & Menu</div>
                    {filteredNav.map((nav, i) => (
                      <div key={nav.id || i} className={styles.resultItem} onClick={() => handleSelect(nav.url)}>
                        <Navigation20Regular className={styles.resultIcon} />
                        <div className={styles.resultTextContainer}>
                          <Text className={styles.resultTitle}>{nav.title}</Text>
                          <Text className={styles.resultSubtitle}>Navigasi</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* PATIENTS RESULTS */}
                {filteredPatients.length > 0 && (
                  <div>
                    <div className={styles.sectionTitle}>Data Pasien</div>
                    {filteredPatients.map((p: any, i: number) => (
                      <div key={p.id || `patient-${i}`} className={styles.resultItem} onClick={() => handleSelect(`/dashboard/clinical-history?patientId=${p.id}`)}>
                        <Person20Regular className={styles.resultIcon} />
                        <div className={styles.resultTextContainer}>
                          <Text className={styles.resultTitle}>{p.patientName}</Text>
                          <Text className={styles.resultSubtitle}>RM: {p.medicalRecordNumber}</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ASSESSMENTS RESULTS */}
                {filteredAssessments.length > 0 && (
                  <div>
                    <div className={styles.sectionTitle}>Riwayat Analisis</div>
                    {filteredAssessments.map((a: any, i: number) => (
                      <div key={a.assessmentId || a.id || `assessment-${i}`} className={styles.resultItem} onClick={() => handleSelect(`/dashboard/analysis-history`)}>
                        <Document20Regular className={styles.resultIcon} />
                        <div className={styles.resultTextContainer}>
                          <Text className={styles.resultTitle}>Analisis Risiko {a.riskLabel} - {a.patientName}</Text>
                          <Text className={styles.resultSubtitle}>
                            {new Date(a.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

      </PopoverSurface>
    </Popover>
  );
};

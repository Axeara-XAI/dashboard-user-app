'use client';

import React, { useState } from 'react';
import {
  makeStyles,
  tokens,
  Link,
  Text,
} from '@fluentui/react-components';

// Impor 4 komponen step
import IdentitasOrangTua from './steps/IdentitasOrangTua';
import RiwayatKesehatanIbu from './steps/RiwayatKesehatanIbu';
import DataKehamilan from './steps/DataKehamilan';
import HasilAnalisis from './steps/HasilAnalisis'; 

// Impor Footer dan AlertModal 
import AnalysisFooter from './AnalysisFooter'; 
import AlertModal from '../../ui/AlertModal';

// Impor Interface Data
import { AnalysisFormData } from '../../../type/analysis';

// ============================================================================
// INTERFACE PROPS
// ============================================================================
interface AnalysisBodyProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  bodyContainer: {
    padding: '0 24px 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    flex: 1,
    overflowY: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
    '@media (max-width: 768px)': {
      padding: '0 16px 16px 16px',
    }
  },
  stepperContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    paddingBottom: '16px',
    overflowX: 'auto',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: tokens.colorNeutralForeground3,
    fontWeight: '400',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  stepItemActive: {
    color: tokens.colorNeutralForeground1,
    fontWeight: '600',
  },
  stepCircle: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    transition: 'all 0.2s ease',
  },
  stepCircleActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    border: 'none',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '900px',
    lineHeight: '1.5',
  },
});

// ============================================================================
// DATA STEPPER
// ============================================================================
const STEP_LIST = [
  'Identitas Orang Tua',
  'Riwayat Kesehatan Ibu',
  'Data Kehamilan',
  'Hasil Analisis', 
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AnalysisBody({ currentStep, setCurrentStep }: AnalysisBodyProps) {
  const styles = useStyles();

  const [formData, setFormData] = useState<AnalysisFormData>({
    // Langkah 1: Identitas Orang Tua
    nama_ibu: '', 
    mage: '', 
    meduc_cat: '',
    meduc_raw: 1, 
    racemom: '', 
    hispmom: '', 
    marital: '', 
    nama_ayah: '', 
    fage: '', 
    feduc_cat: '',
    feduc_raw: 1, 
    racedad: '', 
    hispdad: '',
    
    // Langkah 2: Riwayat Kesehatan Ibu
    anemia: false, 
    jantung: false, 
    paru: false, 
    diabetes: false, 
    hipertensi_kronis: false,
    hipertensi_gestasional: false, 
    eklamsia: false, 
    ginjal: false, 
    herpes: false, 
    hydram: false, 
    rhsen: false, // PERBAIKAN: rhsen sekarang didaftarkan di sini
    hemoglob: '0', 
    cervix: false, 
    uterine: false,
    totalp: '0', 
    bdead: '0', 
    preterm: '0', 
    pinfant: '0',
    
    // Langkah 3: Data Kehamilan Saat Ini
    weeks: '0', 
    gained: '0', 
    visits: '0', 
    cignum: '0', 
    drinknum: '0',
    
    // Langkah 4: Outcome Kehamilan
    bweight: '0', 
    loutcome: '', // Wajib diisi
    sex: ''       // Wajib diisi
  });

  // State untuk menangani Data AI dan Proses Penyimpanan
  const [apiData, setApiData] = useState<any>(null); 
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{type: 'success' | 'error' | 'info' | 'warning', message: string}>({ 
    type: 'success', 
    message: '' 
  });

  // Fungsi untuk mengupdate field form secara dinamis
  const updateFields = (fields: Partial<AnalysisFormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  // ==========================================================================
  // VALIDASI SEBELUM PINDAH LANGKAH
  // ==========================================================================
  const handleStepNavigation = (value: number | ((prev: number) => number)) => {
    const targetStep = typeof value === 'function' ? value(currentStep) : value;

    // HANYA LAKUKAN VALIDASI JIKA USER MENCOBA MAJU KE LANGKAH BERIKUTNYA
    if (targetStep > currentStep) {
      
      // Validasi Langkah 1 (Identitas Orang Tua)
      if (currentStep === 1) {
        const { 
          nama_ibu, mage, meduc_cat, racemom, hispmom, marital, 
          nama_ayah, fage, feduc_cat, racedad, hispdad 
        } = formData;

        if (!nama_ibu || mage === '' || !meduc_cat || !racemom || !hispmom || !marital || 
            !nama_ayah || fage === '' || !feduc_cat || !racedad || !hispdad) {
          setAlertConfig({ 
            type: 'warning', 
            message: 'Harap lengkapi seluruh bidang wajib (*) pada Identitas Orang Tua sebelum melanjutkan.' 
          });
          setIsAlertOpen(true);
          return; 
        }

        if (Number(mage) < 0 || Number(fage) < 0) {
          setAlertConfig({ 
            type: 'warning', 
            message: 'Usia Ibu (MAGE) dan Usia Ayah (FAGE) tidak boleh bernilai negatif.' 
          });
          setIsAlertOpen(true);
          return; 
        }
      }

      // Validasi Langkah 2 (Riwayat Kesehatan Ibu) — wajib isi LOUTCOME
      if (currentStep === 2) {
        if (!formData.loutcome) {
          setAlertConfig({ 
            type: 'warning', 
            message: 'Harap pilih Outcome Persalinan Sebelumnya (LOUTCOME) sebelum melanjutkan.' 
          });
          setIsAlertOpen(true);
          return; 
        }
      }
    }

    // Jika validasi lolos (atau mundur langkah), izinkan pindah
    setCurrentStep(targetStep);
  };

  // Fungsi Utama untuk Menyimpan Data ke DB
  const handleSaveData = async () => {
    if (!apiData) {
      setAlertConfig({ type: 'warning', message: 'Data analisis belum selesai dimuat. Silakan tunggu sebentar.' });
      setIsAlertOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/save-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, apiData }) 
      });
      
      const result = await response.json();
      if (result.success) {
        setAlertConfig({ type: 'success', message: 'Data rekam medis dan analisis AI berhasil disimpan permanen ke database!' });
        setIsAlertOpen(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      setAlertConfig({ type: 'error', message: `Gagal menyimpan data: ${error.message}` });
      setIsAlertOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.bodyContainer}>
      
      {/* --- STEPPER SECTION --- */}
      <div className={styles.stepperContainer}>
        {STEP_LIST.map((stepName, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;

          return (
            <div 
              key={stepNumber} 
              className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ''}`}
              onClick={() => handleStepNavigation(stepNumber)}
            >
              <div className={`${styles.stepCircle} ${isActive ? styles.stepCircleActive : ''}`}>
                {stepNumber}
              </div>
              <span>{stepName}</span>
            </div>
          );
        })}
      </div>

      {/* --- INFO TEXT SECTION --- */}
      <div className={styles.infoSection}>
        <Text>
          Formulir ini digunakan untuk mengumpulkan data komprehensif pasien guna analisis laporan medis. 
          Pastikan setiap detail yang dimasukkan akurat sesuai dengan kode variabel (MAGE, MEDUC, dll) 
          untuk keperluan dataset medis.
        </Text>
        <Link>Pelajari prosedur pengisian data</Link>
      </div>

      {/* --- DYNAMIC FORM RENDERING DENGAN PROPS --- */}
      {currentStep === 1 && <IdentitasOrangTua data={formData} updateFields={updateFields} />}
      {currentStep === 2 && <RiwayatKesehatanIbu data={formData} updateFields={updateFields} />}
      {currentStep === 3 && <DataKehamilan data={formData} updateFields={updateFields} />}
      {currentStep === 4 && <HasilAnalisis formData={formData} onApiDataLoaded={setApiData} />}

      {/* --- FOOTER DI RENDER DI SINI --- */}
      <AnalysisFooter 
        currentStep={currentStep} 
        setCurrentStep={handleStepNavigation} 
        onSave={handleSaveData} 
        isSaving={isSaving} 
      />

      {/* --- ALERT MODAL --- */}
      {isAlertOpen && (
        <AlertModal 
          isOpen={isAlertOpen} 
          onClose={() => setIsAlertOpen(false)} 
          type={alertConfig.type} 
          message={alertConfig.message} 
        />
      )}

    </div>
  );
}
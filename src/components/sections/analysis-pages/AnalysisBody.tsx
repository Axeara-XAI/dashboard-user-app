'use client';

import React from 'react';
import {
  makeStyles,
  tokens,
  Link,
  Text,
} from '@fluentui/react-components';

import IdentitasOrangTua from './steps/IdentitasOrangTua';
import RiwayatKesehatanIbu from './steps/RiwayatKesehatanIbu';
import DataKehamilan from './steps/DataKehamilan';
import BiometrikJanin from './steps/BiometrikJanin';
import DopplerUsg from './steps/DopplerUsg';

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

const STEP_LIST = [
  'Identitas Orang Tua',
  'Riwayat Kesehatan Ibu',
  'Data Kehamilan',
  'Biometrik Janin',
  'Doppler USG',
  'Hasil Analisis',
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AnalysisBody({ currentStep, setCurrentStep }: AnalysisBodyProps) {
  const styles = useStyles();

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
              onClick={() => setCurrentStep(stepNumber)}
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
          Pastikan setiap detail yang dimasukkan akurat untuk menunjang akurasi hasil diagnosa dan 
          pemantauan kondisi kesehatan ibu maupun janin secara berkelanjutan.
        </Text>
        <Link>Pelajari prosedur pengisian data</Link>
      </div>

      {/* --- DYNAMIC FORM RENDERING --- */}
      {currentStep === 1 && <IdentitasOrangTua />}
      {currentStep === 2 && <RiwayatKesehatanIbu />}
      {currentStep === 3 && <DataKehamilan />}
      {currentStep === 4 && <BiometrikJanin />}
      {currentStep === 5 && <DopplerUsg />}
      
      {currentStep === 6 && <Text>Hasil Analisis (Segera hadir...)</Text>}

    </div>
  );
}
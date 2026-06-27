'use client';

import React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { PersonFeedback20Regular } from '@fluentui/react-icons';

// ============================================================================
// INTERFACE PROPS
// ============================================================================
interface AnalysisFooterProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onSave?: () => void;       // Prop baru: Fungsi untuk mengeksekusi simpan data
  isSaving?: boolean;        // Prop baru: Status untuk mendisable tombol saat loading
}

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  feedbackLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: tokens.colorBrandForeground1,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '400',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AnalysisFooter({ 
  currentStep, 
  setCurrentStep, 
  onSave,       // Ekstrak prop
  isSaving      // Ekstrak prop
}: AnalysisFooterProps) {
  const styles = useStyles();

  // Logika navigasi antar langkah (Maksimal 5 langkah)
  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Logika saat tombol submit/simpan diklik pada halaman terakhir
  const handleSubmit = () => {
    if (onSave) {
      onSave(); // Panggil fungsi simpan yang dilempar dari parent
    } else {
      console.warn('Fungsi onSave belum dihubungkan dari komponen induk!');
    }
  };

  return (
    <div className={styles.footerContainer}>
      
      {/* --- LEFT: NAVIGATION BUTTONS --- */}
      <div className={styles.buttonGroup}>
        <Button 
          appearance="outline" 
          disabled={currentStep === 1 || isSaving} 
          onClick={handlePrev}
        >
          Previous
        </Button>

        {/* Jika di langkah 4, tampilkan tombol Simpan. Jika belum, tampilkan tombol Berikutnya */}
        {currentStep === 4 ? (
          <Button 
            appearance="primary" 
            onClick={handleSubmit}
            disabled={isSaving} // Tombol mati saat proses simpan berjalan
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Data'}
          </Button>
        ) : (
          <Button 
            appearance="primary" 
            onClick={handleNext}
          >
            Berikutnya
          </Button>
        )}
      </div>

      {/* --- RIGHT: EMPTY SECTION FOR ALIGNMENT --- */}
      <div></div>
      
    </div>
  );
}

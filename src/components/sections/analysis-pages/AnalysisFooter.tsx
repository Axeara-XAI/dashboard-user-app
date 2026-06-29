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
  onSave?: () => void;       
  isSaving?: boolean;        
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
  onSave,       
  isSaving      
}: AnalysisFooterProps) {
  const styles = useStyles();

  // PERBAIKAN: Logika navigasi maksimal diubah menjadi 4 langkah
  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(); 
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

        {/* PERBAIKAN: Tombol "Simpan Data" akan muncul di langkah ke-4 */}
        {currentStep === 4 ? (
          <Button 
            appearance="primary" 
            onClick={handleSubmit}
            disabled={isSaving} 
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

      {/* --- RIGHT: FEEDBACK LINK --- */}
      <div className={styles.feedbackLink}>
        <PersonFeedback20Regular />
        <span>Berikan umpan balik</span>
      </div>
      
    </div>
  );
}
'use client';

import React from 'react';
import {
  makeStyles,
  tokens,
  Label,
  Input,
} from '@fluentui/react-components';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '700px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    color: tokens.colorBrandForeground1,
    borderBottom: `1px dashed ${tokens.colorNeutralStroke2}`,
    paddingBottom: '8px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr', // Lebar label sedikit ditambah karena nama metriknya panjang
    alignItems: 'center',
    gap: '16px',
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  asterisk: {
    color: tokens.colorPaletteRedForeground1,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'flex-start',
    width: '100%',
  },
  inputField: {
    width: '100%',
  },
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function BiometrikJanin() {
  const styles = useStyles();

  return (
    <>
      {/* --- FORM SECTION: UKURAN UTAMA --- */}
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Ukuran Utama Janin</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Abdominal Circumference (AC)</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              placeholder="Lingkar perut janin (dalam mm)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Head Circumference (HC)</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              placeholder="Lingkar kepala janin (dalam mm)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Biparietal Diameter (BPD)</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              placeholder="Diameter kepala janin (dalam mm)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Femur Length (FL)</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              placeholder="Panjang tulang paha janin (dalam mm)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Estimated Fetal Weight (EFW)</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              placeholder="Estimasi berat janin (dalam gram)" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>

      {/* --- FORM SECTION: UKURAN TAMBAHAN --- */}
      <div className={styles.formSection} style={{ marginTop: '32px' }}>
        <h2 className={styles.sectionTitle}>Ukuran Tambahan (Opsional)</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Transcerebellar Diameter (TCD)</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              placeholder="Ukuran otak kecil (dalam mm)" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>

      {/* --- FORM SECTION: RASIO PERTUMBUHAN --- */}
      <div className={styles.formSection} style={{ marginTop: '32px' }}>
        <h2 className={styles.sectionTitle}>Rasio Proporsi Pertumbuhan</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Rasio HC / AC</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              step="0.01"
              placeholder="Nilai rasio HC/AC" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Rasio FL / AC</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              step="0.01"
              placeholder="Nilai rasio FL/AC" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Rasio TCD / AC</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              step="0.01"
              placeholder="Nilai rasio TCD/AC" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>
    </>
  );
}
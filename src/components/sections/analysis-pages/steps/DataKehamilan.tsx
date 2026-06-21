'use client';

import React from 'react';
import {
  makeStyles,
  tokens,
  Dropdown,
  Option,
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
    gridTemplateColumns: '220px 1fr',
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
export default function DataKehamilan() {
  const styles = useStyles();

  return (
    <>
      {/* --- FORM SECTION: METRIK KEHAMILAN --- */}
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Metrik Kehamilan Saat Ini</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Usia Kehamilan</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={1} 
              placeholder="Dalam hitungan minggu (misal: 24)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Penambahan Berat Badan</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              placeholder="Total kenaikan berat badan dalam kg (misal: 10)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Kunjungan Prenatal</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0}
              placeholder="Jumlah kunjungan pemeriksaan kehamilan" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>

      {/* --- FORM SECTION: GAYA HIDUP --- */}
      <div className={styles.formSection} style={{ marginTop: '32px' }}>
        <h2 className={styles.sectionTitle}>Kebiasaan &amp; Gaya Hidup Ibu</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Kebiasaan Merokok</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Dropdown placeholder="Pilih status" className={styles.inputField}>
              <Option>Ya, perokok aktif</Option>
              <Option>Pernah, tapi sudah berhenti</Option>
              <Option>Tidak pernah</Option>
            </Dropdown>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Konsumsi Alkohol</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Dropdown placeholder="Pilih status" className={styles.inputField}>
              <Option>Ya, mengonsumsi alkohol</Option>
              <Option>Pernah, tapi sudah berhenti</Option>
              <Option>Tidak pernah</Option>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
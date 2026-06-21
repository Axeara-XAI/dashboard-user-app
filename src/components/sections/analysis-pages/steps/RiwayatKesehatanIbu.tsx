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
  subSectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground2,
    marginTop: '8px',
  },
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function RiwayatKesehatanIbu() {
  const styles = useStyles();

  return (
    <>
      {/* --- FORM SECTION: KONDISI MEDIS IBU --- */}
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Kondisi Medis &amp; Obstetri</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Penyakit Kronis</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              placeholder="Masukkan penyakit kronis jika ada (misal: Diabetes, Hipertensi)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Riwayat Infeksi</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              placeholder="Masukkan riwayat infeksi (misal: TORCH, Infeksi Saluran Kemih)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Kondisi Obstetri</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Dropdown placeholder="Pilih kondisi obstetri yang terdeteksi" className={styles.inputField}>
              <Option>Hydramnios</Option>
              <Option>Hemoglob</Option>
              <Option>Hyperpr</Option>
              <Option>Cervix</Option>
              <Option>Uterine</Option>
              <Option>Eklampsia</Option>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* --- FORM SECTION: RIWAYAT KEHAMILAN SEBELUMNYA --- */}
      <div className={styles.formSection} style={{ marginTop: '32px' }}>
        <h2 className={styles.sectionTitle}>Riwayat Kehamilan Sebelumnya</h2>
        <p className={styles.subSectionTitle}>Isi dengan angka 0 jika tidak ada riwayat kendala tersebut.</p>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Jumlah Kehamilan</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0} 
              placeholder="Total kehamilan terdahulu (G)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Bayi Lahir Mati</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0} 
              placeholder="Jumlah kasus bayi lahir mati (Stillbirth)" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Prematur</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0} 
              placeholder="Jumlah kelahiran prematur" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Bayi Meninggal Setelah Lahir</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0} 
              placeholder="Jumlah kasus kematian neonatal" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>
    </>
  );
}
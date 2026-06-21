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
export default function IdentitasOrangTua() {
  const styles = useStyles();

  return (
    <>
      {/* --- FORM SECTION: IDENTITAS IBU --- */}
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Identitas Ibu</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Nama Ibu</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input placeholder="Masukkan nama lengkap ibu" className={styles.inputField} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Usia Ibu</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Input type="number" placeholder="Contoh: 28" className={styles.inputField} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Pendidikan Ibu</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Dropdown placeholder="Pilih tingkat pendidikan" className={styles.inputField}>
              <Option>SD</Option>
              <Option>SMP</Option>
              <Option>SMA</Option>
              <Option>S1</Option>
              <Option>S2</Option>
              <Option>S3</Option>
            </Dropdown>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Ras / Etnis Ibu</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input placeholder="Masukkan ras atau etnis" className={styles.inputField} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Status Pernikahan</Label>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputWrapper}>
            <Dropdown placeholder="Pilih status pernikahan" className={styles.inputField}>
              <Option>Sudah Menikah</Option>
              <Option>Belum Menikah</Option>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* --- FORM SECTION: IDENTITAS AYAH --- */}
      <div className={styles.formSection} style={{ marginTop: '32px' }}>
        <h2 className={styles.sectionTitle}>Identitas Ayah</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Nama Ayah</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input placeholder="Masukkan nama lengkap ayah" className={styles.inputField} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Usia Ayah</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input type="number" placeholder="Contoh: 30" className={styles.inputField} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Pendidikan Ayah</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Dropdown placeholder="Pilih tingkat pendidikan" className={styles.inputField}>
              <Option>SD</Option>
              <Option>SMP</Option>
              <Option>SMA</Option>
              <Option>S1</Option>
              <Option>S2</Option>
              <Option>S3</Option>
            </Dropdown>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}>
            <Label>Ras / Etnis Ayah</Label>
          </div>
          <div className={styles.inputWrapper}>
            <Input placeholder="Masukkan ras atau etnis" className={styles.inputField} />
          </div>
        </div>
      </div>
    </>
  );
}
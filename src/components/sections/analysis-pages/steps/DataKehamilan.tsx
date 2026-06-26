'use client';

import React from 'react';
import { makeStyles, tokens, Label, Input } from '@fluentui/react-components';
import { AnalysisFormData } from '../../../../type/analysis';

const useStyles = makeStyles({
  formSection: { display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: tokens.colorBrandForeground1, borderBottom: `1px dashed ${tokens.colorNeutralStroke2}`, paddingBottom: '8px' },
  formRow: { 
    display: 'grid', 
    gridTemplateColumns: '260px 1fr', 
    alignItems: 'center', 
    gap: '16px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '8px',
      alignItems: 'flex-start',
    }
  },
  labelWrapper: { display: 'flex', alignItems: 'center', gap: '4px' },
  inputWrapper: { display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start', width: '100%' },
  inputField: { width: '100%' },
});

interface StepProps {
  data: AnalysisFormData;
  updateFields: (fields: Partial<AnalysisFormData>) => void;
}

export default function DataKehamilan({ data, updateFields }: StepProps) {
  const styles = useStyles();

  // Helper function untuk menangani perubahan input angka murni
  const handleNumberChange = (field: keyof AnalysisFormData, value: string) => {
    let val = value.replace(/[^0-9]/g, ''); // Buang semua selain angka 0-9
    if (val.length > 1 && val.startsWith('0')) {
      val = val.replace(/^0+/, ''); // Hapus angka 0 di depan jika ada angka lain (misal "05" jadi "5")
    }
    updateFields({ [field]: val } as unknown as Partial<AnalysisFormData>);
  };

  // Helper function untuk mengunci nilai 0 saat kosong
  const handleBlur = (field: keyof AnalysisFormData, value: any) => {
    if (value === '') {
      updateFields({ [field]: '0' } as unknown as Partial<AnalysisFormData>);
    }
  };

  // Helper function untuk memblokir ketikan huruf/simbol
  const preventInvalidKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Data Kehamilan Saat Ini</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Usia Kehamilan (WEEKS)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0}
              onKeyDown={preventInvalidKeys}
              value={data.weeks === '' ? '0' : data.weeks}
              onChange={(e) => handleNumberChange('weeks', e.target.value)}
              onBlur={() => handleBlur('weeks', data.weeks)}
              placeholder="Dalam minggu" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Berat Badan Bertambah (GAINED)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0}
              onKeyDown={preventInvalidKeys}
              value={data.gained === '' ? '0' : data.gained}
              onChange={(e) => handleNumberChange('gained', e.target.value)}
              onBlur={() => handleBlur('gained', data.gained)}
              placeholder="Dalam kg" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Kunjungan Prenatal (VISITS)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0}
              onKeyDown={preventInvalidKeys}
              value={data.visits === '' ? '0' : data.visits}
              onChange={(e) => handleNumberChange('visits', e.target.value)}
              onBlur={() => handleBlur('visits', data.visits)}
              placeholder="Jumlah kunjungan" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection} style={{ marginTop: '32px' }}>
        <h2 className={styles.sectionTitle}>Kebiasaan Ibu</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Merokok (CIGNUM)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0}
              onKeyDown={preventInvalidKeys}
              value={data.cignum === '' ? '0' : data.cignum}
              onChange={(e) => handleNumberChange('cignum', e.target.value)}
              onBlur={() => handleBlur('cignum', data.cignum)}
              placeholder="Jumlah rokok per hari" 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Alkohol (DRINKNUM)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0}
              onKeyDown={preventInvalidKeys}
              value={data.drinknum === '' ? '0' : data.drinknum}
              onChange={(e) => handleNumberChange('drinknum', e.target.value)}
              onBlur={() => handleBlur('drinknum', data.drinknum)}
              placeholder="Jumlah minuman per minggu" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>
    </>
  );
}
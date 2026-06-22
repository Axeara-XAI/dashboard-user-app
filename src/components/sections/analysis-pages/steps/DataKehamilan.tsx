'use client';

import React from 'react';
import { makeStyles, tokens, Label, Input } from '@fluentui/react-components';
import { AnalysisFormData } from '../../../../type/analysis';

const useStyles = makeStyles({
  formSection: { display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: tokens.colorBrandForeground1, borderBottom: `1px dashed ${tokens.colorNeutralStroke2}`, paddingBottom: '8px' },
  formRow: { display: 'grid', gridTemplateColumns: '260px 1fr', alignItems: 'center', gap: '16px' },
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

  return (
    <>
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Data Kehamilan Saat Ini</h2>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Usia Kehamilan (WEEKS)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              value={data.weeks}
              onChange={(e) => updateFields({ weeks: e.target.value })}
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
              value={data.gained}
              onChange={(e) => updateFields({ gained: e.target.value })}
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
              value={data.visits}
              onChange={(e) => updateFields({ visits: e.target.value })}
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
              value={data.cignum}
              onChange={(e) => updateFields({ cignum: e.target.value })}
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
              value={data.drinknum}
              onChange={(e) => updateFields({ drinknum: e.target.value })}
              placeholder="Jumlah minuman per minggu" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>
    </>
  );
}
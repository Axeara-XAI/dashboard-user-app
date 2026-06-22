'use client';

import React from 'react';
import { makeStyles, tokens, Dropdown, Option, Label, Input } from '@fluentui/react-components';
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

export default function OutcomeKehamilan({ data, updateFields }: StepProps) {
  const styles = useStyles();

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Outcome Kehamilan</h2>

      <div className={styles.formRow}>
        <div className={styles.labelWrapper}><Label>Berat Lahir Bayi (BWEIGHT)</Label></div>
        <div className={styles.inputWrapper}>
          <Input 
            type="number" 
            value={data.bweight}
            onChange={(e) => updateFields({ bweight: e.target.value })}
            placeholder="Dalam gram (opsional sebelum lahir)" 
            className={styles.inputField} 
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.labelWrapper}><Label>Status Bayi (LOUTCOME)</Label></div>
        <div className={styles.inputWrapper}>
          <Dropdown 
            placeholder="Pilih status kelahiran" 
            className={styles.inputField}
            value={data.loutcome === '1' ? 'Hidup' : data.loutcome === '2' ? 'Mati' : ''}
            onOptionSelect={(e, props) => updateFields({ loutcome: props.optionValue as string })}
          >
            <Option value="1">Hidup</Option>
            <Option value="2">Mati</Option>
          </Dropdown>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.labelWrapper}><Label>Jenis Kelamin Bayi (SEX)</Label></div>
        <div className={styles.inputWrapper}>
          <Dropdown 
            placeholder="Pilih jenis kelamin" 
            className={styles.inputField}
            value={data.sex === '1' ? 'Laki-laki' : data.sex === '2' ? 'Perempuan' : ''}
            onOptionSelect={(e, props) => updateFields({ sex: props.optionValue as string })}
          >
            <Option value="1">Laki-laki</Option>
            <Option value="2">Perempuan</Option>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
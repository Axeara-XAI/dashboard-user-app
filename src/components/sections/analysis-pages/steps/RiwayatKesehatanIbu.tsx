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

// Map Data untuk Dropdown Multiselect
const PENYAKIT_KRONIS: Record<string, string> = {
  anemia: 'Anemia (ANEMIA)',
  jantung: 'Jantung (CARDIAC)',
  paru: 'Paru-paru (ACLUNG)',
  diabetes: 'Diabetes (DIABETES)',
  hipertensi_kronis: 'Hipertensi kronis (HYPERCH)'
};

const KONDISI_OBSTETRI: Record<string, string> = {
  hydram: 'Hydramnios (HYDRAM)',
  hipertensi_gestasional: 'Hyperpr (HYPERPR)',
  cervix: 'Cervix (CERVIX)',
  uterine: 'Uterine (UTERINE)',
  eklamsia: 'Eklampsia (ECLAMP)'
};

export default function RiwayatKesehatanIbu({ data, updateFields }: StepProps) {
  const styles = useStyles();

  // Helper membaca status checkbox saat ini
  const selectedPenyakit = Object.keys(PENYAKIT_KRONIS).filter(key => data[key as keyof AnalysisFormData]);
  const selectedObstetri = Object.keys(KONDISI_OBSTETRI).filter(key => data[key as keyof AnalysisFormData]);
  const selectedInfeksi = data.herpes ? ['herpes'] : [];

  return (
    <>
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Kondisi Medis & Obstetri</h2>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Penyakit Kronis</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              multiselect 
              placeholder="Pilih kondisi penyerta" 
              className={styles.inputField}
              selectedOptions={selectedPenyakit}
              value={selectedPenyakit.map(k => PENYAKIT_KRONIS[k]).join(', ')}
              onOptionSelect={(e, props) => {
                const isSelected = props.selectedOptions.includes(props.optionValue as string);
                updateFields({ [props.optionValue as string]: isSelected });
              }}
            >
              {Object.entries(PENYAKIT_KRONIS).map(([key, label]) => (
                <Option key={key} value={key}>{label}</Option>
              ))}
            </Dropdown>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Riwayat Infeksi</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              multiselect 
              placeholder="Pilih infeksi" 
              className={styles.inputField}
              selectedOptions={selectedInfeksi}
              value={selectedInfeksi.length ? 'Herpes (HERPES)' : ''}
              onOptionSelect={(e, props) => {
                updateFields({ herpes: props.selectedOptions.includes('herpes') });
              }}
            >
              <Option value="herpes">Herpes (HERPES)</Option>
            </Dropdown>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Kondisi Obstetri</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              multiselect 
              placeholder="Pilih kondisi obstetri" 
              className={styles.inputField}
              selectedOptions={selectedObstetri}
              value={selectedObstetri.map(k => KONDISI_OBSTETRI[k]).join(', ')}
              onOptionSelect={(e, props) => {
                const isSelected = props.selectedOptions.includes(props.optionValue as string);
                updateFields({ [props.optionValue as string]: isSelected });
              }}
            >
              {Object.entries(KONDISI_OBSTETRI).map(([key, label]) => (
                <Option key={key} value={key}>{label}</Option>
              ))}
            </Dropdown>
          </div>
        </div>

        {/* Hemoglobin dipisahkan menjadi Input Angka karena nilainya berupa desimal (g/dL) */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Kadar Hemoglobin (HEMOGLOB)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              step="0.1"
              value={data.hemoglob} 
              onChange={(e) => updateFields({ hemoglob: e.target.value })}
              placeholder="Contoh: 12.4 (dalam g/dL)" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection} style={{ marginTop: '32px' }}>
        <h2 className={styles.sectionTitle}>Riwayat Kehamilan Sebelumnya</h2>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Jumlah Kehamilan (TOTALP)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" min={0} 
              value={data.totalp}
              onChange={(e) => updateFields({ totalp: e.target.value })}
              placeholder="Total sebelumnya" className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Bayi Lahir Mati (BDEAD)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" min={0} 
              value={data.bdead}
              onChange={(e) => updateFields({ bdead: e.target.value })}
              placeholder="Jumlah" className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Prematur (PRETERM)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" min={0} 
              value={data.preterm}
              onChange={(e) => updateFields({ preterm: e.target.value })}
              placeholder="Jumlah" className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Bayi Meninggal Setelah Lahir (PINFANT)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" min={0} 
              value={data.pinfant}
              onChange={(e) => updateFields({ pinfant: e.target.value })}
              placeholder="Jumlah" className={styles.inputField} 
            />
          </div>
        </div>
      </div>
    </>
  );
}
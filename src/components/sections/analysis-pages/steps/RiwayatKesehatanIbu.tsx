'use client';

import React from 'react';
import { makeStyles, tokens, Dropdown, Option, Label, Input } from '@fluentui/react-components';
import { AnalysisFormData } from '../../../../type/analysis';

const useStyles = makeStyles({
  formSection: { display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' },
  formSectionBottom: { display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px', marginTop: '32px', paddingBottom: '32px' },
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
  dropdownListbox: { 
    height: '150px', 
    overflowY: 'auto' 
  }
});

interface StepProps {
  data: AnalysisFormData;
  updateFields: (fields: Partial<AnalysisFormData>) => void;
}

// Map Data untuk Dropdown Multiselect (Termasuk opsi "Tidak Memiliki")
const PENYAKIT_KRONIS: Record<string, string> = {
  none_penyakit: 'Tidak Memiliki Penyakit Kronis',
  anemia: 'Anemia (ANEMIA)',
  jantung: 'Jantung (CARDIAC)',
  paru: 'Paru-paru (ACLUNG)',
  diabetes: 'Diabetes (DIABETES)',
  hipertensi_kronis: 'Hipertensi kronis (HYPERCH)'
};

const KONDISI_OBSTETRI: Record<string, string> = {
  none_obstetri: 'Normal (Tidak Ada Kondisi Khusus)',
  hydram: 'Hydramnios (HYDRAM)',
  hipertensi_gestasional: 'Hyperpr (HYPERPR)',
  cervix: 'Cervix (CERVIX)',
  uterine: 'Uterine (UTERINE)',
  eklamsia: 'Eklampsia (ECLAMP)'
};

export default function RiwayatKesehatanIbu({ data, updateFields }: StepProps) {
  const styles = useStyles();

  // ==========================================================================
  // LOGIKA KONTROL SELECTION DROPDOWN
  // ==========================================================================
  
  // 1. Penyakit Kronis
  const hasPenyakit = ['anemia', 'jantung', 'paru', 'diabetes', 'hipertensi_kronis'].some(k => data[k as keyof AnalysisFormData] === true);
  const selectedPenyakit = hasPenyakit 
    ? Object.keys(PENYAKIT_KRONIS).filter(key => key !== 'none_penyakit' && data[key as keyof AnalysisFormData])
    : ['none_penyakit'];

  // 2. Kondisi Obstetri
  const hasObstetri = ['hydram', 'hipertensi_gestasional', 'cervix', 'uterine', 'eklamsia'].some(k => data[k as keyof AnalysisFormData] === true);
  const selectedObstetri = hasObstetri
    ? Object.keys(KONDISI_OBSTETRI).filter(key => key !== 'none_obstetri' && data[key as keyof AnalysisFormData])
    : ['none_obstetri'];

  // 3. Riwayat Infeksi
  const selectedInfeksi = data.herpes ? ['herpes'] : ['none_infeksi'];

  return (
    <>
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Kondisi Medis & Obstetri</h2>
        
        {/* DROPDOWN: PENYAKIT KRONIS */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Penyakit Kronis</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              multiselect 
              placeholder="Pilih kondisi penyerta" 
              className={styles.inputField}
              positioning="below"
              listbox={{ className: styles.dropdownListbox }}
              selectedOptions={selectedPenyakit}
              value={selectedPenyakit.map(k => PENYAKIT_KRONIS[k]).join(', ')}
              onOptionSelect={(e, props) => {
                const val = props.optionValue as string;
                if (val === 'none_penyakit') {
                  // Jika memilih "Tidak Memiliki", set semua penyakit menjadi false
                  updateFields({ anemia: false, jantung: false, paru: false, diabetes: false, hipertensi_kronis: false });
                } else {
                  const isSelected = props.selectedOptions.includes(val);
                  updateFields({ [val]: isSelected });
                }
              }}
            >
              {Object.entries(PENYAKIT_KRONIS).map(([key, label]) => (
                <Option key={key} value={key}>{label}</Option>
              ))}
            </Dropdown>
          </div>
        </div>

        {/* DROPDOWN: RIWAYAT INFEKSI */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Riwayat Infeksi</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              multiselect 
              placeholder="Pilih infeksi" 
              className={styles.inputField}
              positioning="below"
              listbox={{ className: styles.dropdownListbox }}
              selectedOptions={selectedInfeksi}
              value={data.herpes ? 'Herpes (HERPES)' : 'Tidak Memiliki Riwayat Infeksi'}
              onOptionSelect={(e, props) => {
                const val = props.optionValue as string;
                if (val === 'none_infeksi') {
                  updateFields({ herpes: false });
                } else {
                  updateFields({ herpes: props.selectedOptions.includes('herpes') });
                }
              }}
            >
              <Option value="none_infeksi">Tidak Memiliki Riwayat Infeksi</Option>
              <Option value="herpes">Herpes (HERPES)</Option>
            </Dropdown>
          </div>
        </div>

        {/* DROPDOWN: KONDISI OBSTETRI */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Kondisi Obstetri</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              multiselect 
              placeholder="Pilih kondisi obstetri" 
              className={styles.inputField}
              positioning="below"
              listbox={{ className: styles.dropdownListbox }}
              selectedOptions={selectedObstetri}
              value={selectedObstetri.map(k => KONDISI_OBSTETRI[k]).join(', ')}
              onOptionSelect={(e, props) => {
                const val = props.optionValue as string;
                if (val === 'none_obstetri') {
                  // Jika memilih "Normal", matikan semua flag risiko obstetri
                  updateFields({ hydram: false, hipertensi_gestasional: false, cervix: false, uterine: false, eklamsia: false });
                } else {
                  const isSelected = props.selectedOptions.includes(val);
                  updateFields({ [val]: isSelected });
                }
              }}
            >
              {Object.entries(KONDISI_OBSTETRI).map(([key, label]) => (
                <Option key={key} value={key}>{label}</Option>
              ))}
            </Dropdown>
          </div>
        </div>

        {/* INPUT: KADAR HEMOGLOBIN */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Kadar Hemoglobin (HEMOGLOB)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              step="0.1"
              min={0}
              onKeyDown={(e) => { if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault(); }}
              value={data.hemoglob === '' ? '0' : data.hemoglob} 
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || Number(val) >= 0) updateFields({ hemoglob: val });
              }}
              onBlur={() => { if (data.hemoglob === '') updateFields({ hemoglob: '0' }); }}
              placeholder="Contoh: 12.4 (dalam g/dL)" 
              className={styles.inputField} 
            />
          </div>
        </div>
      </div>

      {/* --- BAGIAN RIWAYAT KEHAMILAN SEBELUMNYA --- */}
      <div className={styles.formSectionBottom}>
        <h2 className={styles.sectionTitle}>Riwayat Kehamilan Sebelumnya</h2>
        
        {/* INPUT: TOTALP */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Jumlah Kehamilan (TOTALP)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0} 
              onKeyDown={(e) => { if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault(); }}
              value={data.totalp === '' ? '0' : data.totalp}
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9]/g, '');
                if (val.length > 1 && val.startsWith('0')) val = val.replace(/^0+/, '');
                updateFields({ totalp: val });
              }}
              onBlur={() => { if (data.totalp === '') updateFields({ totalp: '0' }); }}
              placeholder="Total sebelumnya" 
              className={styles.inputField} 
            />
          </div>
        </div>

        {/* INPUT: BDEAD */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Bayi Lahir Mati (BDEAD)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0} 
              onKeyDown={(e) => { if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault(); }}
              value={data.bdead === '' ? '0' : data.bdead}
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9]/g, '');
                if (val.length > 1 && val.startsWith('0')) val = val.replace(/^0+/, '');
                updateFields({ bdead: val });
              }}
              onBlur={() => { if (data.bdead === '') updateFields({ bdead: '0' }); }}
              placeholder="Jumlah" 
              className={styles.inputField} 
            />
          </div>
        </div>

        {/* INPUT: PRETERM */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Prematur (PRETERM)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0} 
              onKeyDown={(e) => { if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault(); }}
              value={data.preterm === '' ? '0' : data.preterm}
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9]/g, '');
                if (val.length > 1 && val.startsWith('0')) val = val.replace(/^0+/, '');
                updateFields({ preterm: val });
              }}
              onBlur={() => { if (data.preterm === '') updateFields({ preterm: '0' }); }}
              placeholder="Jumlah" 
              className={styles.inputField} 
            />
          </div>
        </div>

        {/* INPUT: PINFANT */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Bayi Meninggal Setelah Lahir (PINFANT)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0} 
              onKeyDown={(e) => { if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault(); }}
              value={data.pinfant === '' ? '0' : data.pinfant}
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9]/g, '');
                if (val.length > 1 && val.startsWith('0')) val = val.replace(/^0+/, '');
                updateFields({ pinfant: val });
              }}
              onBlur={() => { if (data.pinfant === '') updateFields({ pinfant: '0' }); }}
              placeholder="Jumlah" 
              className={styles.inputField} 
            />
          </div>
        </div>

        {/* DROPDOWN: LOUTCOME — Outcome Persalinan Sebelumnya */}
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label required>Outcome Persalinan Sebelumnya (LOUTCOME)</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown
              placeholder="Pilih outcome persalinan terakhir"
              className={styles.inputField}
              value={
                data.loutcome === '1' ? 'Lahir Hidup' :
                data.loutcome === '2' ? 'Lahir Mati (Stillbirth / Neonatal Death)' :
                data.loutcome === '9' ? 'Belum Pernah Melahirkan (Primigravida)' : ''
              }
              onOptionSelect={(e, props) => updateFields({ loutcome: props.optionValue as string })}
            >
              <Option value="1">Lahir Hidup</Option>
              <Option value="2">Lahir Mati (Stillbirth / Neonatal Death)</Option>
              <Option value="9">Belum Pernah Melahirkan (Primigravida)</Option>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
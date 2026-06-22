'use client';

import React from 'react';
import { makeStyles, tokens, Dropdown, Option, Label, Input } from '@fluentui/react-components';
import { AnalysisFormData } from '../../../../type/analysis'; 

const useStyles = makeStyles({
  formSection: { display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' },
  
  formSectionBottom: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '24px', 
    maxWidth: '700px',
    marginTop: '32px',
    paddingBottom: '32px'
  },
  
  sectionTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: tokens.colorBrandForeground1, borderBottom: `1px dashed ${tokens.colorNeutralStroke2}`, paddingBottom: '8px' },
  formRow: { display: 'grid', gridTemplateColumns: '260px 1fr', alignItems: 'center', gap: '16px' },
  labelWrapper: { display: 'flex', alignItems: 'center', gap: '4px' },
  inputWrapper: { display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start', width: '100%' },
  inputField: { width: '100%' },
  
  educationWrapper: { display: 'flex', gap: '8px', width: '100%' }, 
  educationDropdown: { flexGrow: 1, flexBasis: 0, minWidth: 0 },
});

// Kategori Pendidikan Utama
const EDUCATION_CATEGORIES = [
  'Tidak Sekolah', 'SD', 'SMP', 'SMA/SMK', 'Diplomat', 'Sarjana'
];

// Detail Sub-Pendidikan
const EDUCATION_DETAILS: Record<string, { label: string; value: number }[]> = {
  'SD': [
    { label: 'Kelas 1', value: 1 }, { label: 'Kelas 2', value: 2 },
    { label: 'Kelas 3', value: 3 }, { label: 'Kelas 4', value: 4 },
    { label: 'Kelas 5', value: 5 }, { label: 'Kelas 6', value: 6 }
  ],
  'SMP': [
    { label: 'Kelas 7', value: 7 }, { label: 'Kelas 8', value: 8 }, { label: 'Kelas 9', value: 9 }
  ],
  'SMA/SMK': [
    { label: 'Kelas 10', value: 10 }, { label: 'Kelas 11', value: 11 }, { label: 'Kelas 12', value: 12 }
  ],
  'Diplomat': [
    { label: 'Diplomat 1', value: 13 }, { label: 'Diplomat 2', value: 14 }, { label: 'Diplomat 3', value: 15 }
  ],
  'Sarjana': [
    { label: 'Sarjana S1', value: 16 }, { label: 'Pascasarjana S2', value: 17 }, { label: 'Doktor S3', value: 17 }
  ]
};

// Interface Props untuk mengalirkan state dari parent
interface StepProps {
  data: AnalysisFormData;
  updateFields: (fields: Partial<AnalysisFormData>) => void;
}

export default function IdentitasOrangTua({ data, updateFields }: StepProps) {
  const styles = useStyles();

  return (
    <>
      {/* --- BAGIAN IBU --- */}
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Identitas Ibu</h2>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Nama Ibu</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              value={data.nama_ibu}
              onChange={(e) => updateFields({ nama_ibu: e.target.value })}
              placeholder="Masukkan nama ibu" 
              className={styles.inputField} 
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Usia Ibu (MAGE)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              value={data.mage}
              onChange={(e) => updateFields({ mage: e.target.value })}
              placeholder="Contoh: 28" 
              className={styles.inputField} 
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Pendidikan Ibu (MEDUC)</Label></div>
          <div className={styles.inputWrapper}>
            <div className={styles.educationWrapper}>
              <Dropdown 
                placeholder="Pilih Kategori" 
                value={data.meduc_cat || undefined}
                className={styles.educationDropdown} 
                onOptionSelect={(e, props) => updateFields({ 
                  meduc_cat: props.optionValue as string,
                  meduc_raw: props.optionValue === 'Tidak Sekolah' ? 1 : data.meduc_raw
                })}
              >
                {EDUCATION_CATEGORIES.map(cat => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Dropdown>

              {data.meduc_cat && EDUCATION_DETAILS[data.meduc_cat] && (
                <Dropdown 
                  placeholder="Pilih Kelas/Tingkat" 
                  className={styles.educationDropdown}
                  listbox={{ style: { maxHeight: '200px' } }}
                  onOptionSelect={(e, props) => updateFields({ meduc_raw: Number(props.optionValue) })}
                >
                  {EDUCATION_DETAILS[data.meduc_cat].map(detail => (
                    <Option key={detail.label} value={detail.value.toString()}>
                      {detail.label}
                    </Option>
                  ))}
                </Dropdown>
              )}
            </div>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Ras Ibu (RACEMOM)</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              placeholder="Pilih Ras" 
              className={styles.inputField}
              listbox={{ style: { maxHeight: '200px' } }}
              onOptionSelect={(e, props) => updateFields({ racemom: props.optionValue as string })}
            >
              <Option value="0">Unknown</Option>
              <Option value="1">OTHER_NON_WHITE</Option>
              <Option value="2">WHITE</Option>
              <Option value="3">BLACK</Option>
              <Option value="4">AMERICAN_INDIAN</Option>
              <Option value="5">CHINESE</Option>
              <Option value="6">JAPANESE</Option>
              <Option value="7">HAWAIIAN</Option>
              <Option value="8">FILIPINO</Option>
              <Option value="9">OTHER_ASIAN</Option>
            </Dropdown>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Etnis Ibu (HISPMOM)</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              placeholder="Pilih Etnis (Hispanic)" 
              className={styles.inputField}
              listbox={{ style: { maxHeight: '200px' } }}
              onOptionSelect={(e, props) => updateFields({ hispmom: props.optionValue as string })}
            >
              <Option value="N">No</Option>
              <Option value="C">Cubans</Option>
              <Option value="M">Mexicans</Option>
              <Option value="O">Colombians</Option>
              <Option value="P">Peruvians</Option>
              <Option value="S">Salvadorans</Option>
              <Option value="U">Guatemalans</Option>
            </Dropdown>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Status Perkawinan (MARITAL)</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              placeholder="Pilih status" 
              className={styles.inputField}
              onOptionSelect={(e, props) => updateFields({ marital: props.optionValue as string })}
            >
              <Option value="1">Sudah Menikah</Option>
              <Option value="2">Belum Menikah</Option>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* --- BAGIAN AYAH --- */}
      <div className={styles.formSectionBottom}>
        <h2 className={styles.sectionTitle}>Identitas Ayah</h2>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Nama Ayah</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              value={data.nama_ayah}
              onChange={(e) => updateFields({ nama_ayah: e.target.value })}
              placeholder="Masukkan nama ayah" 
              className={styles.inputField} 
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Usia Ayah (FAGE)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              value={data.fage}
              onChange={(e) => updateFields({ fage: e.target.value })}
              placeholder="Contoh: 30" 
              className={styles.inputField} 
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Pendidikan Ayah (FEDUC)</Label></div>
          <div className={styles.inputWrapper}>
            <div className={styles.educationWrapper}>
              <Dropdown 
                placeholder="Pilih Kategori" 
                value={data.feduc_cat || undefined}
                className={styles.educationDropdown} 
                onOptionSelect={(e, props) => updateFields({ 
                  feduc_cat: props.optionValue as string,
                  feduc_raw: props.optionValue === 'Tidak Sekolah' ? 1 : data.feduc_raw
                })}
              >
                {EDUCATION_CATEGORIES.map(cat => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Dropdown>

              {data.feduc_cat && EDUCATION_DETAILS[data.feduc_cat] && (
                <Dropdown 
                  placeholder="Pilih Kelas/Tingkat" 
                  className={styles.educationDropdown}
                  listbox={{ style: { maxHeight: '200px' } }}
                  onOptionSelect={(e, props) => updateFields({ feduc_raw: Number(props.optionValue) })}
                >
                  {EDUCATION_DETAILS[data.feduc_cat].map(detail => (
                    <Option key={detail.label} value={detail.value.toString()}>
                      {detail.label}
                    </Option>
                  ))}
                </Dropdown>
              )}
            </div>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Ras Ayah (RACEDAD)</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              placeholder="Pilih Ras" 
              className={styles.inputField}
              listbox={{ style: { maxHeight: '200px' } }}
              onOptionSelect={(e, props) => updateFields({ racedad: props.optionValue as string })}
            >
              <Option value="0">Unknown</Option>
              <Option value="1">OTHER_NON_WHITE</Option>
              <Option value="2">WHITE</Option>
              <Option value="3">BLACK</Option>
              <Option value="4">AMERICAN_INDIAN</Option>
              <Option value="5">CHINESE</Option>
              <Option value="6">JAPANESE</Option>
              <Option value="7">HAWAIIAN</Option>
              <Option value="8">FILIPINO</Option>
              <Option value="9">OTHER_ASIAN</Option>
            </Dropdown>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label>Etnis Ayah (HISPDAD)</Label></div>
          <div className={styles.inputWrapper}>
            <Dropdown 
              placeholder="Pilih Etnis (Hispanic)" 
              className={styles.inputField}
              listbox={{ style: { maxHeight: '200px' } }}
              onOptionSelect={(e, props) => updateFields({ hispdad: props.optionValue as string })}
            >
              <Option value="N">No</Option>
              <Option value="C">Cubans</Option>
              <Option value="M">Mexicans</Option>
              <Option value="O">Colombians</Option>
              <Option value="P">Peruvians</Option>
              <Option value="S">Salvadorans</Option>
              <Option value="U">Guatemalans</Option>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
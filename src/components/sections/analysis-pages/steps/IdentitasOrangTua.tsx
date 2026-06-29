'use client';

import React, { useState, useEffect } from 'react';
import { makeStyles, tokens, Combobox, Option, Label, Input } from '@fluentui/react-components';
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
  educationWrapper: { display: 'flex', gap: '8px', width: '100%' }, 
  educationDropdown: { flexGrow: 1, flexBasis: 0, minWidth: 0 },
  dropdownListbox: { 
    height: '150px', 
    overflowY: 'auto' 
  }
});

// ============================================================================
// DATA OPTIONS
// ============================================================================
const EDUCATION_CATEGORIES = [
  { label: 'Tidak Sekolah', value: 'Tidak Sekolah' },
  { label: 'SD', value: 'SD' },
  { label: 'SMP', value: 'SMP' },
  { label: 'SMA/SMK', value: 'SMA/SMK' },
  { label: 'Diplomat', value: 'Diplomat' },
  { label: 'Sarjana', value: 'Sarjana' }
];

const EDUCATION_DETAILS: Record<string, { label: string; value: number }[]> = {
  'SD': [{ label: 'Kelas 1', value: 1 }, { label: 'Kelas 2', value: 2 }, { label: 'Kelas 3', value: 3 }, { label: 'Kelas 4', value: 4 }, { label: 'Kelas 5', value: 5 }, { label: 'Kelas 6', value: 6 }],
  'SMP': [{ label: 'Kelas 7', value: 7 }, { label: 'Kelas 8', value: 8 }, { label: 'Kelas 9', value: 9 }],
  'SMA/SMK': [{ label: 'Kelas 10', value: 10 }, { label: 'Kelas 11', value: 11 }, { label: 'Kelas 12', value: 12 }],
  'Diplomat': [{ label: 'Diplomat 1', value: 13 }, { label: 'Diplomat 2', value: 14 }, { label: 'Diplomat 3', value: 15 }],
  'Sarjana': [{ label: 'Sarjana S1', value: 16 }, { label: 'Pascasarjana S2', value: 17 }, { label: 'Doktor S3', value:18 }]
};

const RACE_OPTIONS = [
  { label: 'Unknown', value: '0' }, { label: 'Other Non White', value: '1' }, { label: 'White', value: '2' },
  { label: 'Black', value: '3' }, { label: 'America Indian', value: '4' }, { label: 'Chinese', value: '5' },
  { label: 'Japanese', value: '6' }, { label: 'Hawaiian', value: '7' }, { label: 'Filipino', value: '8' }, { label: 'Other Asia', value: '9' }
];

const ETHNICITY_OPTIONS = [
  { label: 'No', value: 'N' }, { label: 'Cubans', value: 'C' }, { label: 'Mexicans', value: 'M' },
  { label: 'Colombians', value: 'O' }, { label: 'Peruvians', value: 'P' }, { label: 'Salvadorans', value: 'S' }, { label: 'Guatemalans', value: 'U' }
];

const MARITAL_OPTIONS = [
  { label: 'Sudah Menikah', value: '1' }, { label: 'Belum Menikah', value: '2' }
];

// ============================================================================
// CUSTOM COMPONENT: Searchable Dropdown
// ============================================================================
interface SearchableDropdownProps {
  value: string | number;
  options: { label: string; value: string | number }[];
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ value, options, placeholder, onChange, className }) => {
  const styles = useStyles(); 
  const isValidValue = value !== undefined && value !== null && value !== '';
  const selectedOption = isValidValue ? options.find(o => o.value.toString() === value?.toString()) : undefined;
  
  const [query, setQuery] = useState(selectedOption?.label || '');

  useEffect(() => {
    const valid = value !== undefined && value !== null && value !== '';
    const found = valid ? options.find(o => o.value.toString() === value?.toString()) : undefined;
    setQuery(found?.label || '');
  }, [value, options]);

  const isSelectedExact = selectedOption && query === selectedOption.label;
  const filteredOptions = isSelectedExact 
    ? options 
    : options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <Combobox
      placeholder={placeholder}
      className={className}
      positioning="below"
      listbox={{ className: styles.dropdownListbox }} 
      selectedOptions={isValidValue && selectedOption ? [value.toString()] : []}
      value={query}
      onChange={(e) => setQuery(e.target.value)} 
      onOptionSelect={(e, data) => {
        setQuery(data.optionText || '');
        if (data.optionValue) onChange(data.optionValue);
      }}
    >
      {filteredOptions.length > 0 ? (
        filteredOptions.map(opt => (
          <Option key={opt.value} value={opt.value.toString()} text={opt.label}>
            {opt.label}
          </Option>
        ))
      ) : (
        <Option disabled>Tidak ditemukan</Option>
      )}
    </Combobox>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
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
          <div className={styles.labelWrapper}><Label required>Nama Ibu</Label></div>
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
          <div className={styles.labelWrapper}><Label required>Usia Ibu (MAGE)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0}
              value={data.mage}
              onKeyDown={(e) => {
                // PERBAIKAN: Cegah input tombol huruf eksponen dan simbol matematika
                if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                // PERBAIKAN: Secara paksa hapus semua karakter selain angka (0-9)
                const numericVal = e.target.value.replace(/[^0-9]/g, '');
                updateFields({ mage: numericVal });
              }}
              placeholder="Contoh: 28" 
              className={styles.inputField} 
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label required>Pendidikan Ibu (MEDUC)</Label></div>
          <div className={styles.inputWrapper}>
            <div className={styles.educationWrapper}>
              <SearchableDropdown
                placeholder="Pilih Kategori"
                className={styles.educationDropdown}
                value={data.meduc_cat}
                options={EDUCATION_CATEGORIES}
                onChange={(val) => updateFields({ 
                  meduc_cat: val, 
                  meduc_raw: val === 'Tidak Sekolah' ? 1 : data.meduc_raw 
                })}
              />

              {data.meduc_cat && EDUCATION_DETAILS[data.meduc_cat] && (
                <SearchableDropdown
                  placeholder="Pilih Kelas/Tingkat"
                  className={styles.educationDropdown}
                  value={data.meduc_raw}
                  options={EDUCATION_DETAILS[data.meduc_cat]}
                  onChange={(val) => updateFields({ meduc_raw: Number(val) })}
                />
              )}
            </div>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label required>Ras Ibu (RACEMOM)</Label></div>
          <div className={styles.inputWrapper}>
            <SearchableDropdown
              placeholder="Pilih Ras"
              className={styles.inputField}
              value={data.racemom}
              options={RACE_OPTIONS}
              onChange={(val) => updateFields({ racemom: val })}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label required>Etnis Ibu (HISPMOM)</Label></div>
          <div className={styles.inputWrapper}>
            <SearchableDropdown
              placeholder="Pilih Etnis (Hispanic)"
              className={styles.inputField}
              value={data.hispmom}
              options={ETHNICITY_OPTIONS}
              onChange={(val) => updateFields({ hispmom: val })}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label required>Status Perkawinan (MARITAL)</Label></div>
          <div className={styles.inputWrapper}>
            <SearchableDropdown
              placeholder="Pilih status"
              className={styles.inputField}
              value={data.marital}
              options={MARITAL_OPTIONS}
              onChange={(val) => updateFields({ marital: val })}
            />
          </div>
        </div>
      </div>

      {/* --- BAGIAN AYAH --- */}
      <div className={styles.formSectionBottom}>
        <h2 className={styles.sectionTitle}>Identitas Ayah</h2>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label required>Nama Ayah</Label></div>
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
          <div className={styles.labelWrapper}><Label required>Usia Ayah (FAGE)</Label></div>
          <div className={styles.inputWrapper}>
            <Input 
              type="number" 
              min={0} 
              value={data.fage}
              onKeyDown={(e) => {
                // PERBAIKAN: Cegah input tombol huruf eksponen dan simbol matematika
                if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                // PERBAIKAN: Secara paksa hapus semua karakter selain angka (0-9)
                const numericVal = e.target.value.replace(/[^0-9]/g, '');
                updateFields({ fage: numericVal });
              }}
              placeholder="Contoh: 30" 
              className={styles.inputField} 
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label required>Pendidikan Ayah (FEDUC)</Label></div>
          <div className={styles.inputWrapper}>
            <div className={styles.educationWrapper}>
              <SearchableDropdown
                placeholder="Pilih Kategori"
                className={styles.educationDropdown}
                value={data.feduc_cat}
                options={EDUCATION_CATEGORIES}
                onChange={(val) => updateFields({ 
                  feduc_cat: val, 
                  feduc_raw: val === 'Tidak Sekolah' ? 1 : data.feduc_raw 
                })}
              />

              {data.feduc_cat && EDUCATION_DETAILS[data.feduc_cat] && (
                <SearchableDropdown
                  placeholder="Pilih Kelas/Tingkat"
                  className={styles.educationDropdown}
                  value={data.feduc_raw}
                  options={EDUCATION_DETAILS[data.feduc_cat]}
                  onChange={(val) => updateFields({ feduc_raw: Number(val) })}
                />
              )}
            </div>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label required>Ras Ayah (RACEDAD)</Label></div>
          <div className={styles.inputWrapper}>
            <SearchableDropdown
              placeholder="Pilih Ras"
              className={styles.inputField}
              value={data.racedad}
              options={RACE_OPTIONS}
              onChange={(val) => updateFields({ racedad: val })}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.labelWrapper}><Label required>Etnis Ayah (HISPDAD)</Label></div>
          <div className={styles.inputWrapper}>
            <SearchableDropdown
              placeholder="Pilih Etnis (Hispanic)"
              className={styles.inputField}
              value={data.hispdad}
              options={ETHNICITY_OPTIONS}
              onChange={(val) => updateFields({ hispdad: val })}
            />
          </div>
        </div>
      </div>
    </>
  );
}
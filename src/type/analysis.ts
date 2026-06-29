export interface AnalysisFormData {
  // Langkah 1: Identitas Orang Tua
  nama_ibu: string;
  mage: string;
  meduc_raw: number; 
  meduc_cat: string;  
  racemom: string;
  hispmom: string;
  marital: string;
  nama_ayah: string;
  fage: string;
  feduc_raw: number;
  feduc_cat: string;
  racedad: string;
  hispdad: string;

  // Langkah 2: Riwayat Kesehatan & Persalinan Ibu
  anemia: boolean;
  jantung: boolean;
  paru: boolean;
  diabetes: boolean;
  hipertensi_kronis: boolean;
  hipertensi_gestasional: boolean;
  eklamsia: boolean;               
  ginjal: boolean;                 
  herpes: boolean;
  hydram: boolean;
  rhsen: boolean;
  hemoglob: string;
  cervix: boolean;
  uterine: boolean;
  totalp: string;
  bdead: string;
  preterm: string;
  pinfant: string;
  loutcome: string;

  // Langkah 3: Data Kehamilan Saat Ini
  weeks: string;
  gained: string;
  visits: string;
  cignum: string;
  drinknum: string;
}
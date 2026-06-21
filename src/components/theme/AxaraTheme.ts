import { 
  createLightTheme, 
  createDarkTheme, 
  type BrandVariants, 
  type Theme 
} from '@fluentui/react-components';

// ==========================================
// 1. BRAND THEME TOKENS (Your Custom Palette)
// ==========================================
const fgrBrandColors: BrandVariants = {
  10: "#020305",
  20: "#111723",
  30: "#16263D",
  40: "#193253",
  50: "#1B3F6A",
  60: "#1C4C82",
  70: "#1C5A9B",
  80: "#2B6AA8",
  90: "#3F7BB6",
  100: "#548CC3",
  110: "#6A9DD1",
  120: "#81AFDE",
  130: "#99C1EB",
  140: "#B2D3F7",
  150: "#CCE5FF",
  160: "#E5F2FF",
};

// ==========================================
// 2. THEME EXPORTS
// ==========================================

// Menggunakan nama axaraLightTheme agar otomatis klop dengan file providers.tsx bawaanmu
export const axaraLightTheme: Theme = createLightTheme(fgrBrandColors);

// Menambahkan opsi Dark Theme dengan basis warna fgrBrandColors yang sama
export const axaraDarkTheme: Theme = createDarkTheme(fgrBrandColors);
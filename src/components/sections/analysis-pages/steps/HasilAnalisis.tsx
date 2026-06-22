'use client';

import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, tokens, Text, Badge, Card, CardHeader, Spinner } from '@fluentui/react-components';
import { AnalysisFormData } from '../../../../type/analysis'; 

const useStyles = makeStyles({
  container: { display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' },
  sectionTitle: { fontSize: '18px', fontWeight: '600', color: tokens.colorBrandForeground1, borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, paddingBottom: '8px' },
  
  // Grid untuk Summary Card
  summaryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  mainCard: { padding: '16px', boxShadow: tokens.shadow2, border: `1px solid ${tokens.colorNeutralStroke1}` },
  
  // Teks Box untuk Narasi Gemini 
  narrativeBox: { 
    backgroundColor: tokens.colorNeutralBackground2, 
    padding: '20px', 
    borderRadius: tokens.borderRadiusMedium, 
    borderLeft: `4px solid ${tokens.colorBrandStroke1}`, 
    lineHeight: '1.6',
    textAlign: 'justify' 
  },
  
  // Teks Box untuk Rekomendasi
  recommendationBox: { 
    backgroundColor: tokens.colorPaletteLightGreenBackground2, 
    padding: '20px', 
    borderRadius: tokens.borderRadiusMedium, 
    borderLeft: `4px solid ${tokens.colorPaletteGreenBackground3}`, 
    lineHeight: '1.6',
    textAlign: 'justify' 
  },
  
  // Desain List SHAP Feature Contributions
  featureList: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' },
  featureItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: tokens.borderRadiusMedium, border: `1px solid ${tokens.colorNeutralStroke2}` },
  featureInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
  
  // Loading State
  loadingContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: '24px', textAlign: 'center', backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusLarge, border: `1px dashed ${tokens.colorBrandStroke1}`, width: '100%' }
});

// Fungsi pemetaan skala pendidikan UI (1-19) ke skala AI (1-6)
const mapEducationToAiScale = (uiValue: number): number => {
  if (uiValue === 1) return 1;          // Tidak Sekolah
  if (uiValue >= 2 && uiValue <= 7) return 2;   // SD
  if (uiValue >= 8 && uiValue <= 10) return 3;  // SMP
  if (uiValue >= 11 && uiValue <= 13) return 4; // SMA
  if (uiValue >= 14 && uiValue <= 16) return 5; // Diplomat
  if (uiValue >= 17) return 6;                  // Sarjana S1-S3
  return 1;
};

// 1. PENYESUAIAN: Tambahkan onApiDataLoaded di sini
interface StepProps {
  formData: AnalysisFormData;
  onApiDataLoaded?: (data: any) => void; 
}

// 2. PENYESUAIAN: Ekstrak prop onApiDataLoaded di sini
export default function HasilAnalisis({ formData, onApiDataLoaded }: StepProps) {
  const styles = useStyles();
  
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Menggunakan useRef agar API tidak dipanggil 2 kali saat React Strict Mode menyala
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchAnalysis = async () => {
      try {
        // 1. Siapkan Payload JSON sesuai standar Azure
        const payload = {
          MAGE: Number(formData.mage) || 0,
          FAGE: Number(formData.fage) || 0,
          MEDUC: mapEducationToAiScale(formData.meduc_raw),
          FEDUC: mapEducationToAiScale(formData.feduc_raw),
          MARITAL: Number(formData.marital) || 1,
          RACEMOM: Number(formData.racemom) || 0,
          RACEDAD: Number(formData.racedad) || 0,
          HISPMOM: formData.hispmom === 'N' ? 0 : 1,
          HISPDAD: formData.hispdad === 'N' ? 0 : 1,
          CIGNUM: Number(formData.cignum) || 0,
          DRINKNUM: Number(formData.drinknum) || 0,
          GAINED: parseFloat(formData.gained) || 0,
          anemia: formData.anemia ? 1 : 0,
          jantung: formData.jantung ? 1 : 0,
          paru: formData.paru ? 1 : 0,
          diabetes: formData.diabetes ? 1 : 0,
          herpes: formData.herpes ? 1 : 0,
          ginjal: 0, // Default aman karena tidak ada di form UI
          hipertensi_kronis: formData.hipertensi_kronis ? 1 : 0,
          hipertensi_gestasional: formData.hipertensi_gestasional ? 1 : 0,
          eklamsia: formData.eklamsia ? 1 : 0,
          serviks: formData.cervix ? 1 : 0,
          rahim: formData.uterine ? 1 : 0,
          HYDRAM: formData.hydram ? 1 : 0,
          HEMOGLOB: parseFloat(formData.hemoglob) || 12.0,
          RHSEN: 0,
          LOUTCOME: Number(formData.loutcome) || 1,
          VISITS: Number(formData.visits) || 0,
          TOTALP: Number(formData.totalp) || 0,
          BDEAD: Number(formData.bdead) || 0,
          TERMS: 1,
          PRETERM: Number(formData.preterm) || 0,
          PINFANT: Number(formData.pinfant) || 0,
        };

        // 2. Tembak ke URL Azure App Service
        const response = await fetch('https://axara-models-erdkdzd8a2bwhba8.southeastasia-01.azurewebsites.net/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApiData(data);
        
        // 3. PENYESUAIAN: Lempar data ke atas (ke AnalysisBody) agar bisa disimpan
        if (onApiDataLoaded) {
          onApiDataLoaded(data);
        }

      } catch (err: any) {
        setError(err.message || 'Gagal menghubungi server AI Azure.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [formData, onApiDataLoaded]);

  // --- RENDER LOADING ---
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="huge" appearance="primary" />
        <div>
          <Text size={500} weight="semibold" block style={{ marginBottom: '8px' }}>
            Sistem AI Sedang Menganalisis...
          </Text>
          <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
            Harap tunggu. Komputasi matriks SHAP dan penyusunan narasi medis oleh Gemini dapat memakan waktu 1 hingga 2 menit.
          </Text>
        </div>
      </div>
    );
  }

  // --- RENDER ERROR ---
  if (error || !apiData || apiData.status !== 'success') {
    return (
      <div className={styles.loadingContainer} style={{ borderColor: tokens.colorPaletteRedBorder2 }}>
        <Text size={500} weight="bold" style={{ color: tokens.colorPaletteRedForeground1 }}>Analisis Gagal</Text>
        <Text>{error || 'Terjadi kesalahan pada data balasan.'}</Text>
      </div>
    );
  }

  // --- RENDER HASIL SUKSES ---
  const { prediction, narrative, xai } = apiData;

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Laporan Hasil Analisis & Prediksi Klinis</h2>
      
      {/* BOX 1: SUMMARY CARD */}
      <div className={styles.summaryGrid}>
        <Card className={styles.mainCard}>
          <CardHeader
            header={<Text weight="semibold">Status Prediksi Janin</Text>}
            description={
              <div style={{ marginTop: '8px' }}>
                <Text size={500} weight="bold" style={{ color: prediction.label_code === 0 ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1 }}>
                  {prediction.label}
                </Text>
              </div>
            }
          />
        </Card>

        <Card className={styles.mainCard}>
          <CardHeader
            header={<Text weight="semibold">Tingkat Risiko (Risk Level)</Text>}
            description={
              <div style={{ marginTop: '12px' }}>
                <Badge 
                  color={prediction.risk_level === 'LOW' ? 'success' : 'danger'} 
                  appearance="filled"
                  style={{ padding: '6px 12px', fontSize: '14px' }}
                >
                  {prediction.risk_level} RISK
                </Badge>
                <Text size={200} block style={{ marginTop: '6px', color: tokens.colorNeutralForeground2 }}>
                  Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </Text>
              </div>
            }
          />
        </Card>
      </div>

      {/* BOX 2: NARASI GEMINI */}
      {narrative?.narrative_available && (
        <>
          <div>
            <Text size={400} weight="semibold" block style={{ marginBottom: '8px' }}>
              Eksplanasi Klinis Medis (AI Generated)
            </Text>
            <div className={styles.narrativeBox}>
              <Text size={300}>{narrative.explanation}</Text>
            </div>
          </div>

          <div>
            <Text size={400} weight="semibold" block style={{ marginBottom: '8px' }}>
              Rekomendasi Tindakan Medis
            </Text>
            <div className={styles.recommendationBox}>
              <Text size={300} style={{ color: tokens.colorPaletteGreenForeground3 }}>
                {narrative.recommendation}
              </Text>
            </div>
          </div>
        </>
      )}

      {/* BOX 3: SHAP FEATURES */}
      <div>
        <Text size={400} weight="semibold" block>Faktor Pengaruh Klinis Teratas (SHAP)</Text>
        <div className={styles.featureList}>
          {xai.shap.top_features.slice(0, 5).map((feat: any) => {
            const isDecreasing = feat.direction === 'decreases_risk';
            return (
              <div key={feat.rank} className={styles.featureItem}>
                <div className={styles.featureInfo}>
                  <Text weight="semibold">{feat.description}</Text>
                  <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                    Nilai Pasien: <b>{feat.value}</b>
                  </Text>
                </div>
                <Badge color={isDecreasing ? 'success' : 'important'} appearance="tint">
                  {isDecreasing ? 'Menurunkan Risiko' : 'Meningkatkan Risiko'}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
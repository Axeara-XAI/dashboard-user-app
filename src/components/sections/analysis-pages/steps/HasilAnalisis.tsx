'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  makeStyles,
  tokens,
  Text,
  Badge,
  Card,
  CardHeader,
  Spinner,
  Divider,
} from '@fluentui/react-components';
import {
  ArrowRightRegular,
  CheckmarkCircleRegular,
  SparkleRegular,
  DataTrendingRegular,
  LightbulbRegular,
} from '@fluentui/react-icons';
import { AnalysisFormData } from '../../../../type/analysis';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  container: { display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: tokens.colorBrandForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  // --- BOX 1: SUMMARY GRID ---
  summaryGrid: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '16px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  },
  mainCard: { padding: '16px', boxShadow: tokens.shadow2, border: `1px solid ${tokens.colorNeutralStroke1}` },

  // --- CONFIDENCE BAR ---
  confidenceBarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '12px',
  },
  confidenceBarTrack: {
    height: '10px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: '9999px',
    overflow: 'hidden',
    width: '100%',
  },

  // --- BOX 2: NARASI GEMINI ---
  narrativeBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: '20px',
    borderRadius: tokens.borderRadiusMedium,
    borderLeft: `4px solid ${tokens.colorBrandStroke1}`,
    lineHeight: '1.6',
    textAlign: 'justify',
  },
  recommendationBox: {
    backgroundColor: tokens.colorPaletteLightGreenBackground2,
    padding: '20px',
    borderRadius: tokens.borderRadiusMedium,
    borderLeft: `4px solid ${tokens.colorPaletteGreenBackground3}`,
    lineHeight: '1.6',
    textAlign: 'justify',
  },

  // --- BOX 3: SHAP FEATURES ---
  featureList: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' },
  featureItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  featureInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },

  // --- BOX 4: DICE SCENARIOS ---
  diceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '16px',
    marginTop: '12px',
  },
  diceCard: {
    padding: '16px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
  },
  diceCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10px',
    borderBottom: `1px dashed ${tokens.colorNeutralStroke2}`,
  },
  diceReductionValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: '1',
  },
  diceChangeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusSmall,
    fontSize: '13px',
  },
  diceArrow: {
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
  },
  diceNewProb: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4px',
    paddingTop: '10px',
    borderTop: `1px dashed ${tokens.colorNeutralStroke2}`,
  },

  // --- LOADING STATE ---
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '24px',
    textAlign: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px dashed ${tokens.colorBrandStroke1}`,
    width: '100%',
  },
});

// ============================================================================
// HELPER: Pemetaan skala pendidikan UI (1-18) → skala AI (1-6)
// ============================================================================
const mapEducationToAiScale = (uiValue: number): number => {
  if (uiValue === 1) return 1;
  if (uiValue >= 2 && uiValue <= 7) return 2;
  if (uiValue >= 8 && uiValue <= 10) return 3;
  if (uiValue >= 11 && uiValue <= 13) return 4;
  if (uiValue >= 14 && uiValue <= 16) return 5;
  if (uiValue >= 17) return 6;
  return 1;
};

// ============================================================================
// HELPER: Mapping nama fitur ke label bahasa Indonesia yang lebih ramah
// ============================================================================
const FEATURE_LABEL_MAP: Record<string, string> = {
  HEMOGLOB: 'Hemoglobin (g/dL)',
  VISITS: 'Kunjungan ANC',
  GAINED: 'Kenaikan Berat Badan (kg)',
  CIGNUM: 'Rokok per Hari',
  DRINKNUM: 'Alkohol per Minggu',
  MAGE: 'Usia Ibu (Tahun)',
  anemia: 'Anemia',
  jantung: 'Penyakit Jantung',
  paru: 'Penyakit Paru',
  diabetes: 'Diabetes',
  ginjal: 'Penyakit Ginjal',
  hipertensi_kronis: 'Hipertensi Kronis',
  hipertensi_gestasional: 'Hipertensi Gestasional',
  eklamsia: 'Eklamsia',
  serviks: 'Masalah Serviks',
  rahim: 'Masalah Rahim',
};

const getFriendlyLabel = (featureName: string): string =>
  FEATURE_LABEL_MAP[featureName] ?? featureName;

// ============================================================================
// PROPS INTERFACE
// ============================================================================
interface StepProps {
  formData: AnalysisFormData;
  onApiDataLoaded?: (data: any) => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function HasilAnalisis({ formData, onApiDataLoaded }: StepProps) {
  const styles = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Mencegah double-fetch di React Strict Mode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchAnalysis = async () => {
      try {
        // Validasi dan sanitasi nilai hemoglobin
        let hbValue = parseFloat(formData.hemoglob);
        if (isNaN(hbValue) || hbValue < 4.0 || hbValue > 20.0) {
          hbValue = 12.0;
        }

        const safeNum = (val: any, min: number, max: number, defaultVal: number) => {
          let num = Number(val);
          if (isNaN(num)) num = defaultVal;
          if (num < min) return min;
          if (num > max) return max;
          return num;
        };

        const payload = {
          MARITAL: safeNum(formData.marital, 1, 2, 1),
          FAGE: safeNum(formData.fage, 10, 70, 25),
          GAINED: safeNum(formData.gained, 0, 100, 0),
          VISITS: safeNum(formData.visits, 0, 50, 0),
          MAGE: safeNum(formData.mage, 10, 55, 25),
          FEDUC: mapEducationToAiScale(formData.feduc_raw),
          MEDUC: mapEducationToAiScale(formData.meduc_raw),
          TOTALP: safeNum(formData.totalp, 0, 20, 0),
          BDEAD: safeNum(formData.bdead, 0, 10, 0),
          TERMS: 0,
          // LOUTCOME: nilai diskrit {1, 2, 9} — pastikan hanya nilai valid yang dikirim
          LOUTCOME: [1, 2, 9].includes(Number(formData.loutcome)) ? Number(formData.loutcome) : 9,
          RACEMOM: safeNum(formData.racemom, 0, 8, 0),
          RACEDAD: safeNum(formData.racedad, 0, 8, 0),
          HISPMOM: formData.hispmom === 'N' ? 0 : 1,
          HISPDAD: formData.hispdad === 'N' ? 0 : 1,
          CIGNUM: safeNum(formData.cignum, 0, 99, 0),
          DRINKNUM: safeNum(formData.drinknum, 0, 99, 0),
          PINFANT: safeNum(formData.pinfant, 0, 10, 0),
          PRETERM: safeNum(formData.preterm, 0, 10, 0),
          HYDRAM: formData.hydram ? 1 : 0,
          HEMOGLOB: hbValue,
          anemia: formData.anemia ? 1 : 0,
          jantung: formData.jantung ? 1 : 0,
          paru: formData.paru ? 1 : 0,
          diabetes: formData.diabetes ? 1 : 0,
          herpes: formData.herpes ? 1 : 0,
          ginjal: formData.ginjal ? 1 : 0,
          hipertensi_kronis: formData.hipertensi_kronis ? 1 : 0,
          hipertensi_gestasional: formData.hipertensi_gestasional ? 1 : 0,
          eklamsia: formData.eklamsia ? 1 : 0,
          serviks: formData.cervix ? 1 : 0,
          rahim: formData.uterine ? 1 : 0,
          RHSEN: formData.rhsen ? 1 : 0,
        };

        // Task 1 Fix: Gunakan environment variable, fallback ke Azure prod
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
          || 'https://axara-models-erdkdzd8a2bwhba8.southeastasia-01.azurewebsites.net';

        const response = await fetch(`${apiUrl}/api/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorDetail = await response.text();
          console.error('DETAIL ERROR API:', errorDetail);
          throw new Error(`Gagal (Status ${response.status}). Cek console browser untuk detailnya.`);
        }

        const data = await response.json();
        setApiData(data);

        if (onApiDataLoaded) {
          onApiDataLoaded(data);
        }
      } catch (err: any) {
        setError(err.message || 'Gagal menghubungi server AI AXARA.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [formData, onApiDataLoaded]);

  // ============================================================================
  // RENDER: LOADING
  // ============================================================================
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="huge" appearance="primary" />
        <div>
          <Text size={500} weight="semibold" block style={{ marginBottom: '8px' }}>
            Sistem AI Sedang Menganalisis...
          </Text>
          <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
            Harap tunggu. Komputasi matriks SHAP, skenario DiCE, dan penyusunan
            narasi medis oleh Gemini AI dapat memakan waktu beberapa detik.
          </Text>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: ERROR
  // ============================================================================
  if (error || !apiData || apiData.status !== 'success') {
    return (
      <div className={styles.loadingContainer} style={{ borderColor: tokens.colorPaletteRedBorder2 }}>
        <Text size={500} weight="bold" style={{ color: tokens.colorPaletteRedForeground1 }}>
          Analisis Gagal
        </Text>
        <Text>{error || 'Terjadi kesalahan saat memproses data.'}</Text>
      </div>
    );
  }

  // ============================================================================
  // RENDER: SUKSES
  // ============================================================================
  const { prediction, narrative, xai } = apiData;
  const probPercent = Math.round(prediction.probability_fgr * 100);
  const isHighRisk = prediction.risk_level === 'HIGH';
  const isMediumRisk = prediction.risk_level === 'MEDIUM';

  // Warna confidence bar berdasarkan risk level
  const barColor = isHighRisk
    ? tokens.colorPaletteRedBackground3
    : isMediumRisk
    ? tokens.colorPaletteMarigoldBackground3
    : tokens.colorPaletteGreenBackground3;

  const scenarios = xai?.counterfactual?.scenarios ?? [];

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>
        <DataTrendingRegular />
        Laporan Hasil Analisis &amp; Prediksi Klinis
      </h2>

      {/* ================================================================ */}
      {/* BOX 1: SUMMARY CARDS + CONFIDENCE BAR                           */}
      {/* ================================================================ */}
      <div className={styles.summaryGrid}>
        {/* Kartu Status Prediksi */}
        <Card className={styles.mainCard}>
          <CardHeader
            header={<Text weight="semibold">Status Prediksi Janin</Text>}
            description={
              <div style={{ marginTop: '8px' }}>
                <Text
                  size={500}
                  weight="bold"
                  style={{
                    color:
                      prediction.label_code === 0
                        ? tokens.colorPaletteGreenForeground1
                        : tokens.colorPaletteRedForeground1,
                  }}
                >
                  {prediction.label}
                </Text>
              </div>
            }
          />
        </Card>

        {/* Kartu Risk Level + Confidence Bar */}
        <Card className={styles.mainCard}>
          <CardHeader
            header={<Text weight="semibold">Tingkat Risiko (Risk Level)</Text>}
            description={
              <div style={{ marginTop: '8px' }}>
                <Badge
                  color={isHighRisk ? 'danger' : isMediumRisk ? 'warning' : 'success'}
                  appearance="filled"
                  style={{ padding: '6px 12px', fontSize: '14px' }}
                >
                  {prediction.risk_level} RISK
                </Badge>

                {/* Task 4: Confidence Bar */}
                <div className={styles.confidenceBarWrapper}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                      Probabilitas FGR
                    </Text>
                    <Text size={200} weight="semibold">
                      {probPercent}%
                    </Text>
                  </div>
                  <div className={styles.confidenceBarTrack}>
                    <div
                      style={{
                        height: '100%',
                        width: `${probPercent}%`,
                        backgroundColor: barColor,
                        borderRadius: '9999px',
                        transition: 'width 0.8s ease',
                      }}
                    />
                  </div>
                  <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                    {prediction.fgr_basis}
                  </Text>
                </div>
              </div>
            }
          />
        </Card>
      </div>

      {/* ================================================================ */}
      {/* BOX 2: NARASI GEMINI                                             */}
      {/* ================================================================ */}
      {narrative && (
        <>
          {/* Tangani jika backend mengirim narasi sebagai teks biasa (string) */}
          {typeof narrative === 'string' ? (
            <div>
              <Text size={400} weight="semibold" block style={{ marginBottom: '8px' }}>
                <span className={styles.sectionTitle}>
                  <SparkleRegular /> Eksplanasi Klinis Medis (AI Generated)
                </span>
              </Text>
              <div className={styles.narrativeBox}>
                <Text size={300}>{narrative}</Text>
              </div>
            </div>
          ) : (
            <>
              {narrative.explanation && (
                <div>
                  <p className={styles.sectionTitle}>
                    <SparkleRegular /> Eksplanasi Klinis Medis (AI Generated)
                  </p>
                  <div className={styles.narrativeBox}>
                    <Text size={300}>{narrative.explanation}</Text>
                  </div>
                </div>
              )}
              {narrative.recommendation && (
                <div>
                  <p className={styles.sectionTitle}>
                    <LightbulbRegular /> Rekomendasi Tindakan Medis
                  </p>
                  <div className={styles.recommendationBox}>
                    <Text size={300} style={{ color: tokens.colorPaletteGreenForeground3 }}>
                      {narrative.recommendation}
                    </Text>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ================================================================ */}
      {/* BOX 3: SHAP TOP FEATURES                                         */}
      {/* ================================================================ */}
      {xai?.shap?.top_features && (
        <div>
          <p className={styles.sectionTitle}>
            <DataTrendingRegular /> Faktor Pengaruh Klinis Teratas (SHAP)
          </p>
          <div className={styles.featureList}>
            {xai.shap.top_features.slice(0, 10).map((feat: any, index: number) => {
              const isDecreasing = feat.direction === 'decreases_risk';
              return (
                <div key={feat.rank ?? index} className={styles.featureItem}>
                  <div className={styles.featureInfo}>
                    <Text weight="semibold">{feat.description || feat.feature}</Text>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                      Nilai Pasien: <b>{feat.value}</b> &nbsp;|&nbsp; SHAP:{' '}
                      <b>{feat.shap_value?.toFixed(4)}</b>
                    </Text>
                  </div>
                  <Badge
                    color={isDecreasing ? 'success' : 'important'}
                    appearance="tint"
                  >
                    {isDecreasing ? '↓ Menurunkan Risiko' : '↑ Meningkatkan Risiko'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* BOX 4: DICE COUNTERFACTUAL SCENARIOS (Task 2)                    */}
      {/* ================================================================ */}
      {scenarios.length > 0 && (
        <div>
          <p className={styles.sectionTitle}>
            <CheckmarkCircleRegular /> Skenario Intervensi Klinis (DiCE Counterfactual)
          </p>
          <Text size={200} style={{ color: tokens.colorNeutralForeground2, marginBottom: '8px', display: 'block' }}>
            Berikut adalah skenario perubahan variabel yang dapat diintervensi untuk menurunkan risiko FGR.
            Semakin besar persentase penurunan risiko, semakin efektif intervensi tersebut.
          </Text>

          <div className={styles.diceGrid}>
            {scenarios.map((scenario: any) => (
              <div key={scenario.scenario_id} className={styles.diceCard}>

                {/* Header kartu: Nomor Skenario + Penurunan Risiko */}
                <div className={styles.diceCardHeader}>
                  <div>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      Skenario {scenario.scenario_id}
                    </Text>
                    <Text weight="semibold" block>
                      Intervensi Klinis
                    </Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                      Penurunan Risiko
                    </Text>
                    <p className={styles.diceReductionValue}>
                      -{scenario.risk_reduction_pct?.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Daftar perubahan variabel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {Object.entries(scenario.changes).map(([featureName, change]: [string, any]) => (
                    <div key={featureName} className={styles.diceChangeRow}>
                      <div style={{ flex: 1 }}>
                        <Text size={100} weight="semibold">
                          {getFriendlyLabel(featureName)}
                        </Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                          <Text size={100} style={{ color: tokens.colorPaletteRedForeground1, fontWeight: '600' }}>
                            {change.from}
                          </Text>
                          <ArrowRightRegular className={styles.diceArrow} style={{ fontSize: '12px' }} />
                          <Text size={100} style={{ color: tokens.colorPaletteGreenForeground1, fontWeight: '600' }}>
                            {change.to}
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer kartu: Probabilitas baru */}
                <div className={styles.diceNewProb}>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                    Probabilitas FGR baru:
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text size={200} weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {Math.round(scenario.new_probability_fgr * 100)}%
                    </Text>
                    <Badge color="success" appearance="filled" size="small">
                      {scenario.new_label}
                    </Badge>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pesan jika DiCE tidak menghasilkan skenario */}
      {scenarios.length === 0 && xai?.counterfactual && (
        <div style={{
          padding: '16px',
          backgroundColor: tokens.colorNeutralBackground2,
          borderRadius: tokens.borderRadiusMedium,
          border: `1px dashed ${tokens.colorNeutralStroke2}`,
        }}>
          <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
            Skenario DiCE tidak tersedia untuk kasus ini. Kemungkinan tidak ada perubahan variabel
            yang dapat menurunkan prediksi ke kelas Normal dengan batasan yang ditetapkan.
          </Text>
        </div>
      )}

    </div>
  );
}
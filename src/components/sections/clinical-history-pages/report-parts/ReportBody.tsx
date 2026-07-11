'use client';

import React from 'react';
import {
  makeStyles,
  tokens,
  Text,
  Badge,
  Card,
  CardHeader,
  Divider,
} from '@fluentui/react-components';
import {
  ArrowRightRegular,
  CheckmarkCircleRegular,
  SparkleRegular,
  DataTrendingRegular,
  LightbulbRegular,
} from '@fluentui/react-icons';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  container: { display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' },
  sectionTitle: {
    fontSize: '20px', // Setara dengan size=500
    fontWeight: 'bold',
    color: tokens.colorNeutralForeground1, // Bukan brand color agar sama dengan header lainnya
    borderBottom: 'none',
    paddingBottom: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  summaryGrid: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '16px',
  },
  mainCard: { 
    padding: '16px 0', 
    boxShadow: 'none', 
    border: 'none',
    backgroundColor: 'transparent'
  },

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

  narrativeBox: {
    backgroundColor: tokens.colorNeutralBackground1, // Use transparent/white instead of grey
    padding: '16px 0',
    borderRadius: '0',
    borderLeft: `4px solid ${tokens.colorBrandBackground}`,
    paddingLeft: '16px',
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

  diceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '16px',
    marginTop: '12px',
  },
  diceCard: {
    padding: '16px',
    border: `1px solid ${tokens.colorBrandStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground2,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
});

export interface ReportData {
  id: number;
  created_at: string;
  assessment_results: {
    risk_label: string;
    probability: number;
    narrative_explanation: string;
    narrative_recommendation: string;
  } | null;
  shap_explanations: Array<{
    feature_name: string;
    feature_value: number;
    shap_value: number;
    direction: string;
    rank_order: number;
  }>;
  dice_scenarios: Array<{
    scenario_number: number;
    new_probability_fgr: number;
    risk_reduction_pct: number;
    dice_changes: Array<{
      feature_name: string;
      original_value: number;
      new_value: number;
    }>;
  }>;
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function ReportBody({ data }: { data: ReportData }) {
  const styles = useStyles();

  if (!data.assessment_results) {
    return (
      <div className={styles.container}>
        <Text>Hasil analisis tidak ditemukan.</Text>
      </div>
    );
  }

  const { risk_label, probability, narrative_explanation, narrative_recommendation } = data.assessment_results;
  const shapExplanations = data.shap_explanations || [];
  const diceScenarios = data.dice_scenarios || [];

  // Konversi probability ke persen jika nilainya 0-1
  const probPercent = probability <= 1 ? probability * 100 : probability;
  
  const isHighRisk = risk_label === 'FGR';

  return (
    <div className={styles.container}>
      {/* --- BOX 1: Ringkasan Analisis --- */}
      <div className={styles.summaryGrid}>
        <div className={`${styles.mainCard} print-avoid-break`}>
          <div style={{ paddingBottom: '16px' }}>
            <Text weight="bold" size={500}>Tingkat Risiko FGR</Text><br/>
            <Text size={200} color="neutral">Berdasarkan model prediktif Gradient Boosting</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge 
              size="extra-large" 
              appearance="filled" 
              color={isHighRisk ? 'danger' : 'success'}
            >
              {isHighRisk ? 'Risiko Tinggi (FGR)' : 'Risiko Rendah (Non-FGR)'}
            </Badge>
            <Text size={500} weight="bold">{probPercent.toFixed(1)}%</Text>
          </div>

          <div className={styles.confidenceBarWrapper}>
            <div style={{ display: 'flex', justifyItems: 'space-between' }}>
              <Text size={200}>0%</Text>
              <span style={{flex: 1, textAlign: 'center'}}><Text size={200}>Batas (Threshold)</Text></span>
              <Text size={200}>100%</Text>
            </div>
            <div className={styles.confidenceBarTrack}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${probPercent}%`, 
                  backgroundColor: isHighRisk ? tokens.colorPaletteRedBackground3 : tokens.colorPaletteGreenBackground3,
                  transition: 'width 0.5s ease-in-out'
                }} 
              />
            </div>
          </div>
        </div>

        {/* --- BOX 2: Interpretasi Naratif AI --- */}
        <div className={`${styles.mainCard} print-avoid-break`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SparkleRegular style={{ color: tokens.colorPalettePurpleForeground2, fontSize: '24px' }} />
            <Text weight="bold" size={500}>Interpretasi AI Medis</Text>
          </div>
          <div className={styles.narrativeBox}>
            <Text>{narrative_explanation}</Text>
          </div>
        </div>
      </div>

      <Divider style={{ margin: '8px 0' }} />

      {/* --- BOX 3: Faktor Risiko Utama (SHAP) --- */}
      <div className="print-avoid-break" style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
        <h3 className={styles.sectionTitle}>
            <DataTrendingRegular style={{ color: tokens.colorPaletteBlueForeground2, fontSize: '24px' }} /> Faktor Risiko Utama (SHAP Feature Importance)
        </h3>
        <Text size={300} color="neutral">
          Berikut adalah 5 faktor klinis yang paling berkontribusi terhadap prediksi risiko di atas.
        </Text>

        <div className={styles.featureList}>
          {shapExplanations.slice(0, 5).map((feat, idx) => (
            <div key={idx} className={styles.featureItem} style={{ 
              borderLeft: `4px solid ${feat.direction === 'increases_risk' ? tokens.colorPaletteRedBackground3 : tokens.colorPaletteGreenBackground3}`
            }}>
              <div className={styles.featureInfo}>
                <Text weight="semibold">{feat.feature_name.toUpperCase()}</Text>
                <Text size={200} color="neutral">
                  Nilai Pasien: <strong>{feat.feature_value}</strong>
                </Text>
              </div>
              <Badge 
                appearance="tint" 
                color={feat.direction === 'increases_risk' ? 'danger' : 'success'}
              >
                {feat.direction === 'increases_risk' ? '↑ Menaikkan Risiko' : '↓ Menurunkan Risiko'} 
                ({Math.abs(feat.shap_value).toFixed(3)})
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* --- BOX 4: Saran Tindakan --- */}
      <Divider style={{ margin: '8px 0' }} />
      <div className="print-avoid-break" style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
        <h3 className={styles.sectionTitle}>
          <LightbulbRegular style={{ color: tokens.colorPaletteYellowForeground1, fontSize: '24px' }} /> Rekomendasi Tindakan
        </h3>
        <div className={styles.recommendationBox}>
          <Text>{narrative_recommendation}</Text>
        </div>

        {/* --- Skenario Alternatif (DiCE) --- */}
        {diceScenarios.length > 0 && (
          <>
            <Text size={300} color="neutral" style={{ marginTop: '8px' }}>
              Simulasi secara matematis menunjukkan bahwa risiko dapat diturunkan jika mencapai target berikut:
            </Text>

            <div className={styles.diceGrid}>
              {diceScenarios.map((scenario, sIdx) => (
                <div key={sIdx} className={`${styles.diceCard} print-avoid-break`} style={{ border: `1px dashed ${tokens.colorNeutralStroke1}`, boxShadow: 'none' }}>
                  <Text weight="semibold">Skenario Alternatif #{scenario.scenario_number}</Text>
                  <Divider />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {scenario.dice_changes.map((change, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowRightRegular style={{ color: tokens.colorBrandForeground1 }} />
                        <Text size={200}>
                          Ubah <strong>{change.feature_name.toUpperCase()}</strong> menjadi <strong>{change.new_value.toFixed(1)}</strong>
                        </Text>
                      </div>
                    ))}
                  </div>

                  <div style={{ 
                    marginTop: 'auto', 
                    padding: '8px', 
                    backgroundColor: tokens.colorPaletteGreenBackground1, 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CheckmarkCircleRegular style={{ color: tokens.colorPaletteGreenForeground1 }} />
                    <Text size={200} weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      Risiko turun menjadi {scenario.new_probability_fgr.toFixed(2)}%
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

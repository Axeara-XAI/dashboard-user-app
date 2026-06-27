'use client';

import React from 'react';
import { makeStyles, tokens, Button, Text, Card, CardHeader, CardPreview, Badge } from '@fluentui/react-components';
import { DocumentArrowDownRegular, CalendarLtrRegular, BeakerRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: '12px',
    marginBottom: '12px'
  },
  dateWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
  },
  contentGrid: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 2fr', 
    gap: '24px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  },
  resultBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: '16px',
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  probabilityText: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  narrativeText: {
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.5',
    textAlign: 'justify'
  },
  actionArea: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: `1px dashed ${tokens.colorNeutralStroke2}`,
  }
});

// Tipe data disesuaikan dengan struktur ERD
export interface AssessmentRecord {
  id: number;
  date: string;
  probability: number;
  riskLabel: string;
  narrative: string;
}

interface AssessmentListProps {
  assessments: AssessmentRecord[];
}

export default function AssessmentList({ assessments }: AssessmentListProps) {
  const styles = useStyles();

  const handleExportSession = (id: number, date: string, record: AssessmentRecord) => {
    // Buat konten HTML laporan medis untuk dicetak
    const printContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <title>Laporan Analisis AXARA — ${date}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
          h1 { font-size: 20px; margin-bottom: 4px; }
          .subtitle { color: #666; font-size: 13px; margin-bottom: 24px; }
          .section-title { font-size: 15px; font-weight: bold; margin: 20px 0 8px; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
          .info-row { display: flex; gap: 16px; margin-bottom: 8px; }
          .info-label { color: #555; min-width: 160px; font-size: 13px; }
          .info-value { font-weight: 600; font-size: 13px; }
          .risk-badge { display: inline-block; padding: 4px 14px; border-radius: 4px; font-size: 14px; font-weight: bold; }
          .risk-high { background: #fee2e2; color: #dc2626; }
          .risk-medium { background: #fef3c7; color: #d97706; }
          .risk-low { background: #dcfce7; color: #16a34a; }
          .narrative-box { background: #f8f8f8; border-left: 4px solid #0078d4; padding: 16px; border-radius: 4px; font-size: 13px; line-height: 1.7; text-align: justify; }
          .footer { margin-top: 40px; font-size: 11px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 16px; }
          @media print { body { padding: 16px; } }
        </style>
      </head>
      <body>
        <h1>🩺 Laporan Hasil Analisis Klinis AXARA</h1>
        <div class="subtitle">Dihasilkan oleh sistem AXARA XAI — ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>

        <div class="section-title">Informasi Pemeriksaan</div>
        <div class="info-row"><span class="info-label">Tanggal Pemeriksaan</span><span class="info-value">${date}</span></div>
        <div class="info-row"><span class="info-label">ID Asesmen</span><span class="info-value">#${id}</span></div>

        <div class="section-title">Hasil Prediksi AI</div>
        <div class="info-row">
          <span class="info-label">Status Prediksi</span>
          <span class="info-value">${record.riskLabel}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Probabilitas FGR</span>
          <span class="info-value">${record.probability}%</span>
        </div>
        <div class="info-row">
          <span class="info-label">Tingkat Risiko</span>
          <span class="risk-badge ${record.probability >= 70 ? 'risk-high' : record.probability >= 40 ? 'risk-medium' : 'risk-low'}">
            ${record.probability >= 70 ? 'HIGH RISK' : record.probability >= 40 ? 'MEDIUM RISK' : 'LOW RISK'}
          </span>
        </div>

        <div class="section-title">Eksplanasi Klinis (AI Generated)</div>
        <div class="narrative-box">${record.narrative || 'Narasi tidak tersedia.'}</div>

        <div class="footer">
          Dokumen ini dihasilkan secara otomatis oleh sistem AXARA XAI. 
          Seluruh informasi bersifat informatif dan tidak menggantikan diagnosis medis profesional.
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  return (
    <div className={styles.listContainer}>
      <Text size={500} weight="semibold" style={{ marginBottom: '8px' }}>Histori Pemeriksaan Kehamilan</Text>
      
      {assessments.map((record) => (
        <Card key={record.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.dateWrapper}>
              <CalendarLtrRegular />
              <Text>{record.date}</Text>
            </div>
            <Badge 
              color={record.riskLabel === 'FGR' ? 'danger' : 'success'}
              appearance="filled"
            >
              Status: {record.riskLabel}
            </Badge>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.resultBox}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BeakerRegular />
                <Text weight="semibold">Probabilitas FGR</Text>
              </div>
              <Text 
                className={styles.probabilityText}
                style={{ color: record.probability >= 50 ? tokens.colorPaletteRedForeground1 : tokens.colorPaletteGreenForeground1 }}
              >
                {record.probability}%
              </Text>
            </div>
            
            <div>
              <Text weight="semibold" style={{ display: 'block', marginBottom: '8px' }}>Kesimpulan Klinis AI:</Text>
              <Text className={styles.narrativeText}>
                {record.narrative}
              </Text>
            </div>
          </div>

          <div className={styles.actionArea}>
            <Button 
              appearance="outline" 
              icon={<DocumentArrowDownRegular />}
              onClick={() => handleExportSession(record.id, record.date, record)}
            >
              Unduh Laporan Medis (PDF)
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

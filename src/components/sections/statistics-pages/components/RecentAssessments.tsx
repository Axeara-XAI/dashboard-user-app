'use client';

import React from 'react';
import { makeStyles, tokens, Card, Title3, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  recentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '16px'
  },
  recentItem: {
    padding: '16px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  badgeFGR: {
    padding: '4px 8px',
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  badgeNormal: {
    padding: '4px 8px',
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground1,
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px'
  }
});

interface AssessmentItem {
  id: string | number;
  patientName: string;
  medicalRecordNumber: string;
  date: string;
  riskLabel: string;
  probability: number;
}

interface RecentAssessmentsProps {
  assessments: AssessmentItem[];
}

export default function RecentAssessments({ assessments }: RecentAssessmentsProps) {
  const styles = useStyles();

  return (
    <Card style={{ marginTop: '16px', padding: '24px' }}>
      <Title3>5 Analisis Terbaru</Title3>
      <div className={styles.recentList}>
        {assessments.length === 0 ? (
          <Text>Belum ada data analisis.</Text>
        ) : (
          assessments.map((item) => (
            <div key={item.id} className={styles.recentItem}>
              <div>
                <Text weight="bold" size={400} style={{ display: 'block' }}>{item.patientName}</Text>
                <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                  RM: {item.medicalRecordNumber} • {new Date(item.date).toLocaleString('id-ID')}
                </Text>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={item.riskLabel === 'FGR' ? styles.badgeFGR : styles.badgeNormal}>
                  {item.riskLabel === 'FGR' ? 'RISIKO TINGGI (FGR)' : 'RISIKO RENDAH (Non-FGR)'}
                </span>
                <Text size={300} style={{ display: 'block', marginTop: '4px', color: tokens.colorNeutralForeground3 }}>
                  Probabilitas: {(item.probability * 100).toFixed(1)}%
                </Text>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
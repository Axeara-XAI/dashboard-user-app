'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { makeStyles, tokens, Text, Card } from '@fluentui/react-components';
import {
  DataTrending24Regular,
  Clipboard24Regular,
  Box24Regular,
  Share24Regular,
  Headset24Regular,
} from '@fluentui/react-icons';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '32px',
    padding: '24px 32px 0 32px',
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '16px 16px 0 16px',
    },
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      gap: '12px',
    },
  },
  card: {
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    cursor: 'pointer',
    padding: '24px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow4,
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  iconWrapper: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    padding: '10px',
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: '16px',
    color: tokens.colorNeutralForeground1,
  },
  cardDescription: {
    fontSize: '15px',
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.4',
  },
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ServicesSection() {
  const styles = useStyles();
  const router = useRouter(); 

  // ==========================================================================
  // DATA PAYLOAD
  // ==========================================================================
  const services = [
    {
      name: 'Analisis Baru',
      icon: <DataTrending24Regular />,
      description: 'Lakukan analisis prediktif baru untuk deteksi risiko FGR berdasarkan data klinis ibu.',
      href: '/dashboard/analysis', 
    },
    {
      name: 'Riwayat Klinis',
      icon: <Clipboard24Regular />,
      description: 'Akses, kelola, dan pantau data rekam medis pasien terpadu secara detail.',
      href: '/dashboard/clinical-history',
    },
    {
      name: 'Riwayat Analisis',
      icon: <Box24Regular />,
      description: 'Log lengkap seluruh prediksi FGR yang pernah dilakukan di sistem.',
      href: '/dashboard/analysis-history',
    },
    {
      name: 'Statistik & Tren',
      icon: <Share24Regular />, 
      description: 'Pantau metrik performa, agregat pasien, dan sebaran prediksi risiko secara keseluruhan.',
      href: '/dashboard/statistisc',
    },
    {
      name: 'Panduan Klinis',
      icon: <Headset24Regular />,
      description: 'Referensi indikator medis, cara interpretasi model AI, dan pedoman diagnosis.',
      href: '/dashboard/guide',
    },
    {
      name: 'Tiket Bantuan',
      icon: <Headset24Regular />,
      description: 'Laporkan kendala teknis atau kirim pertanyaan langsung ke admin sistem.',
      href: '/dashboard/support-ticket',
    }
  ];

  // ==========================================================================
  // RENDER FUNCTION
  // ==========================================================================
  return (
    <div className={styles.container}>
      <Text className={styles.sectionTitle} as="h2">
        Layanan
      </Text>

      <div className={styles.grid}>
        {services.map((service, index) => (
          <Card
            key={index}
            className={styles.card}
            appearance="outline"
            onClick={() => router.push(service.href)} 
            role="button" 
            tabIndex={0} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(service.href);
              }
            }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <Text className={styles.cardTitle}>{service.name}</Text>
            </div>

            <Text className={styles.cardDescription}>
              {service.description}
            </Text>
          </Card>
        ))}
      </div>
    </div>
  );
}

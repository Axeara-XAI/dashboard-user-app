import React from 'react';
import { makeStyles, tokens, Text, Link, Card } from '@fluentui/react-components';
import { Sparkle20Filled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  bodyContainer: {
    flex: 1,
    padding: '24px 20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  greetingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  greetingText: {
    fontSize: '24px',
    fontWeight: '600',
  },
  introText: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.5',
  },
  promptsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '8px',
  },
  promptCard: {
    padding: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    boxShadow: tokens.shadow2,
  },
  promptText: {
    color: tokens.colorNeutralForeground1,
  }
});

interface AiBodyProps {
  userName: string;
}

export const AiBody: React.FC<AiBodyProps> = ({ userName }) => {
  const styles = useStyles();

  const suggestedPrompts = [
    "Ikuti perkembangan fitur medis terbaru di Axara.",
    "Buat uraian ringkasan data pasien minggu ini dalam tabel.",
    "Apa praktik terbaik untuk mengelola laporan analitik harian?",
    "Informasi terkini tentang rekomendasi AI diagnostik."
  ];

  return (
    <div className={styles.bodyContainer}>
      {/* Greeting */}
      <div className={styles.greetingContainer}>
        <Sparkle20Filled style={{ color: tokens.colorPaletteRedBorderActive, fontSize: '24px' }} />
        <span className={styles.greetingText}>Halo {userName}!</span>
      </div>

      {/* Intro Text */}
      <Text className={styles.introText}>
        Axara AI dapat membantu Anda menjawab pertanyaan, menyelesaikan tugas, serta menemukan dan memanfaatkan layanan analitik kami. <Link href="#">Pelajari selengkapnya</Link>
        <br/><br/>
        Siap menjelajah? Pilih salah satu saran di bawah ini untuk memulai.
      </Text>

      {/* Suggested Prompts */}
      <div className={styles.promptsContainer}>
        {suggestedPrompts.map((prompt, index) => (
          <Card key={index} className={styles.promptCard} appearance="outline">
            <Text className={styles.promptText}>{prompt}</Text>
          </Card>
        ))}
      </div>
    </div>
  );
};

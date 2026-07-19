import React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Dismiss24Regular, Bot24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: tokens.colorCompoundBrandStroke,
  },
  actionButtons: {
    display: 'flex',
    gap: '4px',
  }
});

interface AiHeaderProps {
  onClose: () => void;
}

export const AiHeader: React.FC<AiHeaderProps> = ({ onClose }) => {
  const styles = useStyles();

  return (
    <div className={styles.header}>
      <div className={styles.brandContainer}>
        <Bot24Regular style={{ color: tokens.colorCompoundBrandStroke }} />
        <div className={styles.brandTitle}>Axara AI</div>
      </div>
      <div className={styles.actionButtons}>
        {/* Placeholder untuk menu lain jika ada */}
        <Button 
          appearance="subtle" 
          icon={<Dismiss24Regular />} 
          shape="circular" 
          onClick={onClose} 
          aria-label="Tutup"
        />
      </div>
    </div>
  );
};

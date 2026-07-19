import React, { useState } from 'react';
import { makeStyles, tokens, Button, shorthands } from '@fluentui/react-components';
import { Add24Regular, Send24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  footerContainer: {
    padding: '16px 20px',
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: '24px',
    padding: '4px 8px',
    boxShadow: tokens.shadow2,
    transition: 'border-color 0.2s',
    '&:focus-within': {
      ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
    }
  },
  textInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '8px',
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground1,
    fontFamily: 'inherit',
    fontSize: '14px',
    resize: 'none',
    minHeight: '24px',
    maxHeight: '120px',
    overflowY: 'auto',
    '::placeholder': {
      color: tokens.colorNeutralForeground3,
    }
  },
  actionButton: {
    flexShrink: 0,
  }
});

export const AiFooter: React.FC = () => {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.footerContainer}>
      <div className={styles.inputWrapper}>
        <Button 
          appearance="subtle" 
          icon={<Add24Regular />} 
          shape="circular" 
          className={styles.actionButton}
          aria-label="Tambah Lampiran"
        />
        
        <textarea
          className={styles.textInput}
          placeholder="Saya ingin ..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={1}
        />

        {inputValue.trim().length > 0 && (
          <Button 
            appearance="subtle" 
            icon={<Send24Regular style={{ color: tokens.colorCompoundBrandStroke }} />} 
            shape="circular" 
            className={styles.actionButton}
            aria-label="Kirim"
          />
        )}
      </div>
    </div>
  );
};

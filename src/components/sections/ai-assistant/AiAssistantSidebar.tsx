import React, { useEffect, useState } from 'react';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { AiHeader } from './AiHeader';
import { AiBody } from './AiBody';
import { AiFooter } from './AiFooter';

const useStyles = makeStyles({
  overlay: {
    position: 'fixed',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 9998,
    transition: 'opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    opacity: '1',
  },
  overlayHidden: {
    opacity: '0',
    pointerEvents: 'none',
  },
  drawerRight: {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    width: '380px',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow64,
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    transform: 'translateX(0)',
    '@media (max-width: 480px)': {
      width: '100%',
    }
  },
  drawerHidden: {
    transform: 'translateX(100%)',
  },
});

interface AiAssistantSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const AiAssistantSidebar: React.FC<AiAssistantSidebarProps> = ({ isOpen, onClose, userName }) => {
  const styles = useStyles();
  
  // Mencegah scroll body saat sidebar terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className={mergeClasses(styles.overlay, !isOpen && styles.overlayHidden)} 
        onClick={onClose} 
        aria-hidden="true" 
      />
      <div 
        className={mergeClasses(styles.drawerRight, !isOpen && styles.drawerHidden)}
        role="dialog"
        aria-label="AI Assistant"
      >
        <AiHeader onClose={onClose} />
        <AiBody userName={userName} />
        <AiFooter />
      </div>
    </>
  );
};

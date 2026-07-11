'use client';

import React, { useState } from 'react';
import { makeStyles, tokens, Title3, Text, Input, Textarea, Button, Spinner } from '@fluentui/react-components';
import { Send24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }
});

interface TicketFormProps {
  onSubmit: (subject: string, message: string) => Promise<boolean>;
  isSubmitting: boolean;
}

export default function TicketForm({ onSubmit, isSubmitting }: TicketFormProps) {
  const styles = useStyles();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const success = await onSubmit(subject, message);
    if (success) {
      setSubject('');
      setMessage('');
    }
  };

  return (
    <div className={styles.formContainer}>
      <Title3>Kirim Tiket Baru</Title3>
      <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
        Jika Anda menemukan kendala teknis atau memiliki pertanyaan terkait aplikasi, kirimkan pesan ke admin.
      </Text>

      <div className={styles.inputGroup} style={{ marginTop: '16px' }}>
        <Text weight="semibold">Subjek</Text>
        <Input 
          placeholder="Contoh: Model gagal memprediksi data pasien A" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.inputGroup}>
        <Text weight="semibold">Pesan / Keluhan</Text>
        <Textarea 
          placeholder="Deskripsikan masalah Anda secara detail..." 
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <Button 
        appearance="primary" 
        icon={isSubmitting ? <Spinner size="tiny" /> : <Send24Regular />} 
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{ marginTop: '8px', width: 'fit-content' }}
      >
        Kirim Tiket
      </Button>
    </div>
  );
}
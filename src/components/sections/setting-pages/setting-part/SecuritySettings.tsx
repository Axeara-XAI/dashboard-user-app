import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  Text, 
  Input, 
  Label, 
  Button, 
  makeStyles,
  Spinner,
  MessageBar,
  MessageBarBody,
  MessageBarTitle
} from '@fluentui/react-components';

const useStyles = makeStyles({
  card: {
    marginBottom: '20px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '0 16px 16px 16px',
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  }
});

export const SecuritySettings: React.FC = () => {
  const styles = useStyles();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'mismatch'>('idle');

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setStatus('mismatch');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      setStatus('success');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0;

  return (
    <Card className={styles.card}>
      <CardHeader 
        header={<Text weight="semibold" size={400}>Keamanan Akun</Text>} 
        description={<Text size={200}>Ubah kata sandi Anda secara berkala demi keamanan.</Text>}
      />
      <div className={styles.formContainer}>
        {status === 'success' && (
          <MessageBar intent="success">
            <MessageBarBody>
              <MessageBarTitle>Berhasil</MessageBarTitle>
              Kata sandi berhasil diperbarui.
            </MessageBarBody>
          </MessageBar>
        )}
        {status === 'error' && (
          <MessageBar intent="error">
            <MessageBarBody>
              <MessageBarTitle>Gagal</MessageBarTitle>
              Terjadi kesalahan saat mengubah kata sandi. Pastikan sandi lama benar.
            </MessageBarBody>
          </MessageBar>
        )}
        {status === 'mismatch' && (
          <MessageBar intent="warning">
            <MessageBarBody>
              Konfirmasi kata sandi tidak cocok dengan kata sandi baru.
            </MessageBarBody>
          </MessageBar>
        )}

        <div className={styles.fieldRow}>
          <Label htmlFor="input-old-password">Kata Sandi Saat Ini</Label>
          <Input 
            id="input-old-password" 
            type="password" 
            value={oldPassword} 
            onChange={(e, data) => setOldPassword(data.value)} 
          />
        </div>

        <div className={styles.fieldRow}>
          <Label htmlFor="input-new-password">Kata Sandi Baru</Label>
          <Input 
            id="input-new-password" 
            type="password" 
            value={newPassword} 
            onChange={(e, data) => setNewPassword(data.value)} 
          />
        </div>

        <div className={styles.fieldRow}>
          <Label htmlFor="input-confirm-password">Konfirmasi Kata Sandi Baru</Label>
          <Input 
            id="input-confirm-password" 
            type="password" 
            value={confirmPassword} 
            onChange={(e, data) => setConfirmPassword(data.value)} 
          />
        </div>

        <div className={styles.buttonRow}>
          <Button 
            appearance="primary" 
            onClick={handleSave}
            disabled={isLoading || !isFormValid}
            icon={isLoading ? <Spinner size="tiny" /> : undefined}
          >
            Ubah Kata Sandi
          </Button>
        </div>
      </div>
    </Card>
  );
};

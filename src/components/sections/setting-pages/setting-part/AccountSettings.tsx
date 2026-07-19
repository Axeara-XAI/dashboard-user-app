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

interface AccountSettingsProps {
  initialName: string;
  email: string;
  role: string;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ initialName, email, role }) => {
  const styles = useStyles();
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsLoading(true);
    setStatus('idle');
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={styles.card}>
      <CardHeader 
        header={<Text weight="semibold" size={400}>Profil Pengguna</Text>} 
        description={<Text size={200}>Perbarui informasi dasar profil Anda.</Text>}
      />
      <div className={styles.formContainer}>
        {status === 'success' && (
          <MessageBar intent="success">
            <MessageBarBody>
              <MessageBarTitle>Berhasil</MessageBarTitle>
              Profil berhasil diperbarui.
            </MessageBarBody>
          </MessageBar>
        )}
        {status === 'error' && (
          <MessageBar intent="error">
            <MessageBarBody>
              <MessageBarTitle>Gagal</MessageBarTitle>
              Terjadi kesalahan saat memperbarui profil.
            </MessageBarBody>
          </MessageBar>
        )}

        <div className={styles.fieldRow}>
          <Label htmlFor="input-name">Nama Lengkap</Label>
          <Input 
            id="input-name" 
            value={name} 
            onChange={(e, data) => setName(data.value)} 
            placeholder="Masukkan nama Anda" 
          />
        </div>
        
        <div className={styles.fieldRow}>
          <Label htmlFor="input-email">Alamat Email</Label>
          <Input 
            id="input-email" 
            value={email} 
            disabled 
            title="Email tidak dapat diubah"
          />
        </div>

        <div className={styles.fieldRow}>
          <Label htmlFor="input-role">Peran (Role)</Label>
          <Input 
            id="input-role" 
            value={role} 
            disabled 
          />
        </div>

        <div className={styles.buttonRow}>
          <Button 
            appearance="primary" 
            onClick={handleSave}
            disabled={isLoading || name === initialName}
            icon={isLoading ? <Spinner size="tiny" /> : undefined}
          >
            Simpan Profil
          </Button>
        </div>
      </div>
    </Card>
  );
};

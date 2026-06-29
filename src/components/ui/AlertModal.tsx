'use client';

import React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';

// ============================================================================
// INTERFACE PROPS (Gabungan Notifikasi & Konfirmasi)
// ============================================================================
interface AlertModalProps {
  isOpen: boolean;
  
  // Props untuk Mode Notifikasi (Dipakai di Langkah 5 / Simpan)
  type?: 'success' | 'error' | 'info' | 'warning';
  message?: string;
  onClose?: () => void; 
  
  // Props untuk Mode Konfirmasi (Dipakai di Tombol Silang Header)
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isDanger?: boolean; 
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AlertModal(props: AlertModalProps) {
  
  // Deteksi otomatis: Jika ada prop onConfirm, berarti ini Modal Konfirmasi
  const isConfirmMode = !!props.onConfirm;

  // Fungsi universal untuk menutup modal
  const handleClose = () => {
    if (props.onClose) props.onClose();
    if (props.onCancel) props.onCancel();
  };

  // --------------------------------------------------------
  // RENDER 1: MODE KONFIRMASI (Untuk Tombol Silang Header)
  // --------------------------------------------------------
  if (isConfirmMode) {
    return (
      <Dialog 
        open={props.isOpen} 
        onOpenChange={(event, data) => { if (!data.open) handleClose(); }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{props.title || 'Konfirmasi'}</DialogTitle>
            <DialogContent>{props.content}</DialogContent>
            <DialogActions>
              <Button appearance="subtle" onClick={handleClose}>
                {props.cancelText || 'Batal'}
              </Button>
              <Button 
                appearance="primary" 
                onClick={props.onConfirm}
                style={props.isDanger ? { backgroundColor: '#d13438', color: '#ffffff' } : {}}
              >
                {props.confirmText || 'Ya'}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    );
  }

  // --------------------------------------------------------
  // RENDER 2: MODE NOTIFIKASI (Untuk Sukses/Gagal Simpan DB)
  // --------------------------------------------------------
  let modalTitle = 'Informasi';
  let titleColor = 'inherit';

  switch (props.type) {
    case 'success':
      modalTitle = 'Berhasil';
      titleColor = '#107c10'; // Hijau
      break;
    case 'error':
      modalTitle = 'Terjadi Kesalahan';
      titleColor = '#d13438'; // Merah
      break;
    case 'warning':
      modalTitle = 'Perhatian';
      titleColor = '#ffaa44'; // Oranye
      break;
  }

  return (
    <Dialog 
      open={props.isOpen} 
      onOpenChange={(event, data) => { if (!data.open) handleClose(); }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle style={{ color: titleColor }}>{modalTitle}</DialogTitle>
          <DialogContent>{props.message}</DialogContent>
          <DialogActions>
            <Button 
              appearance="primary" 
              onClick={handleClose}
              style={props.type === 'error' ? { backgroundColor: '#d13438', color: '#ffffff' } : {}}
            >
              Tutup
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}

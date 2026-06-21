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
// INTERFACE PROPS
// ============================================================================
interface AlertModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  // Opsi untuk mengubah warna tombol konfirmasi menjadi merah (untuk aksi berbahaya seperti hapus)
  isDanger?: boolean; 
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AlertModal({
  isOpen,
  title,
  content,
  confirmText = 'Ya',
  cancelText = 'Batal',
  onConfirm,
  onCancel,
  isDanger = false,
}: AlertModalProps) {
  return (
    <Dialog 
      open={isOpen} 
      // onOpenChange memastikan modal tertutup saat user klik area luar (backdrop) atau tekan ESC
      onOpenChange={(event, data) => {
        if (!data.open) onCancel();
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          
          <DialogContent>
            {content}
          </DialogContent>
          
          <DialogActions>
            <Button appearance="subtle" onClick={onCancel}>
              {cancelText}
            </Button>
            <Button 
              appearance={isDanger ? 'primary' : 'primary'} 
              style={isDanger ? { backgroundColor: '#d13438', color: '#ffffff' } : {}}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
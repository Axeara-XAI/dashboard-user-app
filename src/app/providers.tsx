'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { 
  createDOMRenderer, 
  RendererProvider, 
  FluentProvider,
  renderToStyleElements 
} from '@fluentui/react-components';

// 1. Perbaikan Path & Import: 
// Menggunakan relative path '../' dan mengimpor 'axaraLightTheme'
import { axaraLightTheme } from '../components/theme/AxaraTheme'; 

export function Providers({ children }: { children: React.ReactNode }) {
  // Membuat renderer tunggal untuk client-side
  const [renderer] = React.useState(() => createDOMRenderer());

  // Menyisipkan style Fluent UI ke dalam HTML Server-Side secara realtime
  useServerInsertedHTML(() => {
    return <>{renderToStyleElements(renderer)}</>;
  });

  return (
    <RendererProvider renderer={renderer}>
      {/* 2. Perbaikan Tema: Menggunakan axaraLightTheme */}
      <FluentProvider theme={axaraLightTheme}> 
        {children}
      </FluentProvider>
    </RendererProvider>
  );
}

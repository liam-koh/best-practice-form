import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const qc = new QueryClient();

export default function AppLayout({ children }) {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

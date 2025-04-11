import { queryClient } from '@/hooks/useDeliveryHooks';
import { QueryClientProvider } from '@tanstack/react-query';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

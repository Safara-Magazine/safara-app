'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/component.footer';
import Providers from '@/query/query.providers';
import ClientOnlyGlobalLoader from '@/components/ClientOnlyGlobalLoader';

export default function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/admin/dashboard');

  return (
    <>
      <ClientOnlyGlobalLoader />
      <Providers>{children}</Providers>
      {!isDashboard && <Footer />}
    </>
  );
}

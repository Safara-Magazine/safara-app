'use client';

import { useEffect, useState } from 'react';
import GlobalLoader from '@/components/global-loader';

export default function ClientOnlyGlobalLoader() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <GlobalLoader />;
}

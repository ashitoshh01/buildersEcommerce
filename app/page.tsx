
'use client';

import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Will be available soon

export default function Home() {
  const { activeRole } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    // Simulate redirection to the active role's dashboard
    router.push(`/${activeRole}`);
  }, [activeRole, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      <p className="text-slate-500">Redirecting to your workspace...</p>
    </div>
  );
}

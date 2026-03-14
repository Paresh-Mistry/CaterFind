"use client"

import { useState, useEffect } from 'react';
import type { Caterer, PaginationMeta, PlatformStats } from '@/types';
import { getPlatformStats } from '@/lib/api';


export function useStats() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    getPlatformStats()
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setIsLoading(false));
  }, []);
 
  return { stats, isLoading };
}
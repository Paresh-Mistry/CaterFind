"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Caterer, CatererFilters, PaginationMeta } from '@/types';
import { getCaterers } from '@/lib/api';
 
// ─── useCaterers ─────────────────────────────────────────────────────────────
 
interface UseCaterersReturn {
  caterers: Caterer[];
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCaterers(filters: Partial<CatererFilters>): UseCaterersReturn {
  const [caterers, setCaterers] = useState<Caterer[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchIdRef = useRef(0);
 
  const fetch = useCallback(async () => {
    const fetchId = ++fetchIdRef.current;
    setIsLoading(true);
    setError(null);
    try {
      const res = await getCaterers(filters);
      if (fetchId !== fetchIdRef.current) return; // stale
      setCaterers(res.data);
      setPagination(res.pagination ?? null);
    } catch (e) {
      if (fetchId !== fetchIdRef.current) return;
      setError(e instanceof Error ? e.message : 'Failed to load caterers');
    } finally {
      if (fetchId === fetchIdRef.current) setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);
 
  useEffect(() => { fetch(); }, [fetch]);
 
  return { caterers, pagination, isLoading, error, refetch: fetch };
}
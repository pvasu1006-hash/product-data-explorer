'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchProductDetail } from '../lib/api'
export function useProductDetail(url: string) {
  return useQuery(['product', url], () => fetchProductDetail(url), { staleTime: 1000*60*30 })
}

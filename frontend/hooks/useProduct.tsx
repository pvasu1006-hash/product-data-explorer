'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchProductDetail } from '../lib/api'

export function useProduct(url: string, opts?: any) {
  return useQuery(['product', url], () => fetchProductDetail(url), { enabled: Boolean(url) && (!opts || opts.enabled !== false), staleTime: 1000*60*30, ...opts })
}

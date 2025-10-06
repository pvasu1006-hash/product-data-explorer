'use client'
import { useState } from 'react'
import ProductForm from '../components/ProductForm'
import ProductCard from '../components/ProductCard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const qc = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={qc}>
      <div className="space-y-6">
        <p className="text-gray-700">Enter a product URL and fetch structured details (scraped).</p>
        <ProductForm />
      </div>
    </QueryClientProvider>
  )
}

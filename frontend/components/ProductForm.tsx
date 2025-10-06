'use client'
import { useState } from 'react'
import { useProduct } from '../hooks/useProduct'

export default function ProductForm() {
  const [url, setUrl] = useState('')
  const { data, isLoading, error, refetch } = useProduct(url, { enabled: false })

  return (
    <div className="p-4 bg-white rounded shadow">
      <label className="block mb-2 font-medium">Product URL</label>
      <div className="flex gap-2">
        <input value={url} onChange={e=>setUrl(e.target.value)} className="flex-1 p-2 border rounded" placeholder="https://example.com/product/123" />
        <button onClick={()=>refetch()} className="px-4 py-2 bg-blue-600 text-white rounded">Fetch</button>
      </div>
      <div className="mt-4">
        {isLoading && <div>Loading...</div>}
        {error && <div className="text-red-600">Error fetching data</div>}
        {data && <div className="mt-4"><ProductCard product={data.data} /></div>}
      </div>
    </div>
  )
}

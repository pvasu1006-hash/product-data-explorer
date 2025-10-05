'use client'
import Link from 'next/link'
export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="border rounded p-3 bg-white">
      <img src={product.image_url} alt={product.title} className="w-full h-40 object-cover mb-2" />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-sm mt-1">{product.price}</p>
      <div className="mt-3">
        <a className="text-blue-600" href={product.source_url} target="_blank">Open Source</a>
      </div>
    </div>
  )
}

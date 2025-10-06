'use client'
export default function ProductCard({ product }: { product: any }) {
  if (!product) return null
  return (
    <div className="border rounded p-4 bg-white">
      <img src={product.image || ''} alt={product.title || 'image'} className="w-full h-48 object-cover mb-2" />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-700">{product.price}</p>
      <p className="mt-2 text-sm">{product.description}</p>
      <a className="text-blue-600 mt-2 block" href={product.source_url} target="_blank" rel="noreferrer">Open original</a>
    </div>
  )
}

import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Welcome</h2>
      <p className="mb-4">This is a demo frontend for Product Data Explorer.</p>
      <Link href="/about" className="text-blue-600">About</Link>
    </div>
  )
}

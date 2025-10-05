import './globals.css'
export const metadata = { title: 'Product Data Explorer', description: 'Scraping demo' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white shadow">
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-semibold">Product Data Explorer</h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}

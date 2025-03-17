// src/app/blog/layout.tsx
import Header from '@/components/layout/header/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | ForkU',
  description: 'Latest news, updates and insights from the ForkU team',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>{children}</main>
    </div>
  )
}
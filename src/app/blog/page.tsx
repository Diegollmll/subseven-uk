import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/blogUtils'
import ClientBlogPage from '@/components/blog/ClientBlogPage'

export const metadata: Metadata = {
  title: 'Blog | ForkU',
  description: 'Latest news, updates and insights from the ForkU team',
}

export default async function BlogPage() {
  // Get blog posts on the server
  const blogPosts = await getAllBlogPosts()
  
  // Pass them as props to the client component
  return <ClientBlogPage blogPosts={blogPosts} />
}
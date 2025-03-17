import { getBlogPostBySlug } from '@/lib/blogUtils'
import { notFound } from 'next/navigation'
import ClientBlogPost from '@/components/blog/ClientBlogPost'
import { Metadata } from 'next'

// Define the params interface exactly as Next.js expects
interface Params {
  slug: string
}

// For generateMetadata
export async function generateMetadata({ 
  params 
}: { 
  params: Params 
}): Promise<Metadata> {
  try {
    const post = await getBlogPostBySlug(params.slug)
    return {
      title: `${post.title} | ForkU Blog`,
      description: post.excerpt,
    }
  } catch (error) {
    return {
      title: 'Blog Post | ForkU',
      description: 'ForkU blog post',
    }
  }
}

// For the page component
export default async function BlogPostPage({ 
  params
}: {
  params: Params
}) {
  try {
    // Get the blog post on the server
    const post = await getBlogPostBySlug(params.slug)
    
    // Pass it to the client component
    return <ClientBlogPost post={post} />
  } catch (error) {
    console.error(`Error loading blog post: ${params.slug}`, error)
    notFound()
  }
}
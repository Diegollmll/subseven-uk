import { getBlogPostBySlug } from '@/lib/blogUtils'
import { notFound } from 'next/navigation'
import ClientBlogPost from '@/components/blog/ClientBlogPost'
import { Metadata } from 'next'

type PageParams = {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
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

export default async function BlogPostPage({ params }: PageParams) {
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
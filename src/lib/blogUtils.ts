// src/lib/blogUtils.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

// Define the path to your blog content
const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');

// Define the BlogPost type
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: string;
  author: string;
  coverImage?: string;
  tags?: string[];
};

// Get all blog post slugs
export function getBlogPostSlugs(): string[] {
  console.log('Checking directory:', BLOG_DIRECTORY);
  
  // Create the directory if it doesn't exist
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    console.log('Blog directory does not exist, creating it');
    fs.mkdirSync(BLOG_DIRECTORY, { recursive: true });
    return [];
  }
  
  // Get all MDX files
  const files = fs.readdirSync(BLOG_DIRECTORY);
  console.log('Files in blog directory:', files);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
  console.log('Fetching blog post at path:', filePath);
  
  try {
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse the frontmatter
    const { data, content } = matter(fileContents);
    
    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min read`;
    
    // Serialize the MDX content
    const mdxSource = await serialize(content);
    
    // Build and return the blog post
    return {
      slug,
      content: content, // Keep using the raw content for now
      readingTime,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      author: data.author || 'ForkU Team',
      coverImage: data.coverImage || '',
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    throw error;
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  console.log('Getting all blog posts');
  
  try {
    const slugs = getBlogPostSlugs();
    console.log('Found slugs:', slugs);
    
    if (slugs.length === 0) {
      console.log('No blog posts found');
      return [];
    }
    
    // Get all blog posts and sort by date (newest first)
    const postsPromises = slugs.map(async (slug) => {
      try {
        return await getBlogPostBySlug(slug);
      } catch (error) {
        console.error(`Error processing blog post ${slug}:`, error);
        return null;
      }
    });
    
    const posts = (await Promise.all(postsPromises)).filter(post => post !== null) as BlogPost[];
    
    console.log(`Found ${posts.length} blog posts`);
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    return [];
  }
}
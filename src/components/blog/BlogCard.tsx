// src/components/blog/BlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { BlogPost } from '@/lib/blogUtils';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="block group rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-md"
    >
      {post.coverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          <span className="mx-2">•</span>
          <span>{post.readingTime}</span>
        </div>
        
        <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
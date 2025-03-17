// src/components/blog/BlogHeader.tsx

import Image from 'next/image';
import { format } from 'date-fns';
import type { BlogPost } from '@/lib/blogUtils';

interface BlogHeaderProps {
  post: BlogPost;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {post.title}
      </h1>
      
      <div className="flex items-center justify-center text-gray-500 mb-6">
        <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
        <span className="mx-2">•</span>
        <span>{post.readingTime}</span>
        <span className="mx-2">•</span>
        <span>{post.author}</span>
      </div>
      
      {post.coverImage && (
        <div className="relative h-64 md:h-96 w-full mt-8 mb-10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
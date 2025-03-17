'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/lib/blogUtils'
import OSHARulesContent from './blog-contents/OSHARulesContent'
import ForkUSafetyContent from './blog-contents/ForkUSafetyContent'
import ForkliftSafetyMistakesContent from './blog-contents/ForkliftSafetyMistakesContent'
import ForkliftOperatorsAssetContent from './blog-contents/ForkliftOperatorsAssetContent'
import OSHAComplianceContent from './blog-contents/OSHAComplianceContent'

interface ClientBlogPostProps {
  post: BlogPost
}

export default function ClientBlogPost({ post }: ClientBlogPostProps) {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    
    // Add dark background to the body when component mounts
    document.body.classList.add('bg-black')
    
    // Very aggressive approach to fix text colors
    const fixTextColors = () => {
      // Target all elements that might have text and force their color
      const elements = document.querySelectorAll('p, span, div, li, ul, ol, h1, h2, h3, h4, h5, h6, a, strong, em, b, i');
      elements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        const color = computedStyle.color;
        
        // If the color is dark (r, g, b all under 100), change it to light
        if (color.includes('rgb')) {
          const rgbValues = color.match(/\d+/g);
          if (rgbValues && (Number(rgbValues[0]) < 100 && Number(rgbValues[1]) < 100 && Number(rgbValues[2]) < 100)) {
            (el as HTMLElement).style.color = '#d1d5db'; // Light gray
          }
        }
        
        // If it's black text specifically
        if (color === 'rgb(0, 0, 0)' || color === '#000' || color === 'black') {
          (el as HTMLElement).style.color = '#d1d5db';
        }
      });
    };
    
    // Run once on mount
    fixTextColors();
    
    // Run again after content may have changed
    setTimeout(fixTextColors, 1000);
    
    // Clean up when component unmounts
    return () => {
      document.body.classList.remove('bg-black')
    }
  }, [])

  // Determine which blog content to render based on the slug
  const renderBlogContent = () => {
    switch (post.slug) {
      case 'osha-rules-quick':
        return <OSHARulesContent />;
      case 'forku-safety':
        return <ForkUSafetyContent />;
      case 'forklift-safety-mistakes':
        return <ForkliftSafetyMistakesContent />;
      case 'forklift-operators-asset':
        return <ForkliftOperatorsAssetContent />;
      case 'osha-compliance':
        return <OSHAComplianceContent />;
      default:
        // Fallback for any other blog post - render content as is
        return (
          <div 
            className="prose prose-invert prose-lg max-w-none blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        );
    }
  };

  return (
    <>
      {/* Force dark background styling and fix ALL text colors */}
      <style jsx global>{`
        /* First set global defaults */
        body {
          background-color: black !important;
          color: #d1d5db !important;
        }
        
        /* Then override ALL text elements */
        p, span, div, li, ul, ol, h1, h2, h3, h4, h5, h6, a, strong, em, b, i {
          color: #d1d5db !important;
        }
        
        /* Then apply specific styling to our blog content */
        .blog-content p,
        .blog-content span,
        .blog-content div,
        .blog-content li,
        .blog-content ul,
        .blog-content ol,
        .blog-content a,
        .blog-content em,
        .blog-content i {
          color: #d1d5db !important;
        }
        
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6,
        .blog-content strong,
        .blog-content b {
          color: #ffffff !important;
        }
        
        /* Ensure no black text slips through */
        [style*="color: black"],
        [style*="color:#000"],
        [style*="color: #000"],
        [style*="color:black"] {
          color: #d1d5db !important;
        }
        
        /* Make links stand out */
        .blog-content a {
          color: #39FF14 !important;
          text-decoration: underline;
        }
        
        /* Allow specific color classes to work */
        .text-red-400 {
          color: #f87171 !important;
        }
        
        .text-green-400 {
          color: #4ade80 !important;
        }
        
        /* Headings should be white for contrast */
        h1, h2, h3, h4, h5, h6 {
          color: white !important;
        }
        
        /* Format basic elements properly */
        .blog-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
          color: white !important;
        }
        
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white !important;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem 0;
          line-height: 1.3;
          color: white !important;
        }
        
        .blog-content p {
          margin: 1rem 0;
          line-height: 1.7;
          color: #d1d5db !important;
        }
        
        .blog-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        
        .blog-content li {
          margin: 0.5rem 0;
          line-height: 1.6;
          color: #d1d5db !important;
        }
        
        .blog-content strong,
        .blog-content b {
          font-weight: 600;
          color: white !important;
        }
        
        .blog-content em {
          font-style: italic;
          color: #d1d5db !important;
        }
      `}</style>
      
      <div className="min-h-screen pt-24 pb-20 bg-black">
        {/* Abstract background elements */}
        <div className="fixed inset-0 z-[-1] overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#FF1493]/10 to-transparent rounded-full blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-[#39FF14]/5 to-transparent rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-white hover:text-[#39FF14] transition-colors mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
          
          <article className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white title-font">
                {post.title}
              </h1>
              
              <div className="flex items-center text-gray-300 mb-6">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readingTime}</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-sm bg-zinc-800 rounded-full text-[#FF1493]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {post.coverImage && (
                <div className="relative h-64 sm:h-80 md:h-96 w-full mt-6 mb-10 rounded-2xl overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-zinc-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl mt-8 border border-zinc-800"
            >
              <div className="text-gray-300">
                {renderBlogContent()}
              </div>
              
              <div className="border-t border-zinc-700 mt-12 pt-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-medium text-white mb-2">About the author</h3>
                    <p className="text-gray-300">{post.author}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="bg-[#1da1f2]/10 hover:bg-[#1da1f2]/20 text-[#1da1f2] p-2 rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] p-2 rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                      </svg>
                    </button>
                    <button className="bg-[#171515]/10 hover:bg-[#171515]/20 text-white p-2 rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-12 text-center">
              <Link 
                href="/blog" 
                className="inline-block bg-zinc-800 hover:bg-[#FF1493] text-white px-6 py-3 rounded-full transition-colors duration-300 transform hover:scale-105"
              >
                View all articles
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
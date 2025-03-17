'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/lib/blogUtils'

interface ClientBlogPageProps {
  blogPosts: BlogPost[]
}

export default function ClientBlogPage({ blogPosts }: ClientBlogPageProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
    
    // Add dark background to the body when component mounts
    document.body.classList.add('bg-black')
    
    // Clean up when component unmounts
    return () => {
      document.body.classList.remove('bg-black')
    }
  }, [])
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <>
      {/* Force dark background styling */}
      <style jsx global>{`
        body {
          background-color: black !important;
          color: #d1d5db !important;
        }
      `}</style>
    
      <div className="min-h-screen pt-24 pb-20 bg-black">
        {/* Abstract background elements to match your site's style */}
        <div className="fixed inset-0 z-[-1] overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#FF1493]/10 to-transparent rounded-full blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-[#39FF14]/5 to-transparent rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white title-font">BLOG</h1>
            <div className="h-1 w-20 bg-[#FFFF00] mb-8"></div>
            <p className="text-gray-300 max-w-2xl text-lg">
              Stay updated with the latest news, insights, and developments from the ForkU team.
            </p>
          </motion.div>
          
          {blogPosts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="block h-full"
                  >
                    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden h-full transition-all duration-300 border border-zinc-800 hover:border-[#39FF14]/50 hover:shadow-[0_0_25px_rgba(57,255,20,0.15)]">
                      {post.coverImage && (
                        <div className="relative h-56 w-full overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-400 mb-3">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readingTime || '5 min read'}</span>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-semibold mb-3 text-white group-hover:text-[#FFFF00] transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-300 line-clamp-2 mb-4">{post.excerpt}</p>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4 mb-4">
                            {post.tags.map((tag) => (
                              <span 
                                key={tag}
                                className="px-3 py-1 text-xs bg-zinc-800 rounded-full text-[#FF1493]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-4 text-[#39FF14] font-medium flex items-center">
                          Read More
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-300 text-lg mb-4">No blog posts found.</p>
                <div className="h-1 w-20 bg-[#39FF14] mx-auto"></div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
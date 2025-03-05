'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-zinc-900 text-white overflow-hidden">
      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF1493]/50 to-transparent" />

      {/* Background Abstract */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#FF1493]/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-[#39FF14]/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[#FFFF00]/5 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Link href="/">
              <Image
                src={"/forkulogo.png"}
                alt="ForkU Logo"
                width={150}
                height={50}
                className="mb-4"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              From the leaders in forklift safety training and OSHA compliance.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-mono mb-6 text-[#FFFF00]">NAVIGATE</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-[#39FF14] transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#39FF14] transition-colors">
                  HOW IT WORKS
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:text-[#39FF14] transition-colors">
                  TRAINING
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#39FF14] transition-colors">
                  BLOG
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-mono mb-6 text-[#FFFF00]">SUPPORT</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/support" className="hover:text-[#39FF14] transition-colors">
                  CUSTOMER SUPPORT
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-[#39FF14] transition-colors">
                  YOUR ORDERS
                </Link>
              </li>
              <li>
                <Link href="/releases" className="hover:text-[#39FF14] transition-colors">
                  RELEASE NOTES
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Connect Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-mono mb-6 text-[#FFFF00]">CONNECT</h3>
            <ul className="space-y-4">
              <li>
                <Link href="https://www.instagram.com/forku.app/" className="hover:text-[#39FF14] transition-colors">
                  INSTAGRAM
                </Link>
              </li>
              <li>
                <Link href="https://www.tiktok.com/@forku.app" className="hover:text-[#39FF14] transition-colors">
                  X
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Download App Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF1493] text-white px-6 py-3 rounded-full font-mono hover:bg-[#39FF14] hover:text-black transition-colors"
            >
              DOWNLOAD FORKU APP
            </motion.button>
          </div>
        </motion.div>

        {/* Copyright and Credits */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 ForkU. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Designed & Developed by{" "}
              <Link 
                href="https://github.com/williamsanchez0721" 
                target="_blank" 
                className="text-[#FF1493] hover:text-[#39FF14] transition-colors"
              >
                William Lopez
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-3 h-3 bg-[#FF1493] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-2 h-2 bg-[#39FF14] rounded-full animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-[#FFFF00] rounded-full opacity-50 animate-pulse" />
    </footer>
  )
}

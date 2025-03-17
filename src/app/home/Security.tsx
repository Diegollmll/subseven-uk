'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Security() {
  return (
    <section className="relative bg-[#1C1C1E] py-0 overflow-hidden">
      <div className="px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-0 lg:px-0 gap-0 items-center">
          {/* Left Column - Content */}
          <div className="text-white space-y-8 max-w-2xl px-6 lg:pl-20 pt-20 order-2 lg:order-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl lg:text-[80px] font-bold leading-none tracking-tight title-font uppercase"
            >
              EASY
              COMPLIANCE <br />
              FINALLY
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg leading-relaxed max-w-lg"
            >
              Let&apos;s be real, OSHA compliance can be a mess. But not with ForkU. We make it simple to track your operator and vehicle safety. Certs, inspections, and records - all easy to manage. Stay up-to-date and keep your fleet running smoothly, without the stress.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='pb-20'
            >
              <Link href={'/blog/osha-compliance'} className="w-full hover:underline text-white text-lg font-medium">
                LEARN MORE ABOUT COMPLIANCE
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative px-0 w-full order-1 lg:order-2"
          >
            <div className="relative">
              <Image
                src="/manforku.jpg"
                alt="Forklift Operator using ForkU app"
                width={1920}
                height={1080}
                className="rounded-b-2xl object-cover object-center h-[500px] lg:h-screen w-full"
                priority
              />
              {/* Gradient Overlay */}
              
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1706] via-[#1d281d]/60 to-transparent rounded-b-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#FF1493]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#39FF14]/20 to-transparent" />
      </div>
    </section>
  )
}

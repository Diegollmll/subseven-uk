'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Zap, Shield, Clock, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'

// Definir los beneficios como un array para mejor mantenimiento
const benefits = [
  {
    icon: <Shield className="w-6 h-6 text-[#39FF14]" />,
    title: "OSHA Compliance Made Easy",
    description: "say goodbye to paperwork! Digital inspections and certification tracking keep businesses OSHA-ready.",
    delay: 0.1
  },
  {
    icon: <Zap className="w-6 h-6 text-[#39FF14]" />,
    title: "Reduce Accidents & Liability",
    description: "we've got your back with safety reporting and AI-driven analytics help identify risks before they become costly incidents.",
    delay: 0.2
  },
  {
    icon: <Clock className="w-6 h-6 text-[#39FF14]" />,
    title: "Cut Down on Equipment Downtime",
    description: "forklifts that keeps running! ForkU's pre-shift checklists & maintenance tracking prevent unexpected breakdowns.",
    delay: 0.3
  },
  {
    icon: <Award className="w-6 h-6 text-[#39FF14]" />,
    title: "Track Operator Certifications Automatically",
    description: "no more expired licenses or unknowing OSHA violations—ForkU sends alerts before certifications expire.",
    delay: 0.4
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-[#39FF14]" />,
    title: "Improve Operational Efficiency",
    description: "Digital reporting, safety alerts, and telematics insights boost overall productivity.",
    delay: 0.5
  }
];

export default function Why() {
  return (
    <section className="relative bg-zinc-900 py-0 overflow-hidden min-h-screen">
      {/* Background Abstract */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#FF1493]/40 to-transparent rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-[#32CD32]/20 to-transparent rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/60 via-[#FF1493]/5 to-transparent" />
        <div className="absolute inset-0 bg-[#FFFF00]/5 mix-blend-overlay" />
      </div>

      <div className="mx-auto px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="relative">
                <Image
                  src="/family.jpg"
                  alt="Forklift Operator"
                  width={1920}
                  height={1080}
                  className="object-cover object-center h-[500px] lg:h-screen w-full"
                  priority
                  unoptimized={true}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-[#FF1493]/10 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 px-6 md:px-16 pt-16 pb-16 order-2 lg:order-2 relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF1493]/5 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#39FF14]/5 rounded-full blur-xl"></div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <h2 className="text-5xl font-bold text-white title-font mb-2 tracking-tight">
                WHY <span className="text-[#FF1493]">FORK</span><span className="text-[#39FF14]">U</span>?
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#FF1493] to-[#39FF14] rounded mb-4"></div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-gray-300 leading-relaxed"
            >
              We believe in creating a safer workplace and ensuring <span className="text-[#39FF14] font-semibold">U</span> return home safely everyday. That&apos;s why we make things simple by offering:  
            </motion.p>
            
            {/* Benefits Cards - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: benefit.delay }}
                  className="group bg-zinc-800/30 backdrop-blur-sm rounded-lg p-5 hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-700/30 hover:border-[#39FF14]/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg shadow-lg group-hover:shadow-[#39FF14]/10 transition-all duration-300 shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#39FF14] transition-colors duration-300">{benefit.title}</h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 relative"
            >
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-[#FF1493]/20 to-[#39FF14]/20 blur-xl opacity-50 rounded-full"></div>
              <Link 
                href="/blog/compliance"
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF1493] to-[#39FF14] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#FF1493]/20 hover:scale-105"
              >
                Learn more about Compliance link to blog article.
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements - More dynamic and varied */}
      <div className="absolute top-1/4 left-10 w-3 h-3 bg-[#FF1493] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-2 h-2 bg-[#32CD32] rounded-full animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-[#FFFF00] rounded-full opacity-50 animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#FF1493] rounded-full animate-ping opacity-30" />
      <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-[#39FF14] rounded-full animate-ping opacity-30" />
    </section>
  )
}
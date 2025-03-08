'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import JoinWaitlistPopup from "@/components/JoinWaitlistPopup"
import { useState } from 'react'

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleOpenPopup = () => {
    setIsPopupOpen(true)
  }

  return (
    <section 
      className="min-h-[100svh] bg-zinc-900 relative overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Background Abstract */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#FF1493]/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-[#39FF14]/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[#FFFF00]/5 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            className="text-white space-y-4 sm:space-y-6 md:space-y-8 w-full order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold leading-tight sm:leading-none title-font"
              aria-label="The Safety Platform Built for Forklift"
            >
              THE SAFETY <br className="hidden sm:block" />
              PLATFORM <br className="hidden sm:block" />
              BUILT FOR <br className="hidden sm:block" />
              FORKLIFTS
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-gray-100 tracking-wide max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Safety Driven. U Focused.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="w-full sm:w-auto bg-[#FFFF00] text-zinc-900 px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-[#39FF14] transition-colors transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                onClick={handleOpenPopup}
                aria-label="Join the waitlist"
              >
                JOIN THE WAITLIST
              </button>
              {/* <button
                className="w-full sm:w-auto bg-white text-zinc-900 px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-[#FF1493] hover:text-white transition-colors transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                aria-label="Learn more about ForkU"
              >
                LEARN MORE
              </button> */}
            </div>
          </motion.div>
          
          <div className="relative order-1 lg:order-2 flex justify-center items-center">
            <motion.div 
              className="absolute w-full h-full bg-gradient-to-tr from-[#FFFF00]/20 to-[#39FF14]/20 rounded-full blur-3xl"
              aria-hidden="true"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              }}
            />
            
            <motion.div
              className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="relative"
              >
                <Image 
                  src="/mobile2.png" 
                  alt="ForkU mobile application interface showing safety tracking features"
                  width={320}
                  height={320}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
                
                {/* Destellos */}
                <motion.div
                  className="absolute -top-8 -right-8 w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full blur-xl opacity-50"
                  aria-hidden="true"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-4 -left-4 w-10 sm:w-12 h-10 sm:h-12 bg-green-400 rounded-full blur-xl opacity-50"
                  aria-hidden="true"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <JoinWaitlistPopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} />
    </section>
  )
}

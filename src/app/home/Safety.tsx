'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import JoinWaitlistPopup from '@/components/JoinWaitlistPopup'

export default function Safety() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const handleOpenPopup = () => {
        setIsPopupOpen(true)
    }
    return (
        <section 
        id="safety"
        className="relative min-h-screen bg-zinc-900 py-0 overflow-hidden"
        style={{ 
            backgroundImage: "linear-gradient(to top, rgba(24, 24, 27, 0.9), rgba(24, 24, 27, 0.3)), linear-gradient(to right, rgba(255, 20, 147, 0.1), rgba(57, 255, 20, 0.1)), url('/driverforklift.jpg')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
        }}
        >
            {/* Background Abstract */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#FF1493]/20 to-transparent rounded-full blur-[100px]" />
                <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-[#39FF14]/10 to-transparent rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/80 via-zinc-900/50 to-transparent" />
                <div className="absolute inset-0 bg-[#FFFF00]/5 mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-6 md:px-16 pb-32 relative z-10 min-h-screen flex items-end">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-8"
                    >
                        <h2 className="text-7xl 2xl:text-8xl font-bold text-white title-font leading-none">
                            U DRIVE <span className="text-[#FF1493]"> SAFETY</span>
                        </h2>

                        <div className="flex flex-wrap gap-4 pt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 2xl:px-12 2xl:py-4 text-lg 2xl:text-xl rounded-full bg-[#FF1493] text-white font-medium hover:bg-[#39FF14] hover:text-black transition-colors"
                                onClick={handleOpenPopup}
                            >
                                JOIN THE WAITLIST
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-10 w-3 h-3 bg-[#FF1493] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-2 h-2 bg-[#39FF14] rounded-full animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-[#FFFF00] rounded-full opacity-50 animate-pulse" />

            {isPopupOpen && <JoinWaitlistPopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} />}
        </section>
    )
}

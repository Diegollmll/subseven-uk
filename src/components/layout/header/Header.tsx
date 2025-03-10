'use client'
import NavLink from './NavLink'
// import ShoppingCart from '@/components/ui/cart/ShoppingCart'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import JoinWaitlistPopup from "@/components/JoinWaitlistPopup"
import Image from 'next/image'
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const router = useRouter()

    const handleOpenPopup = () => {
        setIsPopupOpen(true)
    }

    const handleScroll = useCallback(() => {
        const scrolled = window.scrollY > 10
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled)
        }
    }, [isScrolled])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-transparent py-2 md:py-6 md:px-10`}>
            <div className="container mx-auto px-2 md:px-6 flex items-center justify-between relative z-[60]">
                {isScrolled ? (
                    <div className="flex items-center gap-2 bg-white rounded-full p-3 w-12 h-12">
                        <Image
                            src={"/logos/forkulogoublack.png"}
                            alt="Logo"
                            width={120}
                            height={120}
                            className={`w-full max-w-20 md:max-w-24`}
                            loading="eager"
                            onClick={() => router.push('/')}
                        />
                    </div>
                ) : (
                    <Image
                        src={"/logos/forkulogowhite.png"}
                        alt="Logo"
                        width={120}
                        height={120}
                        className={`w-full max-w-20 md:max-w-28`}
                        loading="eager"
                        onClick={() => router.push('/')}
                    />
                )}

                <div className="flex items-center gap-2 md:gap-8">
                    <button 
                        className="bg-[#FFFF00] text-zinc-900 px-4 md:px-8 py-2.5 rounded-full font-medium hover:bg-[#39FF14] transition-colors duration-200 transform hover:scale-105 active:scale-95"
                        onClick={handleOpenPopup}
                    >
                        JOIN NOW
                    </button>
                    {/* <ShoppingCart /> */}
                    <button
                        className="bg-white text-zinc-900 p-2 rounded-full hover:bg-[#FF1493] hover:text-white transition-colors duration-200 transform hover:scale-105 active:scale-95"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-zinc-900/95 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Background Abstract */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#FF1493]/20 to-transparent rounded-full blur-[100px]" />
                            <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-[#39FF14]/10 to-transparent rounded-full blur-[100px]" />
                            <div className="absolute inset-0 bg-[#FFFF00]/5 mix-blend-overlay" />
                        </div>

                        <div className="container mx-auto px-6 py-24 h-screen relative z-10">
                            <div className="flex flex-col h-full">
                                <div className="flex-1 flex justify-center items-center">
                                    <NavLink />
                                </div>

                                {/* <motion.div 
                                    className="absolute right-6 bottom-8"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center rounded-xl gap-6 bg-white">
                                        <button className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-xl font-medium transition-colors duration-200">
                                            DOWNLOAD
                                            <span className="block text-xs text-gray-600 mt-1">SUBSEVEN APP</span>
                                        </button>
                                        <Image
                                            src="/qrcode.svg"
                                            alt="QR Code"
                                            width={100}
                                            height={100}
                                            className="w-32 h-32 bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
                                        />
                                    </div>
                                </motion.div> */}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <JoinWaitlistPopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} />
        </header>
    )
}
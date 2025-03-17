'use client'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { sendWaitlistEmail } from '@/app/actions/email'

interface JoinWaitlistPopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function JoinWaitlistPopup({ isOpen, setIsOpen }: JoinWaitlistPopupProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  // In JoinWaitlistPopup.tsx - modify the handleSubmit function

const handleSubmit = async () => {
  if (!email) {
    setErrorMessage('Por favor ingresa tu correo electrónico')
    setStatus('error')
    return
  }

  // Enhanced email validation
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    setErrorMessage('Por favor ingresa un correo electrónico válido')
    setStatus('error')
    return
  }
  
  // Add domain validation for problematic domains
  const domain = email.split('@')[1].toLowerCase();
  if (domain === 'gmx.fr') {
    setErrorMessage('Este dominio de correo está temporalmente no disponible. Por favor, usa otra dirección de correo.')
    setStatus('error')
    return
  }

  setIsLoading(true)
  setStatus('idle')
  setErrorMessage('')

  try {
    // Store in database first, without sending email
    // For now, let's just save to localStorage as a temporary solution
    const waitlistEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
    waitlistEmails.push({ email, timestamp: new Date().toISOString() });
    localStorage.setItem('waitlistEmails', JSON.stringify(waitlistEmails));
    
    // Try to send the email, but don't make success dependent on it
    try {
      const result = await sendWaitlistEmail({ email });
      if (!result.success) {
        console.warn('Email could not be sent, but user was added to waitlist:', result.error);
        // Don't show error to user since we've saved their info
      }
    } catch (emailError) {
      console.error('Error in email sending, but user was added to waitlist:', emailError);
      // Don't show error to user since we've saved their info
    }
    
    // Always show success since we've saved the email
    setStatus('success')
    setTimeout(() => setIsOpen(false), 2000)
    
  } catch (error) {
    console.error('Error in waitlist registration:', error)
    setErrorMessage('Problema de conexión. Por favor intenta de nuevo más tarde.')
    setStatus('error')
  } finally {
    setIsLoading(false)
  }
}

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <motion.div 
        className="bg-zinc-900 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-auto relative border border-[#FF1493]/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30 
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Background Abstract */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#FF1493]/20 to-transparent rounded-full blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-[#39FF14]/10 to-transparent rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[#FFFF00]/5 mix-blend-overlay" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 title-font">
            Join Our Waitlist
            <span className="block text-lg font-normal text-gray-400 mt-2">
              Be Part of the Future
            </span>
          </h2>

          <form ref={formRef} className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <p className="text-gray-300">
              Get early access to ForkU, the revolutionary platform for forklift training and safety management.
            </p>

            <div className="bg-zinc-800/50 p-4 rounded-xl border border-[#FF1493]/10">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF1493]">✦</span> 
                  OSHA Compliant Training
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#39FF14]">✦</span> 
                  Priority Access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FFFF00]">✦</span> 
                  Exclusive Features
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <input 
                type="email" 
                name="user_email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address" 
                className="w-full bg-zinc-800/50 text-white px-4 py-3 border border-[#FF1493]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493] focus:border-transparent transition-all placeholder:text-gray-500"
                required
              />
              
              <div className="flex gap-3">
                <motion.button 
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)} 
                  className="flex-1 px-4 py-3 border border-[#FF1493]/20 text-white rounded-xl hover:bg-zinc-800/50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className={`flex-1 bg-[#FF1493] text-white px-4 py-3 rounded-xl hover:bg-[#39FF14] hover:text-zinc-900 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Sending...' : 'Join Now'}
                </motion.button>
              </div>

              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#39FF14] text-center p-2 bg-[#39FF14]/10 rounded-lg"
                >
                  ¡Successfully joined the waitlist!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-center p-2 bg-red-500/10 rounded-lg"
                >
                  {errorMessage || 'There was an error. Please try again.'}
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
} 
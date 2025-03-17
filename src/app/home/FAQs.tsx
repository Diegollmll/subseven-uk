'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "WHAT'S FORKU ALL ABOUT AND WHO'S IT FOR?",
    answer: "ForkU is a tool that makes forklift safety and OSHA compliance a breeze. It's for forklift and material handling equipment (MHE) operators, and any business wanting to boost safety, meet regulations, and get the best out of their operators."
  },
  {
    question: "HOW DOES FORKU HELP IMPROVE SAFETY?",
    answer: "It's like having a safety sidekick! ForkU helps catch potential hazards before they become big issues. We're talking stuff like tracking equipment maintenance, flagging areas that need attention, and sending real-time alerts if something's off. Basically, it's about making the routine tasks easy and spotting the little things to prevent the big mishaps, making your workplace safer for everyone."
  },
  {
    question: "WHEN IS IT AVAILABLE?",
    answer: "We're still in the testing stage with a few early fans. If you think ForkU could be a game-changer for your business and you're up for giving us some real-world feedback, shoot us an email at hello@forku.app  We'd love to hear from you!"
  },
  {
    question: "CAN MY EMPLOYER USE FORKU ACROSS A TEAM OR FACILITY?",
    answer: "Yes. We’re piloting business tools to help supervisors deploy ForkU to teams and view performance trends. Reach out if you’re interested at hello@forku.app,"
  },
  {
    question: "CAN I TRACK MY OWN SAFETY PERFORMANCE?",
    answer: "Yes, ForkU includes personal dashboards so you can see your progress, completed training, safety streaks, certifications and more."
  },
  {
    question: "I HAVE AN IDEA OR WANT TO KNOW MORE, HOW DO I GET IN TOUCH?",
    answer: "We’d love to hear from U. Reach out to us anytime at hello@forku.app, and our team will be in touch.."
  }
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative bg-zinc-900 py-32 overflow-hidden">
      {/* Background Abstract */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#FF1493]/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-[#39FF14]/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/80 via-zinc-900/50 to-transparent" />
        <div className="absolute inset-0 bg-[#FFFF00]/5 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-6">
        <div className='flex flex-col items-center justify-center'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-bold mb-16 text-white title-font"
          >
            FAQ
          </motion.h2>
          <div className="space-y-4 w-full max-w-2xl">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left py-6 border-b border-white/20 flex justify-between items-center group"
                >
                  <span className="text-lg font-mono tracking-tight text-white">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl text-white font-mono transform group-hover:text-[#FF1493]"
                  >
                    +
                  </motion.span>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="py-6 text-gray-300 text-lg">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      {/* <div className="absolute top-1/4 left-10 w-3 h-3 bg-[#FF1493] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-2 h-2 bg-[#39FF14] rounded-full animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-[#FFFF00] rounded-full opacity-50 animate-pulse" /> */}
    </section>
  )
}
"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useLandingStore } from './store'
import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Overlay() {
    const { sceneIndex, nextScene } = useLandingStore()
    const router = useRouter()

    useEffect(() => {
        // Auto-advance scenes for demo purposes (or use scroll/click later)
        // For now, let's make it click-based or timer-based
        const timer = setInterval(() => {
            if (sceneIndex < 6) {
                nextScene()
            }
        }, 5000) // 5 seconds per scene

        return () => clearInterval(timer)
    }, [sceneIndex, nextScene])

    const texts = [
        { title: "Learning is chaotic.", subtitle: "Careers are uncertain." }, // 0
        { title: "The User", subtitle: "Potential vs Reality" }, // 1 - This will be visualized
        { title: "SKILLVECTOR", subtitle: "Intelligence Activated" }, // 2
        { title: "Analyzing Market Data", subtitle: "Real-time Demand Signals" }, // 3
        { title: "Generating Path", subtitle: "Your Career Vectorized" }, // 4
        { title: "Accelerating", subtitle: "Momentum Built" }, // 5
        { title: "Direction beats effort.", subtitle: "Stop guessing. Start progressing." } // 6
    ]

    const currentText = texts[sceneIndex] || texts[texts.length - 1]

    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={sceneIndex}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-4 font-mono">
                        {currentText.title}
                    </h1>
                    <p className="text-xl text-gray-400 tracking-widest uppercase">
                        {currentText.subtitle}
                    </p>
                </motion.div>
            </AnimatePresence>

            {sceneIndex === 6 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-20 pointer-events-auto"
                >
                    <button
                        onClick={() => router.push('/signup')}
                        className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full transition-all duration-300"
                    >
                        <span className="text-lg tracking-wide">START PROGRESSING</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            )}

            {/* Progress Bar or Indicators */}
            <div className="absolute bottom-10 left-10 flex gap-2">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${i <= sceneIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                    />
                ))}
            </div>
        </div>
    )
}

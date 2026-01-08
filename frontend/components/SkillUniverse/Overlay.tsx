"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useSkillStore } from './store'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Overlay() {
    const { sceneIndex, nextScene } = useSkillStore()
    const router = useRouter()

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Clear existing timer on any change to prevent stacking
        if (timerRef.current) clearTimeout(timerRef.current)

        const times = [
            6000,
            5000,
            5000,
            6000,
            10000
        ]

        if (sceneIndex < 4) {
            timerRef.current = setTimeout(() => {
                nextScene()
            }, times[sceneIndex])
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [sceneIndex, nextScene])

    const content = [
        {
            main: "There are 13,994,945,945 skills in the world.",
            sub: "Overwhelming complexity."
        },
        {
            main: "You don't need all of them.",
            sub: "Focus is power."
        },
        {
            main: "You need the right ones.",
            sub: "For your goals. For your industry."
        },
        {
            main: "Aligned with real-time job market intelligence.",
            sub: "Signal vs Noise."
        },
        {
            header: "SKILLVECTOR",
            main: "Your career, precisely aligned.",
            sub: "Generate your learning path"
        }
    ]

    const currentContent = content[sceneIndex]

    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-white mix-blend-difference">

            {/* Background Masking - ensuring text readability is paramount */}
            {/* We can use a subtle gradient behind text if needed, but 'mix-blend-difference' might be cool with white text over grey skills */}

            <AnimatePresence mode="wait">
                <motion.div
                    key={sceneIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="text-center px-4"
                >
                    {sceneIndex === 4 && (
                        <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] mb-8 text-gray-300">
                            {currentContent.header}
                        </h2>
                    )}

                    <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-6 leading-tight font-sans">
                        {currentContent.main}
                    </h1>

                    {currentContent.sub && (
                        <p className="text-lg md:text-xl text-gray-400 font-mono tracking-widest uppercase">
                            {currentContent.sub}
                        </p>
                    )}

                    {sceneIndex === 4 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-12 pointer-events-auto"
                        >
                            <button
                                onClick={() => router.push('/signup')}
                                className="group bg-white text-black px-10 py-5 rounded-none text-lg tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-4 mx-auto"
                            >
                                <span>GENERATE PATH</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className={`h-[2px] bg-white transition-all duration-500 ${i <= sceneIndex ? 'w-12 opacity-100' : 'w-4 opacity-30'}`}
                    />
                ))}
            </div>
        </div>
    )
}

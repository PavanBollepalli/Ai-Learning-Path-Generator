"use client"

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { SkillCloud } from './SkillCloud'
import { useSkillStore } from './store'
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

function Scene() {
    return (
        <>
            <color attach="background" args={['#F5F5F0']} />
            {/* Fog to hide the edges and create depth */}
            <fog attach="fog" args={['#F5F5F0', 5, 25]} />

            {/* SkillCloud removed per user request to fix overlay issues */}
            {/* <SkillCloud /> */}

            {/* <EffectComposer disableNormalPass>
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={0.5} />
            </EffectComposer> */}
        </>
    )
}

export default function SkillUniverseExperience() {
    const setIsLoaded = useSkillStore((state) => state.setIsLoaded)

    useEffect(() => {
        setIsLoaded(true)
    }, [setIsLoaded])

    return (
        <div className="w-full h-screen bg-black">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white font-mono tracking-widest text-xs">LOADING UNIVERSE...</div>}>
                <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
                    <Scene />
                </Canvas>
            </Suspense>
        </div>
    )
}

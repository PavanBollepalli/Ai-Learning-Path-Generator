"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import { ChaosField } from './Scenes/ChaosField'
import { UserAvatar } from './Scenes/UserAvatar'
import { IntelligenceNetwork } from './Scenes/IntelligenceNetwork'
import { VectorPath } from './Scenes/VectorPath'
import { useLandingStore } from './store'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

function Scene() {
    const sceneIndex = useLandingStore((state) => state.sceneIndex)

    return (
        <>
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 10, 50]} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Scene 0 & 1: Chaos */}
            {sceneIndex >= 0 && <ChaosField />}

            {/* Scene 2 & 3: User Avatar */}
            <UserAvatar />

            {/* Scene 4: Intelligence Network */}
            <IntelligenceNetwork />

            {/* Scene 5 & 6: Vector Path */}
            <VectorPath />


            {/* Post Processing */}
            {/* Note: Postprocessing might need separate install or careful handling, omitting for basic setup first if issues arise */}
        </>
    )
}

export default function CinematicLanding() {
    return (
        <div className="w-full h-screen bg-black">
            <Suspense fallback={<div className="text-white text-center pt-20">Loading Skillvector...</div>}>
                <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
                    <Scene />
                    {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /> */}
                </Canvas>
            </Suspense>
        </div>
    )
}

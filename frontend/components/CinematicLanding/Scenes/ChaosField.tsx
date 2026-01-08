"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLandingStore } from '../store'

export function ChaosField() {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const count = 1000
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate random positions and velocities
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle

            // Update time
            t = particle.t += speed / 2

            // Chaotic movement
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.setScalar(s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()

            meshRef.current?.setMatrixAt(i, dummy.matrix)
        })

        meshRef.current.instanceMatrix.needsUpdate = true
    })

    // Fade out logic when scene changes could go here or be handled by parent
    const sceneIndex = useLandingStore((state) => state.sceneIndex)

    // Minimal visibility logic - if scene is past 1 (User Appears), we might fade this out or keep it as background
    // For now, let's keep it visible but maybe push it back or fade opacity

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
                color="#888888"
                transparent
                opacity={0.6}
                roughness={0.5}
                metalness={0.8}
                emissive="#222222"
            />
        </instancedMesh>
    )
}

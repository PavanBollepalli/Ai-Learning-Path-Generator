"use client"

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useLandingStore } from '../store'
import * as THREE from 'three'

export function UserAvatar() {
    const meshRef = useRef<THREE.Mesh>(null)
    const sceneIndex = useLandingStore((state) => state.sceneIndex)

    // Only visible from Scene 1 onwards
    const visible = sceneIndex >= 1

    useFrame((state) => {
        if (!meshRef.current) return

        const t = state.clock.getElapsedTime()
        meshRef.current.position.y = Math.sin(t) * 0.2

        // Scale animation based on visibility or scene logic
        if (visible) {
            meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        } else {
            meshRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.1)
        }
    })

    return (
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={[0, 0, 0]}>
            <MeshDistortMaterial
                color={sceneIndex >= 2 ? "#ffffff" : "#444444"}
                emissive={sceneIndex >= 2 ? "#aaaaaa" : "#000000"}
                distort={0.4}
                speed={2}
                roughness={0.2}
            />
        </Sphere>
    )
}

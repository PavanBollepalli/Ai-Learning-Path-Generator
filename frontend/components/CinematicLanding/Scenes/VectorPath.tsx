"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { CatmullRomCurve3, Vector3 } from 'three'
import { Tube, Sphere } from '@react-three/drei'
import { useLandingStore } from '../store'
import * as THREE from 'three'

export function VectorPath() {
    const sceneIndex = useLandingStore((state) => state.sceneIndex)
    const tubeRef = useRef<THREE.Mesh>(null)

    // Scene 5 & 6
    const visible = sceneIndex >= 5
    // Progress happens in Scene 6
    const progressing = sceneIndex >= 6

    const curve = useMemo(() => {
        return new CatmullRomCurve3([
            new Vector3(0, 0, 0),
            new Vector3(0, 2, -5),
            new Vector3(2, 3, -10),
            new Vector3(-2, 4, -20),
            new Vector3(0, 5, -30),
        ])
    }, [])

    useFrame((state) => {
        if (!tubeRef.current) return
        const material = tubeRef.current.material as THREE.MeshStandardMaterial

        if (visible) {
            material.opacity = THREE.MathUtils.lerp(material.opacity, 1, 0.05)
        } else {
            material.opacity = THREE.MathUtils.lerp(material.opacity, 0, 0.1)
        }

        if (progressing) {
            // Simple UV offset effect to simulate movement
            if (material.map) material.map.offset.x -= 0.01
        }
    })

    return (
        <group>
            <Tube ref={tubeRef} args={[curve, 64, 0.2, 8, false]}>
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#0088ff"
                    transparent
                    opacity={0}
                    wireframe={sceneIndex < 6}
                />
            </Tube>

            {/* Modules along the path */}
            {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
                const pos = curve.getPoint(t)
                return (
                    <Sphere key={i} position={pos} args={[0.4]} visible={visible}>
                        <meshStandardMaterial
                            color={progressing && i < 2 ? "#00ff00" : "#ffffff"}
                            emissive={progressing && i < 2 ? "#00ff00" : "#0044ff"}
                            emissiveIntensity={2}
                        />
                    </Sphere>
                )
            })}
        </group>
    )
}

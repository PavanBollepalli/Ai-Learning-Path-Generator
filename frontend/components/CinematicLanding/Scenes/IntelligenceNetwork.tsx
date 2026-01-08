"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Sphere } from '@react-three/drei'
import { useLandingStore } from '../store'
import * as THREE from 'three'

export function IntelligenceNetwork() {
    const sceneIndex = useLandingStore((state) => state.sceneIndex)
    const groupRef = useRef<THREE.Group>(null)

    // Only visible from Scene 3 onwards (Skillvector Activates / AI Layer)
    const visible = sceneIndex >= 3

    const nodes = useMemo(() => {
        return new Array(20).fill(0).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 5
            )
        }))
    }, [])

    const lines = useMemo(() => {
        const l = []
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (nodes[i].position.distanceTo(nodes[j].position) < 4) {
                    l.push([nodes[i].position, nodes[j].position])
                }
            }
        }
        return l
    }, [nodes])

    useFrame((state) => {
        if (!groupRef.current) return
        const t = state.clock.getElapsedTime()
        groupRef.current.rotation.y = t * 0.05

        if (visible) {
            groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05)
        } else {
            groupRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.1)
        }
    })

    return (
        <group ref={groupRef} scale={[0, 0, 0]}>
            {nodes.map((node, i) => (
                <Sphere key={i} position={node.position} args={[0.05]}>
                    <meshBasicMaterial color="#00ffff" />
                </Sphere>
            ))}
            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line}
                    color="#0088ff"
                    transparent
                    opacity={0.2}
                    lineWidth={1}
                />
            ))}
        </group>
    )
}

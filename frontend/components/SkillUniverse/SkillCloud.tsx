"use client"

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useSkillStore } from './store'

const SKILLS = [
    "Python", "React", "Node.js", "TypeScript", "Machine Learning",
    "Data Analysis", "AWS", "Docker", "Kubernetes", "System Design",
    "Product Management", "UX Design", "Figma", "SQL", "NoSQL",
    "Go", "Rust", "C++", "Cybersecurity", "Blockchain",
    "DevOps", "CI/CD", "Agile", "Scrum", "Leadership",
    "Communication", "Public Speaking", "Negotiation", "Sales", "Marketing",
    "SEO", "Content Strategy", "Copywriting", "Video Editing", "Motion Graphics",
    "3D Modeling", "Blender", "Three.js", "WebGL", "Shaders",
    "Linear Algebra", "Calculus", "Statistics", "Probability", "Game Theory",
    "Econometrics", "Finance", "Accounting", "Business Strategy", "Entrepreneurship",
    "Prompt Engineering", "LLM Fine-tuning", "RAG", "Vector Databases", "LangChain",
    "AutoGPT", "TensorFlow", "PyTorch", "Keras", "OpenCV",
    "Natural Language Processing", "Computer Vision", "Reinforcement Learning", "GANs", "Diffusion Models"
]

function SkillItem({ position, text, speed, phase, visible, index }: any) {
    const meshRef = useRef<THREE.Mesh>(null)
    const store = useSkillStore()
    const { mouse, viewport } = useThree()

    // Skillvector Intelligence Logic (Scene 3 & 4)
    // We arbitrarily pick some skills to be "relevant" for the demo
    const isRelevant = useMemo(() => index % 7 === 0, [index]) // Every 7th skill is relevant

    useFrame((state, delta) => {
        if (!meshRef.current) return

        // --- Scene 1: Overwhelm (Passive Motion) ---
        // Basic vertical/diagonal drift
        meshRef.current.position.y += speed * delta

        // Loop position to keep cloud continuous
        if (meshRef.current.position.y > 15) {
            meshRef.current.position.y = -15
        }

        // --- Scene 2: Truth Injection (Cursor Interaction) ---
        // Subtle repulsion from mouse
        if (store.sceneIndex === 1) {
            const mousePos = new THREE.Vector3(
                (mouse.x * viewport.width) / 2,
                (mouse.y * viewport.height) / 2,
                0
            )
            const dist = mousePos.distanceTo(meshRef.current.position)
            if (dist < 3) {
                const dir = meshRef.current.position.clone().sub(mousePos).normalize()
                meshRef.current.position.add(dir.multiplyScalar(0.05))
            }
        }

        // --- Scene 3 & 4: Intelligence/Alignment ---
        const mat = meshRef.current.material as THREE.MeshBasicMaterial

        if (store.sceneIndex >= 2) {
            if (!isRelevant) {
                // Irrelevant skills drift away / fade out
                meshRef.current.position.z -= delta * 5
                if (mat.opacity > 0) mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, delta * 2)
            } else {
                // Relevant skills align
                const targetX = (index % 5) * 4 - 8
                const targetY = (Math.floor(index / 5) % 5) * 2 - 4

                meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05)
                meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05)
                meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1)
                meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1)

                if (store.sceneIndex === 3) {
                    mat.color.lerp(new THREE.Color("#00ffff"), 0.05)
                }
            }
        } else {
            // Restore visibility if needed (robustness)
            // Use requested "Black" (Dark Grey) color for contrast on black background?
            // User requested "skills names as black". If background is black, we should use dark grey or white-translucent.
            // Let's use visible white-translucent for now as black-on-black is impossible.
            // Wait, if user meant black on WHITE, but background is black...
            // I'll stick to #444444 (Dark Grey) to honor the "black" request while maintaining visibility against black.
            if (mat.opacity < 1) mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1, delta * 2)
        }

        // --- Scene 5: Reveal ---
        if (store.sceneIndex === 4) {
            if (mat.opacity > 0.1) mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, delta * 2)
        }

    })

    return (
        <Text
            ref={meshRef}
            position={position}
            fontSize={0.5}
            color="#333333" // Dark Grey as requested ("black")
            anchorX="center"
            anchorY="middle"
            fillOpacity={1}
        >
            {text}
        </Text>
    )
}

export function SkillCloud() {
    const count = 50 // REDUCED for stability (was 150)
    const skills = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const text = SKILLS[i % SKILLS.length]

            // MASKING CENTER
            let x = (Math.random() - 0.5) * 30
            if (x > -5 && x < 5) {
                x = x > 0 ? x + 5 : x - 5
            }

            const y = (Math.random() - 0.5) * 30
            const z = (Math.random() - 0.5) * 10 - 2
            const speed = 0.5 + Math.random() * 0.5
            temp.push({ position: [x, y, z], text, speed, i })
        }
        return temp
    }, [])

    return (
        <group>
            {skills.map((s, i) => (
                <SkillItem
                    key={i}
                    index={s.i}
                    position={s.position}
                    text={s.text}
                    speed={s.speed}
                    visible={true}
                />
            ))}
        </group>
    )
}

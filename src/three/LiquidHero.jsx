import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import { useMousePosition, usePrefersReducedMotion, useIsMobile } from "./usePortfolio3D";

/**
 * LiquidCore — sophisticated water-inspired abstract object.
 * - Icosahedron with slow vertex distortion (liquid feel)
 * - Soft studio lighting, restrained physical material
 * - Slow float + gentle rotation, subtle mouse parallax
 * - Never spins aggressively, never distracts from text
 */
const LiquidCore = ({ reduced, isMobile }) => {
    const meshRef = useRef();
    const rimRef = useRef();
    const mouse = useMousePosition();

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        const d = Math.min(delta, 0.05);

        if (meshRef.current) {
            // Gentle rotation — very slow
            meshRef.current.rotation.y += d * (reduced ? 0 : 0.08);
            meshRef.current.rotation.x = Math.sin(t * 0.18) * 0.12;
            // Subtle mouse parallax with heavy damping
            const tx = mouse.current.x * 0.18;
            const ty = -mouse.current.y * 0.12;
            meshRef.current.position.x += (tx - meshRef.current.position.x) * d * 1.6;
            meshRef.current.position.y += (ty - meshRef.current.position.y) * d * 1.6;
        }
        if (rimRef.current) {
            rimRef.current.rotation.y -= d * (reduced ? 0 : 0.05);
            rimRef.current.rotation.z = Math.sin(t * 0.15) * 0.08;
        }
    });

    return (
        <group>
            {/* Key + rim + fill: soft, restrained */}
            <ambientLight intensity={0.55} />
            <directionalLight position={[4, 5, 4]} intensity={1.15} color="#dfe6ff" />
            <directionalLight position={[-5, -2, -3]} intensity={0.3} color="#6366f1" />
            <pointLight position={[0, 2.5, 3]} intensity={6} color="#818cf8" distance={9} />

            <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.9}>
                <mesh ref={meshRef} scale={isMobile ? 0.9 : 1.05}>
                    <icosahedronGeometry args={[1.35, 48]} />
                    <MeshDistortMaterial
                        color="#2b3350"
                        roughness={0.22}
                        metalness={0.65}
                        distort={reduced ? 0 : 0.32}
                        speed={reduced ? 0 : 1.4}
                        transparent
                        opacity={0.96}
                    />
                </mesh>
            </Float>

            {/* Thin water-rim shell for depth */}
            <mesh ref={rimRef} scale={(isMobile ? 0.9 : 1.05) * 1.28}>
                <icosahedronGeometry args={[1.35, 1]} />
                <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.07} depthWrite={false} />
            </mesh>

            {/* Soft grounding shadow */}
            <ContactShadows position={[0, -2.1, 0]} opacity={0.4} scale={9} blur={2.6} far={4} color="#05060c" />
        </group>
    );
};

/**
 * LiquidHeroCanvas — lazy, adaptive, mobile-aware.
 * Desktop: full liquid object. Mobile: static / simplified.
 */
const LiquidHeroCanvas = () => {
    const reduced = usePrefersReducedMotion();
    const isMobile = useIsMobile(768);

    if (reduced) return null;

    return (
        <Canvas
            dpr={[1, isMobile ? 1.25 : 1.6]}
            camera={{ position: [0, 0.4, 5.2], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ background: "transparent" }}
        >
            <Suspense fallback={null}>
                <LiquidCore reduced={reduced} isMobile={isMobile} />
            </Suspense>
        </Canvas>
    );
};

export default LiquidHeroCanvas;

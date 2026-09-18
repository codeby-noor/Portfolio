import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition, usePrefersReducedMotion, useIsMobile } from "./usePortfolio3D";

/**
 * PREMIUM DIGITAL CORE — Hero 3D Scene
 * 
 * A smooth futuristic "digital core" made from:
 * - particles
 * - curves
 * - thin wireframe geometry
 * - subtle translucent surfaces
 * - soft light
 * - depth
 * - procedural deformation
 * 
 * Idle: slow breathing/morphing
 * Mouse: subtle parallax
 * Fast scroll: slightly stronger deformation
 * Slow scroll: returns to calm state
 */

// Generate points along a distorted sphere/torus hybrid for the core
const useCoreGeometry = (particleCount) => {
    return useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const basePositions = new Float32Array(particleCount * 3);
        const offsets = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const t = (i / particleCount) * Math.PI * 2;
            const phi = Math.acos(2 * (i / particleCount) - 1);
            const theta = t * 3;

            // Layered sphere with subtle distortion
            const r = 1.6 + Math.sin(t * 5) * 0.12 + Math.sin(phi * 3) * 0.08;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta) * 0.85;
            const z = r * Math.cos(phi) * 0.9;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            basePositions[i * 3] = x;
            basePositions[i * 3 + 1] = y;
            basePositions[i * 3 + 2] = z;

            offsets[i] = Math.random() * Math.PI * 2;
        }

        return { positions, basePositions, offsets };
    }, [particleCount]);
};

// Generate wireframe sphere geometry
const useWireframeGeometry = () => {
    return useMemo(() => {
        const geo = new THREE.SphereGeometry(1.7, 24, 16);
        return geo;
    }, []);
};

// Generate curve paths for the core
const useCurvePaths = () => {
    return useMemo(() => {
        const paths = [];
        for (let i = 0; i < 3; i++) {
            const points = [];
            const segments = 40;
            for (let j = 0; j <= segments; j++) {
                const t = (j / segments) * Math.PI * 2;
                const radius = 1.4 + i * 0.25;
                const x = radius * Math.cos(t);
                const y = radius * Math.sin(t) * 0.6;
                const z = Math.sin(t * 2 + i) * 0.3;
                points.push(new THREE.Vector3(x, y, z));
            }
            const curve = new THREE.CatmullRomCurve3(points);
            const curvePoints = curve.getPoints(60);
            const positions = new Float32Array(curvePoints.length * 3);
            curvePoints.forEach((p, idx) => {
                positions[idx * 3] = p.x;
                positions[idx * 3 + 1] = p.y;
                positions[idx * 3 + 2] = p.z;
            });
            paths.push({ positions, count: curvePoints.length });
        }
        return paths;
    }, []);
};

// Inner translucent core shell
const CoreShell = ({ reduced }) => {
    const ref = useRef();
    const wireRef = useRef();
    const wireGeo = useWireframeGeometry();

    useFrame((state, delta) => {
        if (reduced) return;
        if (ref.current) {
            // Slow breathing
            const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
            ref.current.scale.setScalar(breathe);
            ref.current.rotation.y += delta * 0.05;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
        if (wireRef.current) {
            wireRef.current.rotation.y -= delta * 0.03;
            wireRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
        }
    });

    return (
        <group>
            {/* Translucent inner surface */}
            <mesh ref={ref}>
                <sphereGeometry args={[1.5, 32, 24]} />
                <meshPhysicalMaterial
                    color="#111318"
                    transparent
                    opacity={0.12}
                    roughness={0.2}
                    metalness={0.8}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Wireframe outer shell */}
            <mesh ref={wireRef} geometry={wireGeo}>
                <meshBasicMaterial
                    color="#4f7cff"
                    wireframe
                    transparent
                    opacity={0.08}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
};

// Particle field forming the digital core
const CoreParticles = ({ count, reduced }) => {
    const ref = useRef();
    const { positions, basePositions, offsets } = useCoreGeometry(count);
    const mouse = useMousePosition();

    useFrame((state, delta) => {
        if (reduced) return;
        if (!ref.current) return;

        const time = state.clock.elapsedTime;
        const attr = ref.current.geometry.attributes.position;
        const arr = attr.array;

        // Scroll-based deformation
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        const scrollFactor = Math.min(scrollY / 2000, 1);

        for (let i = 0; i < count; i++) {
            const idx = i * 3;
            const baseX = basePositions[idx];
            const baseY = basePositions[idx + 1];
            const baseZ = basePositions[idx + 2];

            // Breathing + scroll deformation
            const breathe = 1 + Math.sin(time * 0.6 + offsets[i]) * 0.04;
            const scrollDeform = 1 + scrollFactor * 0.15 * Math.sin(time * 0.8 + offsets[i] * 2);

            // Mouse parallax
            const parallaxX = mouse.current.x * 0.08;
            const parallaxY = mouse.current.y * 0.05;

            arr[idx] = baseX * breathe * scrollDeform + parallaxX;
            arr[idx + 1] = baseY * breathe * scrollDeform + parallaxY;
            arr[idx + 2] = baseZ * breathe * scrollDeform;
        }

        attr.needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.035}
                color="#7c8cff"
                transparent
                opacity={0.7}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Curve paths around the core
const CoreCurves = ({ reduced }) => {
    const paths = useCurvePaths();
    const refs = useRef([]);

    useFrame((state) => {
        if (reduced) return;
        refs.current.forEach((ref, i) => {
            if (!ref) return;
            ref.rotation.y += state.clock.getDelta() * (0.1 + i * 0.05);
            ref.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.08;
        });
    });

    return (
        <group>
            {paths.map((path, i) => (
                <group key={i} ref={(el) => (refs.current[i] = el)}>
                    <line>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" count={path.count} array={path.positions} itemSize={3} />
                        </bufferGeometry>
                        <lineBasicMaterial
                            color={i === 0 ? "#4f7cff" : "#7c8cff"}
                            transparent
                            opacity={0.25 - i * 0.05}
                            depthWrite={false}
                        />
                    </line>
                </group>
            ))}
        </group>
    );
};

// Ambient accent particles
const AccentParticles = ({ count, reduced }) => {
    const ref = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2.2 + Math.random() * 1.2;
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            arr[i * 3 + 2] = r * Math.cos(phi);
        }
        return arr;
    }, [count]);

    useFrame((state) => {
        if (reduced) return;
        if (!ref.current) return;
        ref.current.rotation.y += state.clock.getDelta() * 0.02;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#8a6bff"
                transparent
                opacity={0.4}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Main Hero Scene
export const HeroScene = () => {
    const groupRef = useRef();
    const mouse = useMousePosition();
    const reduced = usePrefersReducedMotion();
    const isMobile = useIsMobile();

    // Device-aware particle count
    const particleCount = isMobile ? 120 : 350;
    const accentCount = isMobile ? 20 : 50;

    useFrame((state, delta) => {
        if (reduced) return;
        if (!groupRef.current) return;

        // Subtle camera parallax from mouse
        const targetRotX = mouse.current.y * 0.15;
        const targetRotY = mouse.current.x * 0.2;

        groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * delta * 2;
        groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * delta * 2;

        // Scroll-based depth movement
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
        groupRef.current.position.z = scrollProgress * 1.5;
        groupRef.current.scale.setScalar(1 - scrollProgress * 0.15);
    });

    return (
        <group ref={groupRef}>
            <CoreShell reduced={reduced} />
            <CoreParticles count={particleCount} reduced={reduced} />
            <CoreCurves reduced={reduced} />
            <AccentParticles count={accentCount} reduced={reduced} />
        </group>
    );
};

export default HeroScene;
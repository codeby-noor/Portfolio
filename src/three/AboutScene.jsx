import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion, useIsMobile } from "./usePortfolio3D";

/**
 * ABOUT — Transparent Layered Sphere/Core
 * 
 * Inside: thin lines, small particles, data paths
 * The object slowly rotates.
 * On scroll: layers separate slightly, then reconnect.
 */

// Generate layered sphere shells
const useLayeredSpheres = (layerCount) => {
    return useMemo(() => {
        const layers = [];
        for (let i = 0; i < layerCount; i++) {
            const radius = 1.2 + i * 0.35;
            const segments = 24 + i * 4;
            const geo = new THREE.SphereGeometry(radius, segments, segments / 2);
            layers.push({ geo, radius, index: i });
        }
        return layers;
    }, [layerCount]);
};

// Generate data path curves inside the sphere
const useDataPaths = () => {
    return useMemo(() => {
        const paths = [];
        for (let i = 0; i < 4; i++) {
            const points = [];
            const segments = 30;
            for (let j = 0; j <= segments; j++) {
                const t = (j / segments) * Math.PI * 2;
                const radius = 0.8 + i * 0.15;
                const x = radius * Math.cos(t + i * 0.5);
                const y = radius * Math.sin(t * 1.5 + i) * 0.5;
                const z = radius * Math.sin(t * 0.8) * 0.4;
                points.push(new THREE.Vector3(x, y, z));
            }
            const curve = new THREE.CatmullRomCurve3(points);
            const curvePoints = curve.getPoints(40);
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

// Generate inner particles
const useInnerParticles = (count) => {
    return useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = Math.random() * 1.1;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, [count]);
};

// Layered sphere core
const LayeredCore = ({ reduced, isMobile }) => {
    const groupRef = useRef();
    const layerRefs = useRef([]);
    const layers = useLayeredSpheres(isMobile ? 2 : 3);
    const dataPaths = useDataPaths();
    const pathRefs = useRef([]);
    const particleCount = isMobile ? 30 : 60;
    const innerParticles = useInnerParticles(particleCount);
    const particlesRef = useRef();

    useFrame((state) => {
        if (reduced) return;

        const time = state.clock.elapsedTime;

        // Slow rotation
        if (groupRef.current) {
            groupRef.current.rotation.y += state.clock.getDelta() * 0.15;
            groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.08;
        }

        // Scroll-based layer separation
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        const sectionTop = groupRef.current?.parent?.position?.y || 0;
        const scrollFactor = Math.min(Math.max((scrollY - 1000) / 1500, 0), 1);

        // Layers separate on scroll
        layerRefs.current.forEach((ref, i) => {
            if (!ref) return;
            const separation = scrollFactor * 0.3 * (i + 1);
            ref.position.z = separation;
            ref.rotation.y += state.clock.getDelta() * (0.05 + i * 0.02);
        });

        // Data paths pulse
        pathRefs.current.forEach((ref, i) => {
            if (!ref) return;
            ref.material.opacity = 0.2 + Math.sin(time * 0.8 + i) * 0.1;
        });

        // Particles drift
        if (particlesRef.current) {
            particlesRef.current.rotation.y += state.clock.getDelta() * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Layered translucent spheres */}
            {layers.map((layer, i) => (
                <mesh
                    key={i}
                    ref={(el) => (layerRefs.current[i] = el)}
                    geometry={layer.geo}
                >
                    <meshPhysicalMaterial
                        color={i === 0 ? "#4f7cff" : "#7c8cff"}
                        transparent
                        opacity={0.08 - i * 0.02}
                        roughness={0.3}
                        metalness={0.6}
                        side={THREE.DoubleSide}
                        depthWrite={false}
                        wireframe={i === layers.length - 1}
                    />
                </mesh>
            ))}

            {/* Data paths */}
            {dataPaths.map((path, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" count={path.count} array={path.positions} itemSize={3} />
                    </bufferGeometry>
                    <lineBasicMaterial
                        ref={(el) => (pathRefs.current[i] = el)}
                        color={i % 2 === 0 ? "#4f7cff" : "#7c8cff"}
                        transparent
                        opacity={0.25}
                        depthWrite={false}
                    />
                </line>
            ))}

            {/* Inner particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={particleCount} array={innerParticles} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.04}
                    color="#7c8cff"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

// Main About Scene
export const AboutScene = () => {
    const reduced = usePrefersReducedMotion();
    const isMobile = useIsMobile();

    return (
        <group>
            <LayeredCore reduced={reduced} isMobile={isMobile} />
        </group>
    );
};

export default AboutScene;
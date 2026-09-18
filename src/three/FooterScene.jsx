import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

// Small 3D digital planet / developer world
export const MiniWorld = () => {
    const groupRef = useRef();
    const planetRef = useRef();
    const ringRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // slow rotation of the planet group
        groupRef.current.rotation.y += delta * 0.15;

        // subtle bobbing
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;

        // ring rotation
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Planet */}
            <mesh ref={planetRef}>
                <sphereGeometry args={[0.7, 24, 24]} />
                <meshStandardMaterial
                    color="#6366f1"
                    emissive="#6366f1"
                    emissiveIntensity={0.3}
                    metalness={0.4}
                    roughness={0.5}
                />
            </mesh>

            {/* Orbit ring */}
            <mesh ref={ringRef}>
                <torusGeometry args={[1.1, 0.015, 8, 48]} />
                <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
            </mesh>

            {/* Floating tech orbs */}
            <FloatingOrb position={[1.4, 0.5, 0.3]} color="#61dafb" />
            <FloatingOrb position={[-1.2, 0.6, 0.2]} color="#68a063" />
            <FloatingOrb position={[0.8, -0.9, 0.4]} color="#4db33d" />
            <FloatingOrb position={[-1.0, -0.7, 0.3]} color="#f7df1e" />
        </group>
    );
};

// Small floating orb
const FloatingOrb = ({ position = [0, 0, 0], color = "#22d3ee" }) => {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.1;
        ref.current.rotation.y += 0.02;
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
            <mesh ref={ref} position={position}>
                <octahedronGeometry args={[0.14, 0]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
        </Float>
    );
};

// Particles for the footer
const FooterParticles = ({ count = 30 }) => {
    const ref = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 6;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 3;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
        }
        return arr;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y += 0.0005;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#818cf8" transparent opacity={0.4} />
        </points>
    );
};

// Main Footer scene
export const FooterScene = () => {
    return (
        <group>
            <FooterParticles />
            <MiniWorld />
        </group>
    );
};

export default FooterScene;
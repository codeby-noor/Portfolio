import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";

// Glowing communication core sphere
const CommSphere = ({ reduced }) => {
    const ref = useRef();
    const ring1Ref = useRef();
    const ring2Ref = useRef();

    useFrame((state, delta) => {
        if (reduced) return;

        if (ref.current) {
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
            ref.current.scale.setScalar(pulse);
        }

        if (ring1Ref.current) {
            ring1Ref.current.rotation.x += delta * 0.4;
            ring1Ref.current.rotation.y += delta * 0.2;
        }

        if (ring2Ref.current) {
            ring2Ref.current.rotation.x -= delta * 0.3;
            ring2Ref.current.rotation.z += delta * 0.2;
        }
    });

    return (
        <group>
            {/* Core sphere */}
            <mesh ref={ref}>
                <sphereGeometry args={[0.6, 24, 24]} />
                <meshStandardMaterial
                    color="#6366f1"
                    emissive="#6366f1"
                    emissiveIntensity={0.6}
                    metalness={0.3}
                    roughness={0.2}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Orbit rings */}
            <mesh ref={ring1Ref}>
                <torusGeometry args={[1.0, 0.02, 8, 48]} />
                <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
            </mesh>
            <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
                <torusGeometry args={[1.3, 0.015, 8, 48]} />
                <meshBasicMaterial color="#818cf8" transparent opacity={0.3} />
            </mesh>

            {/* Icons floating around */}
            <CommIcon position={[1.8, 0.6, 0.3]} color="#22d3ee" label="Email" />
            <CommIcon position={[-1.6, 0.8, 0.2]} color="#68a063" label="Phone" />
            <CommIcon position={[1.4, -0.9, 0.4]} color="#4db33d" label="Location" />
            <CommIcon position={[-1.7, -0.5, 0.3]} color="#f7df1e" label="LinkedIn" />
            <CommIcon position={[0.3, 1.5, 0.5]} color="#818cf8" label="GitHub" />
        </group>
    );
};

// Small floating communication icon orb
const CommIcon = ({ position = [0, 0, 0], color = "#22d3ee", label = "Email" }) => {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
            <mesh ref={ref} position={position}>
                <octahedronGeometry args={[0.18, 0]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.5} roughness={0.2} />
            </mesh>
            <Html center position={[position[0], position[1] + 0.4, position[2]]} zIndexRange={[10, 0]}>
                <div className="contact-3d-icon-label">{label}</div>
            </Html>
        </Float>
    );
};

// Data transmission particles when hovering send button
export const TransmissionEffect = ({ active = false }) => {
    const ref = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(30 * 3);
        for (let i = 0; i < 30; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 2;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 2;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!ref.current) return;
        if (active) {
            ref.current.rotation.y += state.clock.getDelta() * 3;
            ref.current.visible = true;
        } else {
            ref.current.visible = false;
        }
    });

    return (
        <points ref={ref} visible={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={30} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#22d3ee" transparent opacity={0.8} />
        </points>
    );
};

// Particles
const ContactParticles = ({ count = 40 }) => {
    const ref = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 7;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
        }
        return arr;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y += 0.0003;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#22d3ee" transparent opacity={0.5} />
        </points>
    );
};

// Main Contact scene
export const ContactScene = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += delta * 0.03;
    });

    return (
        <group ref={groupRef}>
            <ContactParticles />
            <CommSphere />
        </group>
    );
};

export default ContactScene;
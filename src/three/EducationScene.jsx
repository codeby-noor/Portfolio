import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

const milestones = [
    {
        title: "Bachelor of Computer Application",
        institution: "Narnala College of Professional and Applied Science",
        period: "2022–2025",
        position: [-2.5, 0.8, 0],
        color: "#6366f1",
    },
    {
        title: "Full Stack Web Development",
        institution: "Creative Design & Multimedia Institute",
        period: "2025–2026",
        position: [2.5, -0.8, 0],
        color: "#22d3ee",
    },
];

// Glowing 3D milestone node
const MilestoneNode = ({ milestone, index, reduced }) => {
    const ref = useRef();
    const ringRef = useRef();

    useFrame((state, delta) => {
        if (!ref.current) return;
        if (reduced) return;

        // pulse
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.08;
        ref.current.scale.setScalar(0.4 * pulse);

        // ring rotation
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * 0.5;
        }
    });

    return (
        <group position={milestone.position}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
                {/* Core node */}
                <mesh ref={ref}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial
                        color={milestone.color}
                        emissive={milestone.color}
                        emissiveIntensity={0.6}
                        metalness={0.5}
                        roughness={0.2}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Orbit ring */}
                <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.7, 0.02, 8, 48]} />
                    <meshBasicMaterial color={milestone.color} transparent opacity={0.4} />
                </mesh>

                {/* Label */}
                <Html center position={[0, 1.2, 0]} zIndexRange={[10, 0]}>
                    <div className="education-3d-card">
                        <span className="edu-period">{milestone.period}</span>
                        <strong>{milestone.title}</strong>
                        <span>{milestone.institution}</span>
                    </div>
                </Html>
            </Float>
        </group>
    );
};

// Curved path connecting milestones
const TimelinePath = () => {
    const points = useMemo(() => {
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-2.5, 0.8, 0),
            new THREE.Vector3(0, 0, 0.5),
            new THREE.Vector3(2.5, -0.8, 0),
        ]);
        return curve.getPoints(40);
    }, []);

    const positions = useMemo(() => {
        const arr = new Float32Array(points.length * 3);
        points.forEach((p, i) => {
            arr[i * 3] = p.x;
            arr[i * 3 + 1] = p.y;
            arr[i * 3 + 2] = p.z;
        });
        return arr;
    }, [points]);

    const lineRef = useRef();

    useFrame((state) => {
        if (!lineRef.current) return;
        lineRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
    });

    return (
        <line ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={points.length} array={positions} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color="#818cf8" transparent opacity={0.5} />
        </line>
    );
};

// Floating particles
const EducationParticles = ({ count = 40 }) => {
    const ref = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 7;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
        }
        return arr;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y += 0.0004;
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

// Main 3D Education timeline
export const EducationScene = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += delta * 0.03;
    });

    return (
        <group ref={groupRef}>
            <EducationParticles />
            <TimelinePath />
            {milestones.map((milestone, index) => (
                <MilestoneNode key={index} milestone={milestone} index={index} />
            ))}
        </group>
    );
};

export default EducationScene;
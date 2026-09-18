import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

const stages = [
    { title: "BCA", subtitle: "Foundation", position: [-3.2, 1.2, 0], color: "#6366f1", shape: "book" },
    { title: "Full-Stack Training", subtitle: "Learning", position: [-1.6, 0.6, 0.4], color: "#22d3ee", shape: "cube" },
    { title: "Frontend", subtitle: "React & UI", position: [0, 0, 0.6], color: "#61dafb", shape: "browser" },
    { title: "Backend", subtitle: "Node & Express", position: [1.6, -0.6, 0.4], color: "#68a063", shape: "server" },
    { title: "Database", subtitle: "MySQL & MongoDB", position: [3.2, -1.2, 0], color: "#4db33d", shape: "database" },
];

// 3D object representing each stage
const StageObject = ({ stage, index, reduced }) => {
    const ref = useRef();

    useFrame((state, delta) => {
        if (!ref.current) return;
        if (reduced) return;

        ref.current.rotation.y += delta * 0.3;
        ref.current.position.y = stage.position[1] + Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.1;
    });

    const renderShape = () => {
        switch (stage.shape) {
            case "book":
                return (
                    <mesh>
                        <boxGeometry args={[0.7, 0.5, 0.15]} />
                        <meshStandardMaterial color={stage.color} emissive={stage.color} emissiveIntensity={0.4} metalness={0.4} roughness={0.3} />
                    </mesh>
                );
            case "cube":
                return (
                    <mesh>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial color={stage.color} emissive={stage.color} emissiveIntensity={0.4} metalness={0.4} roughness={0.3} />
                    </mesh>
                );
            case "browser":
                return (
                    <group>
                        <mesh>
                            <boxGeometry args={[0.8, 0.5, 0.1]} />
                            <meshStandardMaterial color={stage.color} emissive={stage.color} emissiveIntensity={0.4} metalness={0.4} roughness={0.3} />
                        </mesh>
                        <mesh position={[0, 0.28, 0.06]}>
                            <boxGeometry args={[0.6, 0.06, 0.02]} />
                            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
                        </mesh>
                    </group>
                );
            case "server":
                return (
                    <mesh>
                        <cylinderGeometry args={[0.3, 0.3, 0.6, 12]} />
                        <meshStandardMaterial color={stage.color} emissive={stage.color} emissiveIntensity={0.4} metalness={0.4} roughness={0.3} />
                    </mesh>
                );
            case "database":
                return (
                    <group>
                        <mesh>
                            <cylinderGeometry args={[0.35, 0.35, 0.5, 12]} />
                            <meshStandardMaterial color={stage.color} emissive={stage.color} emissiveIntensity={0.4} metalness={0.4} roughness={0.3} />
                        </mesh>
                        <mesh position={[0, 0.3, 0]}>
                            <torusGeometry args={[0.35, 0.04, 8, 24]} />
                            <meshBasicMaterial color={stage.color} transparent opacity={0.6} />
                        </mesh>
                    </group>
                );
            default:
                return (
                    <mesh>
                        <sphereGeometry args={[0.3, 12, 12]} />
                        <meshStandardMaterial color={stage.color} emissive={stage.color} emissiveIntensity={0.4} />
                    </mesh>
                );
        }
    };

    return (
        <group position={stage.position}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
                <group ref={ref}>
                    {renderShape()}
                </group>
                <Html center position={[0, 0.8, 0]} zIndexRange={[10, 0]}>
                    <div className="journey-3d-label">
                        <strong>{stage.title}</strong>
                        <span>{stage.subtitle}</span>
                    </div>
                </Html>
            </Float>
        </group>
    );
};

// Energy/data line connecting stages
const PipelineLine = ({ start, end, color = "#818cf8" }) => {
    const points = useMemo(() => {
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(...start),
            new THREE.Vector3(...end),
        ]);
        return curve.getPoints(20);
    }, [start, end]);

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
        lineRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    });

    return (
        <line ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={points.length} array={positions} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color={color} transparent opacity={0.5} />
        </line>
    );
};

// Particles
const JourneyParticles = ({ count = 45 }) => {
    const ref = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 8;
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
            <pointsMaterial size={0.02} color="#818cf8" transparent opacity={0.5} />
        </points>
    );
};

// Main 3D Journey pipeline
export const JourneyScene = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += delta * 0.03;
    });

    // Build connections between consecutive stages
    const connections = useMemo(() => {
        const conns = [];
        for (let i = 0; i < stages.length - 1; i++) {
            conns.push({ start: stages[i].position, end: stages[i + 1].position });
        }
        return conns;
    }, []);

    return (
        <group ref={groupRef}>
            <JourneyParticles />
            {stages.map((stage, index) => (
                <StageObject key={index} stage={stage} index={index} />
            ))}
            {connections.map((conn, i) => (
                <PipelineLine key={i} {...conn} />
            ))}
        </group>
    );
};

export default JourneyScene;
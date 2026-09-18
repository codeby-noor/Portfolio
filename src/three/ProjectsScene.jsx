import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "../data/projects";

// Floating 3D browser window / monitor for each project
const ProjectMonitor = ({ project, index, onSelect, isActive, reduced }) => {
    const groupRef = useRef();
    const screenRef = useRef();

    // Position projects in a 3D arc
    const position = useMemo(() => {
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 3.2;
        return [
            Math.cos(angle) * radius * 0.7,
            Math.sin(index * 1.3) * 0.4,
            Math.sin(angle) * radius * 0.4,
        ];
    }, [index]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        if (reduced) return;

        // gentle floating
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.15;

        // hover effect - move toward camera
        const targetScale = isActive ? 1.15 : 1;
        groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);

        // screen glow
        if (screenRef.current) {
            screenRef.current.material.emissiveIntensity = isActive ? 0.8 : 0.2;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Monitor frame */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2.2, 1.4, 0.12]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
                </mesh>

                {/* Screen */}
                <mesh ref={screenRef} position={[0, 0, 0.08]}>
                    <planeGeometry args={[2.0, 1.2]} />
                    <meshStandardMaterial
                        color={project.accent || "#6366f1"}
                        emissive={project.accent || "#6366f1"}
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Stand */}
                <mesh position={[0, -0.85, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
                    <meshStandardMaterial color="#2a2a3e" metalness={0.8} roughness={0.3} />
                </mesh>
                <mesh position={[0, -1.05, 0]}>
                    <boxGeometry args={[0.5, 0.08, 0.4]} />
                    <meshStandardMaterial color="#2a2a3e" metalness={0.8} roughness={0.3} />
                </mesh>

                {/* Floating tech nodes around monitor */}
                <TechOrb position={[1.4, 0.7, 0.3]} color="#61dafb" />
                <TechOrb position={[-1.3, 0.5, 0.2]} color="#68a063" />
                <TechOrb position={[0.3, -1.2, 0.4]} color="#4db33d" />
                <TechOrb position={[1.2, -0.6, -0.2]} color="#f7df1e" />

                {/* Project label */}
                <Html center position={[0, -1.4, 0]} zIndexRange={[10, 0]}>
                    <div className="project-3d-label">
                        <strong>{project.title}</strong>
                    </div>
                </Html>

                {/* Click to view */}
                <mesh
                    position={[0, 0, 0.15]}
                    onClick={(e) => { e.stopPropagation(); onSelect(project); }}
                    onPointerOver={(e) => { e.stopPropagation(); }}
                >
                    <planeGeometry args={[2.0, 1.2]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>
            </Float>
        </group>
    );
};

// Small glowing orb
const TechOrb = ({ position = [0, 0, 0], color = "#22d3ee" }) => {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.08;
    });

    return (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
            <mesh ref={ref} position={position}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
        </Float>
    );
};

// Particle field
const ProjectParticles = ({ count = 50 }) => {
    const ref = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 8;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
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
            <pointsMaterial size={0.025} color="#818cf8" transparent opacity={0.5} />
        </points>
    );
};

// Main 3D Projects gallery
export const ProjectsScene = ({ onSelectProject }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += delta * 0.04;
    });

    return (
        <group ref={groupRef}>
            <ProjectParticles />
            {projects.map((project, index) => (
                <ProjectMonitor
                    key={project.id}
                    project={project}
                    index={index}
                    onSelect={onSelectProject}
                    isActive={false}
                    reduced={false}
                />
            ))}
        </group>
    );
};

export default ProjectsScene;
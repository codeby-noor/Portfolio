import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion, useIsMobile } from "./usePortfolio3D";

/**
 * SKILLS — 3D Technology Space
 * 
 * Clean typography arranged in 3D space with subtle depth.
 * Hover: text becomes brighter, moves toward camera, related technologies subtly move, thin connection lines appear.
 */

const technologies = [
    { name: "React", x: -2.2, y: 1.4, z: 0.2, group: "frontend" },
    { name: "Node.js", x: 0.2, y: 1.2, z: 0.4, group: "backend" },
    { name: "Express", x: 2.4, y: 1.0, z: 0.1, group: "backend" },
    { name: "MySQL", x: -1.8, y: 0.2, z: 0.3, group: "database" },
    { name: "JavaScript", x: 0.4, y: 0.0, z: 0.5, group: "frontend" },
    { name: "MongoDB", x: 2.2, y: -0.2, z: 0.2, group: "database" },
    { name: "HTML", x: -2.4, y: -1.0, z: 0.1, group: "frontend" },
    { name: "CSS", x: -0.2, y: -1.2, z: 0.4, group: "frontend" },
    { name: "Bootstrap", x: 1.8, y: -1.4, z: 0.2, group: "frontend" },
    { name: "REST APIs", x: -0.6, y: 2.0, z: 0.3, group: "backend" },
    { name: "Git", x: 1.6, y: 2.0, z: 0.1, group: "tools" },
    { name: "GitHub", x: 3.0, y: 0.6, z: 0.2, group: "tools" },
    { name: "Postman", x: -3.0, y: -0.4, z: 0.2, group: "tools" },
];

// Connection lines between related technologies
const useConnections = () => {
    return useMemo(() => {
        const conns = [];
        const groups = {
            frontend: ["React", "JavaScript", "HTML", "CSS", "Bootstrap"],
            backend: ["Node.js", "Express", "REST APIs"],
            database: ["MySQL", "MongoDB"],
            tools: ["Git", "GitHub", "Postman"],
        };

        Object.values(groups).forEach((group) => {
            for (let i = 0; i < group.length - 1; i++) {
                const start = technologies.find((t) => t.name === group[i]);
                const end = technologies.find((t) => t.name === group[i + 1]);
                if (start && end) {
                    conns.push({
                        start: [start.x, start.y, start.z],
                        end: [end.x, end.y, end.z],
                    });
                }
            }
        });

        return conns;
    }, []);
};

// Connection line between two points
const ConnectionLine = ({ start, end, visible }) => {
    const ref = useRef();

    const positions = useMemo(() => {
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(...start),
            new THREE.Vector3(
                (start[0] + end[0]) / 2,
                (start[1] + end[1]) / 2,
                (start[2] + end[2]) / 2 + 0.2
            ),
            new THREE.Vector3(...end),
        ]);
        const points = curve.getPoints(20);
        const arr = new Float32Array(points.length * 3);
        points.forEach((p, i) => {
            arr[i * 3] = p.x;
            arr[i * 3 + 1] = p.y;
            arr[i * 3 + 2] = p.z;
        });
        return { arr, count: points.length };
    }, [start, end]);

    useFrame((state) => {
        if (!ref.current) return;
        const targetOpacity = visible ? 0.35 : 0;
        ref.current.material.opacity += (targetOpacity - ref.current.material.opacity) * 0.1;
    });

    return (
        <line>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={positions.count} array={positions.arr} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial
                ref={ref}
                color="#4f7cff"
                transparent
                opacity={0}
                depthWrite={false}
            />
        </line>
    );
};

// Technology text node in 3D space
const TechText = ({ tech, index, hovered, onHover, reduced }) => {
    const ref = useRef();
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (reduced) return;
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;

        // Gentle floating
        groupRef.current.position.y = tech.y + Math.sin(time * 0.5 + index) * 0.05;

        // Hover: move toward camera
        const targetZ = hovered ? tech.z + 0.4 : tech.z;
        groupRef.current.position.z += (targetZ - groupRef.current.position.z) * delta * 3;

        // Hover: scale up slightly
        const targetScale = hovered ? 1.15 : 1;
        groupRef.current.scale.setScalar(
            groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * delta * 3
        );
    });

    return (
        <group position={[tech.x, tech.y, tech.z]} ref={groupRef}>
            <Html
                center
                zIndexRange={[10, 0]}
                style={{ pointerEvents: "auto" }}
            >
                <div
                    className={`skills-3d__word ${hovered ? "skills-3d__word--hovered" : ""}`}
                    onMouseEnter={() => onHover(index)}
                    onMouseLeave={() => onHover(null)}
                >
                    {tech.name}
                </div>
            </Html>
        </group>
    );
};

// Ambient particles
const SkillsParticles = ({ count, reduced }) => {
    const ref = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 8;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
        }
        return arr;
    }, [count]);

    useFrame((state) => {
        if (reduced) return;
        if (!ref.current) return;
        ref.current.rotation.y += state.clock.getDelta() * 0.01;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#4f7cff"
                transparent
                opacity={0.3}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Main Skills Scene
export const SkillsScene = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const reduced = usePrefersReducedMotion();
    const isMobile = useIsMobile();
    const connections = useConnections();

    // Determine which connections to show based on hovered tech
    const visibleConnections = useMemo(() => {
        if (hoveredIndex === null) return new Set();
        const hoveredTech = technologies[hoveredIndex];
        if (!hoveredTech) return new Set();

        const related = technologies
            .filter((t) => t.group === hoveredTech.group && t.name !== hoveredTech.name)
            .map((t) => t.name);

        const visible = new Set();
        connections.forEach((conn, i) => {
            const startName = technologies.find((t) => t.x === conn.start[0] && t.y === conn.start[1])?.name;
            const endName = technologies.find((t) => t.x === conn.end[0] && t.y === conn.end[1])?.name;
            if (related.includes(startName) || related.includes(endName)) {
                visible.add(i);
            }
        });
        return visible;
    }, [hoveredIndex, connections]);

    const particleCount = isMobile ? 20 : 40;

    return (
        <group>
            <SkillsParticles count={particleCount} reduced={reduced} />
            {technologies.map((tech, index) => (
                <TechText
                    key={tech.name}
                    tech={tech}
                    index={index}
                    hovered={hoveredIndex === index}
                    onHover={setHoveredIndex}
                    reduced={reduced}
                />
            ))}
            {connections.map((conn, i) => (
                <ConnectionLine
                    key={i}
                    start={conn.start}
                    end={conn.end}
                    visible={visibleConnections.has(i)}
                />
            ))}
        </group>
    );
};

export default SkillsScene;
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition, usePrefersReducedMotion, useIsMobile } from "./usePortfolio3D";

/**
 * FULL-STACK WORKSPACE — Hero 3D Scene
 *
 * A stylized 3D browser/application environment that visually
 * communicates FULL-STACK development:
 *
 *   UI  ──►  API  ──►  SERVER  ──►  DATABASE
 *
 * Built from clean panels, connecting data lines and subtle
 * wireframe depth. No random decorative objects.
 */

const LAYERS = [
    { label: "UI", sub: "REACT", color: "#7c8cff", y: 1.55 },
    { label: "API", sub: "REST", color: "#8a6bff", y: 0.55 },
    { label: "SERVER", sub: "NODE", color: "#4f7cff", y: -0.45 },
    { label: "DATABASE", sub: "SQL / NO-SQL", color: "#39d98a", y: -1.45 },
];

// A single layer panel with label
const LayerPanel = ({ layer, active, reduced }) => {
    const ref = useRef();
    const glowRef = useRef();

    useFrame((state) => {
        if (reduced || !ref.current) return;
        // subtle breathing on the active layer
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6 + layer.y) * 0.015;
        ref.current.scale.setScalar(pulse);
        if (glowRef.current) {
            glowRef.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 1.6 + layer.y) * 0.05;
        }
    });

    return (
        <group position={[0, layer.y, 0]}>
            {/* Panel body */}
            <mesh ref={ref}>
                <boxGeometry args={[3.4, 0.72, 0.18]} />
                <meshStandardMaterial
                    color="#14161c"
                    metalness={0.7}
                    roughness={0.35}
                    transparent
                    opacity={0.92}
                />
            </mesh>
            {/* Panel edge highlight */}
            <mesh position={[0, 0, 0.1]}>
                <boxGeometry args={[3.4, 0.72, 0.02]} />
                <meshBasicMaterial color={layer.color} transparent opacity={0.35} />
            </mesh>
            {/* Glow behind active layer */}
            <mesh ref={glowRef} position={[0, 0, -0.25]}>
                <planeGeometry args={[3.8, 1.1]} />
                <meshBasicMaterial color={layer.color} transparent opacity={0.1} depthWrite={false} />
            </mesh>
            {/* Label */}
            <Text
                position={[-1.25, 0, 0.16]}
                fontSize={0.26}
                color="#f5f5f7"
                anchorX="left"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBB.ttf"
            >
                {layer.label}
            </Text>
            <Text
                position={[1.25, 0, 0.16]}
                fontSize={0.16}
                color={layer.color}
                anchorX="right"
                anchorY="middle"
                letterSpacing={0.08}
                font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBB.ttf"
            >
                {layer.sub}
            </Text>
        </group>
    );
};

// Vertical connector lines between layers with animated data flow
const DataFlow = ({ reduced }) => {
    const dotRefs = useRef([]);

    const connectors = useMemo(() => {
        const arr = [];
        for (let i = 0; i < LAYERS.length - 1; i++) {
            const y0 = LAYERS[i].y - 0.36;
            const y1 = LAYERS[i + 1].y + 0.36;
            arr.push({ y0, y1, x: 0 });
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (reduced) return;
        const t = state.clock.elapsedTime;
        dotRefs.current.forEach((dot, i) => {
            if (!dot) return;
            const c = connectors[i];
            if (!c) return;
            // animate dot traveling down the line
            const progress = (t * 0.5 + i * 0.33) % 1;
            dot.position.y = c.y0 + (c.y1 - c.y0) * progress;
            dot.material.opacity = 0.9;
        });
    });

    return (
        <group>
            {connectors.map((c, i) => (
                <group key={i}>
                    <line>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={2}
                                array={new Float32Array([c.x, c.y0, 0, c.x, c.y1, 0])}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="#4f7cff" transparent opacity={0.35} />
                    </line>
                    {/* Data packet dot */}
                    <mesh
                        ref={(el) => (dotRefs.current[i] = el)}
                        position={[c.x, c.y0, 0]}
                    >
                        <sphereGeometry args={[0.05, 12, 12]} />
                        <meshBasicMaterial color="#7c8cff" transparent opacity={0.9} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

// Browser frame shell around the workspace
const BrowserShell = ({ reduced }) => {
    const ref = useRef();

    useFrame((state) => {
        if (reduced || !ref.current) return;
        ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
    });

    return (
        <group ref={ref}>
            {/* Browser top bar */}
            <mesh position={[0, 2.15, 0]}>
                <boxGeometry args={[4.2, 0.34, 0.2]} />
                <meshStandardMaterial color="#1a1c24" metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Browser frame edges */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4.2, 4.3, 0.06]} />
                <meshStandardMaterial
                    color="#0d0f14"
                    metalness={0.5}
                    roughness={0.5}
                    transparent
                    opacity={0.35}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Wireframe outline */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(4.2, 4.3, 0.06)]} />
                <lineBasicMaterial color="#4f7cff" transparent opacity={0.25} />
            </lineSegments>
            {/* Browser dots */}
            {[-1.7, -1.45, -1.2].map((x, i) => (
                <mesh key={i} position={[x, 2.15, 0.11]}>
                    <circleGeometry args={[0.05, 16]} />
                    <meshBasicMaterial color={i === 0 ? "#ff5f57" : i === 1 ? "#febc2e" : "#28c840"} />
                </mesh>
            ))}
        </group>
    );
};

// Subtle architectural grid floor
const GridFloor = () => {
    const grid = useMemo(() => {
        const size = 12;
        const divisions = 24;
        const points = [];
        const step = size / divisions;
        for (let i = 0; i <= divisions; i++) {
            const x = -size / 2 + i * step;
            points.push(new THREE.Vector3(x, -2.3, -size / 2));
            points.push(new THREE.Vector3(x, -2.3, size / 2));
            points.push(new THREE.Vector3(-size / 2, -2.3, x));
            points.push(new THREE.Vector3(size / 2, -2.3, x));
        }
        return new Float32Array(points.flatMap((v) => [v.x, v.y, v.z]));
    }, []);

    return (
        <lineSegments>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={grid.length / 3} array={grid} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color="#4f7cff" transparent opacity={0.08} />
        </lineSegments>
    );
};

// Main Workspace Scene
export const WorkspaceScene = () => {
    const groupRef = useRef();
    const mouse = useMousePosition();
    const reduced = usePrefersReducedMotion();
    const isMobile = useIsMobile();

    useFrame((state, delta) => {
        if (reduced || !groupRef.current) return;

        // Subtle camera parallax from mouse
        const targetRotX = mouse.current.y * 0.12;
        const targetRotY = mouse.current.x * 0.18;
        groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * delta * 2;
        groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * delta * 2;

        // Gentle idle drift
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    });

    return (
        <group ref={groupRef} scale={isMobile ? 0.62 : 0.85}>
            <BrowserShell reduced={reduced} />
            {LAYERS.map((layer) => (
                <LayerPanel key={layer.label} layer={layer} reduced={reduced} />
            ))}
            <DataFlow reduced={reduced} />
            <GridFloor />
        </group>
    );
};

export default WorkspaceScene;
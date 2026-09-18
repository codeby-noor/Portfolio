import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMousePosition, usePrefersReducedMotion, useIsMobile } from "./usePortfolio3D";

/**
 * FULL-STACK ARCHITECTURE — Technical depth 3D Scene
 *
 * An interactive vertical stack showing how an application
 * flows from frontend to database:
 *
 *   REACT FRONTEND
 *        ↓
 *      AXIOS
 *        ↓
 *     REST API
 *        ↓
 *     EXPRESS
 *        ↓
 *      NODE.JS
 *        ↓
 *     DATABASE
 *        ↓
 *  MYSQL / MONGODB
 *
 * Hovering a layer highlights it. Subtle 3D depth.
 */

const STACK = [
    { label: "REACT", sub: "FRONTEND", color: "#7c8cff", y: 2.6 },
    { label: "AXIOS", sub: "HTTP CLIENT", color: "#8a6bff", y: 1.7 },
    { label: "REST API", sub: "ENDPOINTS", color: "#4f7cff", y: 0.8 },
    { label: "EXPRESS", sub: "ROUTING", color: "#39d98a", y: -0.1 },
    { label: "NODE.JS", sub: "SERVER", color: "#7fd4ff", y: -1.0 },
    { label: "DATABASE", sub: "STORAGE", color: "#ffb86b", y: -1.9 },
    { label: "MYSQL / MONGODB", sub: "SQL · NO-SQL", color: "#f5f5f7", y: -2.8 },
];

const ArchitectureLayer = ({ layer, hovered, onHover, reduced }) => {
    const ref = useRef();
    const glowRef = useRef();

    useFrame((state) => {
        if (reduced || !ref.current) return;
        const target = hovered ? 1.06 : 1;
        ref.current.scale.x += (target - ref.current.scale.x) * 0.12;
        ref.current.scale.y += (target - ref.current.scale.y) * 0.12;
        if (glowRef.current) {
            glowRef.current.material.opacity = hovered ? 0.28 : 0.08;
        }
    });

    return (
        <group
            position={[0, layer.y, 0]}
            onPointerOver={(e) => {
                e.stopPropagation();
                onHover(layer.label);
            }}
            onPointerOut={() => onHover(null)}
        >
            {/* Layer body */}
            <mesh ref={ref}>
                <boxGeometry args={[3.6, 0.6, 0.16]} />
                <meshStandardMaterial
                    color={hovered ? "#1c2030" : "#14161c"}
                    metalness={0.7}
                    roughness={0.35}
                    transparent
                    opacity={0.94}
                />
            </mesh>
            {/* Edge highlight */}
            <mesh position={[0, 0, 0.09]}>
                <boxGeometry args={[3.6, 0.6, 0.02]} />
                <meshBasicMaterial color={layer.color} transparent opacity={hovered ? 0.8 : 0.3} />
            </mesh>
            {/* Glow */}
            <mesh ref={glowRef} position={[0, 0, -0.22]}>
                <planeGeometry args={[4.0, 0.95]} />
                <meshBasicMaterial color={layer.color} transparent opacity={0.08} depthWrite={false} />
            </mesh>
            {/* Label */}
            <Text
                position={[0, 0, 0.12]}
                fontSize={0.24}
                color={hovered ? "#ffffff" : "#f5f5f7"}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBB.ttf"
            >
                {layer.label}
            </Text>
            <Text
                position={[0, -0.32, 0.12]}
                fontSize={0.11}
                color={layer.color}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.12}
                font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBB.ttf"
            >
                {layer.sub}
            </Text>
        </group>
    );
};

// Connector arrows between layers
const Connectors = ({ reduced }) => {
    const dotRefs = useRef([]);

    const connectors = useMemo(() => {
        const arr = [];
        for (let i = 0; i < STACK.length - 1; i++) {
            arr.push({ y0: STACK[i].y - 0.3, y1: STACK[i + 1].y + 0.3 });
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
            const progress = (t * 0.45 + i * 0.25) % 1;
            dot.position.y = c.y0 + (c.y1 - c.y0) * progress;
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
                                array={new Float32Array([0, c.y0, 0, 0, c.y1, 0])}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="#4f7cff" transparent opacity={0.3} />
                    </line>
                    <mesh ref={(el) => (dotRefs.current[i] = el)} position={[0, c.y0, 0]}>
                        <sphereGeometry args={[0.045, 10, 10]} />
                        <meshBasicMaterial color="#7c8cff" transparent opacity={0.9} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

// Main Architecture Scene
export const ArchitectureScene = ({ activeLayer, onLayerHover }) => {
    const groupRef = useRef();
    const mouse = useMousePosition();
    const reduced = usePrefersReducedMotion();
    const isMobile = useIsMobile();

    useFrame((state, delta) => {
        if (reduced || !groupRef.current) return;
        const targetRotX = mouse.current.y * 0.1;
        const targetRotY = mouse.current.x * 0.14;
        groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * delta * 2;
        groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * delta * 2;
    });

    return (
        <group ref={groupRef} scale={isMobile ? 0.6 : 0.82}>
            {STACK.map((layer) => (
                <ArchitectureLayer
                    key={layer.label}
                    layer={layer}
                    hovered={activeLayer === layer.label}
                    onHover={onLayerHover}
                    reduced={reduced}
                />
            ))}
            <Connectors reduced={reduced} />
        </group>
    );
};

export default ArchitectureScene;
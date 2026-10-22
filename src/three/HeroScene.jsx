import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const SealObject = ({ theme }) => {
    const assembly = useRef(null);
    const accent = theme === "dark" ? "#D29AA3" : "#652D3C";

    useFrame((state, delta) => {
        if (!assembly.current) return;
        const smoothing = Math.min(1, delta * 3);
        assembly.current.rotation.x += (state.pointer.y * 0.12 - assembly.current.rotation.x) * smoothing;
        assembly.current.rotation.y += (state.pointer.x * 0.16 - assembly.current.rotation.y) * smoothing;
    });

    return (
        <group ref={assembly}>
            <mesh rotation={[0.34, 0.18, -0.16]}>
                <torusGeometry args={[1.04, 0.035, 12, 96]} />
                <meshPhysicalMaterial color={accent} roughness={0.34} metalness={0.22} clearcoat={0.45} clearcoatRoughness={0.3} />
            </mesh>
            <mesh rotation={[-0.52, 0.2, 0.62]}>
                <torusGeometry args={[0.78, 0.018, 10, 96]} />
                <meshStandardMaterial color="#B77A83" roughness={0.42} metalness={0.18} />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshStandardMaterial color={theme === "dark" ? "#F5F0E8" : "#292126"} roughness={0.38} />
            </mesh>
        </group>
    );
};

const HeroScene = ({ theme }) => (
    <div className="hero-scene" aria-hidden="true">
        <Canvas
            camera={{ position: [0, 0, 4.1], fov: 35 }}
            dpr={[1, 1.5]}
            frameloop="always"
            fallback={<span className="hero-scene-fallback">Interactive artwork unavailable</span>}
            gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        >
            <ambientLight intensity={1.5} />
            <directionalLight position={[2.5, 3, 4]} intensity={2.2} />
            <pointLight position={[-2.5, -1, 2]} color={theme === "dark" ? "#B77A83" : "#652D3C"} intensity={1.2} />
            <SealObject theme={theme} />
        </Canvas>
    </div>
);

export default HeroScene;

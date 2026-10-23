import { Canvas, useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3 } from "three";
import { useMemo, useRef } from "react";

const SealObject = ({ theme }) => {
    const assembly = useRef(null);
    const keyLight = useRef(null);
    const accent = theme === "dark" ? "#D29AA3" : "#652D3C";
    const monogramM = useMemo(() => new CatmullRomCurve3([
        new Vector3(-0.62, -0.48, 0),
        new Vector3(-0.62, 0.5, 0.02),
        new Vector3(-0.34, 0.08, 0.12),
        new Vector3(0, 0.5, 0),
        new Vector3(0.34, 0.08, 0.12),
        new Vector3(0.62, 0.5, 0.02),
        new Vector3(0.62, -0.48, 0),
    ], false, "centripetal"), []);
    const monogramS = useMemo(() => new CatmullRomCurve3([
        new Vector3(0.38, 0.3, 0.16),
        new Vector3(0.14, 0.47, 0.2),
        new Vector3(-0.22, 0.4, 0.2),
        new Vector3(-0.34, 0.17, 0.2),
        new Vector3(-0.13, 0.02, 0.22),
        new Vector3(0.2, -0.03, 0.22),
        new Vector3(0.35, -0.23, 0.2),
        new Vector3(0.16, -0.45, 0.18),
        new Vector3(-0.26, -0.4, 0.16),
    ], false, "centripetal"), []);

    useFrame((state, delta) => {
        if (!assembly.current || !keyLight.current) return;
        const smoothing = Math.min(1, delta * 3);
        assembly.current.rotation.x += (state.pointer.y * 0.12 - assembly.current.rotation.x) * smoothing;
        assembly.current.rotation.y += (state.pointer.x * 0.16 - assembly.current.rotation.y) * smoothing;
        keyLight.current.position.x += (state.pointer.x * 1.5 - keyLight.current.position.x) * smoothing;
        keyLight.current.position.y += (state.pointer.y * 1.1 - keyLight.current.position.y) * smoothing;
    });

    return (
        <group ref={assembly}>
            <mesh rotation={[0.34, 0.18, -0.16]}>
                <torusGeometry args={[1.14, 0.024, 10, 128]} />
                <meshPhysicalMaterial color={accent} roughness={0.3} metalness={0.38} clearcoat={0.6} clearcoatRoughness={0.24} />
            </mesh>
            <mesh rotation={[-0.52, 0.2, 0.62]} scale={[1, 0.86, 1]}>
                <torusGeometry args={[0.86, 0.016, 8, 128]} />
                <meshPhysicalMaterial color="#B77A83" roughness={0.32} metalness={0.3} clearcoat={0.4} />
            </mesh>
            <mesh rotation={[0.3, -0.24, 0.15]}>
                <torusKnotGeometry args={[0.56, 0.012, 144, 6, 2, 3]} />
                <meshStandardMaterial color={theme === "dark" ? "#F5F0E8" : "#8C626B"} roughness={0.34} metalness={0.42} />
            </mesh>
            <group position={[0, 0, 0.18]} scale={0.75}>
                <mesh>
                    <tubeGeometry args={[monogramM, 96, 0.032, 8, false]} />
                    <meshPhysicalMaterial color={theme === "dark" ? "#F5F0E8" : "#652D3C"} roughness={0.25} metalness={0.24} clearcoat={0.72} />
                </mesh>
                <mesh>
                    <tubeGeometry args={[monogramS, 96, 0.026, 8, false]} />
                    <meshPhysicalMaterial color="#B77A83" roughness={0.28} metalness={0.3} clearcoat={0.7} />
                </mesh>
            </group>
            {Array.from({ length: 16 }, (_, index) => {
                const angle = (index / 16) * Math.PI * 2;
                const radius = index % 4 === 0 ? 1.31 : 1.27;
                return (
                    <mesh key={index} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]} rotation={[0, 0, angle]}>
                        <boxGeometry args={[index % 4 === 0 ? 0.075 : 0.035, 0.009, 0.009]} />
                        <meshStandardMaterial color={index % 4 === 0 ? accent : "#B77A83"} roughness={0.4} metalness={0.2} />
                    </mesh>
                );
            })}
            <mesh position={[0, 0, 0.08]}>
                <octahedronGeometry args={[0.035, 0]} />
                <meshStandardMaterial color={theme === "dark" ? "#F5F0E8" : "#292126"} roughness={0.3} metalness={0.18} />
            </mesh>
            <pointLight ref={keyLight} position={[0, 0, 2]} color={theme === "dark" ? "#D29AA3" : "#B77A83"} intensity={2.6} distance={4} />
        </group>
    );
};

const HeroScene = ({ theme }) => (
    <div className="hero-scene" aria-hidden="true">
        <Canvas
            camera={{ position: [0, 0, 4.4], fov: 35 }}
            dpr={[1, 1.35]}
            frameloop="always"
            fallback={<span className="hero-scene-fallback">Interactive artwork unavailable</span>}
            gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        >
            <ambientLight intensity={1.15} />
            <directionalLight position={[2.5, 3, 4]} intensity={2.5} />
            <pointLight position={[-2.5, -1, 2]} color={theme === "dark" ? "#B77A83" : "#652D3C"} intensity={1.4} />
            <SealObject theme={theme} />
        </Canvas>
    </div>
);

export default HeroScene;

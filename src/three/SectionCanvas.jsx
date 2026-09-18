import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useMousePosition, usePrefersReducedMotion } from "./usePortfolio3D";

// Camera rig that subtly follows the mouse and gently drifts
export const CameraRig = ({ children, intensity = 0.3 }) => {
    const mouse = useMousePosition();
    const reduced = usePrefersReducedMotion();
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        if (reduced) return;

        // subtle follow of mouse
        const targetX = mouse.current.x * intensity;
        const targetY = mouse.current.y * intensity * 0.6;
        groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * delta * 2;
        groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * delta * 2;
    });

    return <group ref={groupRef}>{children}</group>;
};

// Standard section 3D canvas wrapper with performance-oriented settings
export const SectionCanvas = ({
    children,
    backgroundColor = "transparent",
    cameraPosition = [0, 0, 7],
    fov = 45,
    dpr,
    shadows = false,
    className,
}) => {
    return (
        <Canvas
            dpr={dpr || [1, 1.5]}
            camera={{ position: cameraPosition, fov: fov }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            shadows={shadows}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: backgroundColor }}
            className={className}
        >
            <Suspense fallback={null}>
                <CameraRig>
                    {children}
                </CameraRig>
                {shadows && <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={5} resolution={256} color="#000000" />}
                <Environment preset="city" />
            </Suspense>
        </Canvas>
    );
};

export default SectionCanvas;
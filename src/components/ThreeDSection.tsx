"use client";

import { useEffect, Suspense, useRef, memo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Html,
} from "@react-three/drei";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import Heart from "@/components/Heart";

// Dynamic import với no SSR
const EnvironmentWrapper = dynamic(() => import("./EnvironmentWrapper"), {
  ssr: false,
  loading: () => null,
});

// Preload models
useGLTF.preload("cupidon.glb");

// Loading component
function LoadingModel() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
        <p className="text-sm text-muted-foreground">Đang tải mô hình 3D...</p>
      </div>
    </Html>
  );
}

// Optimized Wedding model component
function WeddingModel({ url = "cupidon.glb", ...props }) {
  const { scene } = useGLTF(url);

  // Clone scene để tránh conflicts
  const clonedScene = scene.clone();

  return <primitive object={clonedScene} {...props} />;
}

// Optimized Canvas component
function OptimizedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      // Cleanup WebGL context
      if (canvasRef.current) {
        const gl =
          canvasRef.current.getContext("webgl") ||
          canvasRef.current.getContext("webgl2");
        if (gl) {
          const loseContext = gl.getExtension("WEBGL_lose_context");
          if (loseContext) {
            loseContext.loseContext();
          }
        }
      }
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 0, 2.5], fov: 35 }}
      className="w-full h-full"
      dpr={[1, 2]} // Limit pixel ratio for performance
      performance={{ min: 0.5 }} // Performance scaling
      gl={{
        antialias: false, // Disable for better performance
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.7} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={256} // Reduce shadow quality for performance
        shadow-mapSize-height={256}
      />
      <EnvironmentWrapper />
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.25}
        scale={10}
        blur={1.5}
        far={0.8}
        resolution={128} // Reduce resolution for performance
      />
      <Suspense fallback={<LoadingModel />}>
        <WeddingModel
          url="cupidon.glb"
          position={[0.3, 0, 0]}
          rotation={[0, Math.PI / 4, 0]}
          scale={0.5}
        />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={5} // Reduce rotation speed
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

const ThreeDSection = memo(() => {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Heart />
      </div>

      {/* 3D Canvas */}
      <OptimizedCanvas />
    </div>
  );
});

ThreeDSection.displayName = "ThreeDSection";
export default ThreeDSection;

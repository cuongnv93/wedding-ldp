"use client";

import { Suspense, memo, useMemo, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Html,
} from "@react-three/drei";
import dynamic from "next/dynamic";
import { Color } from "three";
import { Loader2 } from "lucide-react";

// Preload model
useGLTF.preload("room_relaxing.glb");

const EnvironmentWrapper = dynamic(() => import("./EnvironmentWrapper"), {
  ssr: false,
  loading: () => null,
});

const LoadingShoe = memo(() => (
  <Html center>
    <div className="flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
      <p className="text-sm text-muted-foreground">Đang tải mô hình 3D...</p>
    </div>
  </Html>
));

LoadingShoe.displayName = "LoadingShoe";

type ShoeModelProps = {
  url?: string;
  color?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const ShoeModel = memo(
  ({
    url = "room_relaxing.glb",
    color = "#fff4f5",
    ...props
  }: ShoeModelProps) => {
    const { scene } = useGLTF(url);

    const clonedScene = useMemo(() => {
      const cloned = scene.clone();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cloned.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            child.material.forEach((m: any) => {
              if (m.color) m.color.set(new Color(color));
            });
          } else {
            if (child.material.color) {
              child.material.color.set(new Color(color));
            }
          }
        }
      });
      return cloned;
    }, [scene, color]);

    return <primitive object={clonedScene} {...props} />;
  }
);

ShoeModel.displayName = "ShoeModel";

const OptimizedCanvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
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
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{
        antialias: false,
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
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <EnvironmentWrapper />
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.25}
        scale={10}
        blur={1.5}
        far={0.8}
        resolution={128}
      />
      <Suspense fallback={<LoadingShoe />}>
        <ShoeModel
          url="room_relaxing.glb"
          position={[0, 0, 0]}
          rotation={[0, Math.PI / 4, 0]}
          scale={0.15}
        />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
});

OptimizedCanvas.displayName = "OptimizedCanvas";

export default function ThreeDQuestionSection() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
      <div className="absolute inset-0">
        <OptimizedCanvas />
      </div>
    </div>
  );
}

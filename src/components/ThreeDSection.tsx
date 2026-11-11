"use client";

import { useEffect, Suspense, useRef, useState, memo, Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Html,
} from "@react-three/drei";
import { Loader2, Sparkles } from "lucide-react";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import Heart from "@/components/Heart";

// Dynamic import with no SSR
const EnvironmentWrapper = dynamic(() => import("./EnvironmentWrapper"), {
  ssr: false,
  loading: () => null,
});

// Preload models safely
try {
  useGLTF.preload("cupidon.glb");
} catch {
  // Silent catch if preload fails
}

class ThreeDErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("WebGL / 3D Canvas error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Loading component
function LoadingModel() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
        <p className="text-sm font-medium text-slate-600">Đang tải mô hình 3D...</p>
      </div>
    </Html>
  );
}

// 3D Wedding model component
function WeddingModel({ url = "cupidon.glb", ...props }) {
  const { scene } = useGLTF(url);
  const clonedScene = scene.clone();
  return <primitive object={clonedScene} {...props} />;
}

// Optimized Canvas component
function OptimizedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    return () => {
      if (canvas) {
        const gl =
          canvas.getContext("webgl") ||
          canvas.getContext("webgl2");
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
      dpr={[1, 1.5]}
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
        autoRotateSpeed={5}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

// Fallback card when WebGL context cannot be created
function FallbackHeroCard() {
  const locale = useLocale();
  const isEnglish = locale === "en";

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50/80 via-white to-pink-50/50 p-6 flex flex-col items-center justify-center border border-rose-100 shadow-[0_10px_30px_rgba(244,63,94,0.08)]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <Heart />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
        <div className="relative h-48 w-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white mb-4 transform hover:scale-105 transition-transform duration-300">
          <Image
            src="/image/anh-bia-thiep-xinh.jpg"
            alt={
              isEnglish
                ? "Modern online wedding invitation uWedding"
                : "Mẫu thiệp cưới online uWedding"
            }
            fill
            className="object-cover"
            sizes="150px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[11px] font-bold text-white tracking-wide">uWedding 3D</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/90 px-3 py-1 text-xs font-semibold text-rose-700 shadow-xs border border-rose-200">
          <Sparkles className="h-3 w-3 text-rose-600" />
          <span>
            {isEnglish
              ? "Experience modern digital invitations"
              : "Trải nghiệm thiệp số hiện đại"}
          </span>
        </div>
      </div>
    </div>
  );
}

const ThreeDSection = memo(() => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl") ||
        canvas.getContext("webgl2");
      setWebGLSupported(!!gl);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  if (webGLSupported === false) {
    return <FallbackHeroCard />;
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <Heart />
      </div>

      <ThreeDErrorBoundary fallback={<FallbackHeroCard />}>
        <OptimizedCanvas />
      </ThreeDErrorBoundary>
    </div>
  );
});

ThreeDSection.displayName = "ThreeDSection";
export default ThreeDSection;

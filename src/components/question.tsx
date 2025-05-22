"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Html,
} from "@react-three/drei";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Color } from "three";
import FAQCollapse from "./FAQCollapse";
import { Loader2 } from "lucide-react";

// Dynamic import for EnvironmentWrapper
const EnvironmentWrapper = dynamic(() => import("./EnvironmentWrapper"), {
  ssr: false,
});

// Loading component
function LoadingShoe() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
        <p className="text-sm text-muted-foreground">Đang tải mô hình 3D...</p>
      </div>
    </Html>
  );
}

// Shoe model component
function ShoeModel({ url = "cupidon.glb", color = "#fff4f5", ...props }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => m.color.set(new Color(color)));
        } else {
          child.material.color.set(new Color(color));
        }
      }
    });
  }, [scene, color]);

  return <primitive object={scene} {...props} />;
}

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error loading 3D model:", error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function Question() {
  const [isMounted, setIsMounted] = useState(false);
  const [modelError, setModelError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-white to-muted">
      <div className="container grid lg:grid-cols-2 gap-8 py-12 md:py-24 items-center">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 pt-8 md:pt-0"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-3 text-center">
            Câu hỏi thường gặp
          </h1>
          <FAQCollapse />
        </motion.div>

        {/* 3D Model Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[500px] w-full"
        >
          {isMounted && (
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-white from-primary/5 to-primary/10">
              {/* 3D Canvas */}
              <Canvas
                camera={{ position: [0, 0, 2.5], fov: 35 }}
                className="w-full h-full"
              >
                <ambientLight intensity={0.7} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  intensity={1}
                  castShadow
                />
                <EnvironmentWrapper />
                <ContactShadows
                  position={[0, -0.8, 0]}
                  opacity={0.25}
                  scale={10}
                  blur={1.5}
                  far={0.8}
                />
                <ErrorBoundary>
                  <Suspense fallback={<LoadingShoe />}>
                    {!modelError && (
                      <ShoeModel
                        url="room_relaxing.glb"
                        position={[0, 0, 0]}
                        rotation={[0, Math.PI / 4, 0]}
                        scale={0.15}
                      />
                    )}
                  </Suspense>
                </ErrorBoundary>
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 2}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>

              {/* Error Message */}
              {modelError && (
                <div className="absolute bottom-4 left-0 right-0 text-center px-4 py-2 bg-background/80 backdrop-blur-sm">
                  <p className="text-sm text-muted-foreground">
                    Vui lòng tải lên file `room_relaxing.glb` vào thư mục public
                    của dự án.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Html,
} from "@react-three/drei";
import { Button } from "../components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Component hiển thị thông tin
const StatisticBlock = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center sm:items-start">
    <span className="text-2xl sm:text-3xl font-bold">{value}</span>
    <span className="text-muted-foreground text-sm sm:text-base">{label}</span>
  </div>
);

const EnvironmentWrapper = dynamic(() => import("./EnvironmentWrapper"), {
  ssr: false,
});

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

// Wedding model component
function WeddingModel({ url = "wedding_ring.glb", ...props }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
}

// Component con: ThreeDCanvas
function ThreeDCanvas({ modelError }: { modelError: boolean }) {
  return (
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
      <Suspense fallback={<LoadingModel />}>
        {!modelError && (
          <WeddingModel
            url="cupidon.glb"
            position={[0.3, 0, 0]}
            rotation={[0, Math.PI / 4, 0]}
            scale={0.5}
          />
        )}
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [modelError,] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      className="relative w-full min-h-[40vh] overflow-hidden bg-white to-muted"
      style={{
        backgroundImage:
          "url('https://thiepxinh.net/public/upload//images/slide/anh-bia-thiep-xinh.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lớp phủ màu đen mờ */}
      {/* <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      ></div> */}
      {/* Nếu muốn giữ lớp phủ trắng mờ cũ, có thể để lại dòng dưới */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0"></div>
      <div className="container grid lg:grid-cols-2 gap-8 py-6 md:py-12 items-center relative z-10">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 pt-8 md:pt-0 text-center lg:text-left"
        >
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Bộ sưu tập cưới 2025
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Lưu giữ khoảnh khắc <br />
            <span className="text-primary">Hạnh phúc trọn đời</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
            Khám phá bộ sưu tập thiệp cưới độc đáo, sang trọng và hiện đại, giúp
            bạn tạo nên ngày trọng đại hoàn hảo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
            <Button size="lg" className="gap-2">
              Xem bộ sưu tập <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Tạo thiệp cưới ngay
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8">
            <StatisticBlock value="1,000+" label="Mẫu thiệp cưới" />
            <div className="hidden sm:block h-12 w-px bg-border"></div>
            <StatisticBlock value="500+" label="Khách hàng hài lòng" />
            <div className="hidden sm:block h-12 w-px bg-border"></div>
            <StatisticBlock value="50+" label="Đối tác uy tín" />
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full"
        >
          {isMounted && (
            <div className="relative w-full h-full rounded-xl overflow-hidden from-primary/5 to-primary/10">
              {/* Animated background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 animate-pulse"></div>
                <div
                  className="absolute w-[350px] h-[350px] rounded-full bg-primary/15 animate-pulse"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="absolute w-[300px] h-[300px] rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: "600ms" }}
                ></div>

              </div>
              {/* 3D Canvas */}
              <ThreeDCanvas modelError={modelError} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

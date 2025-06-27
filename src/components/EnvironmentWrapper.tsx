import { Environment } from "@react-three/drei";

export default function EnvironmentWrapper() {
  return (
    <Environment
      preset="dawn"
      background={false} // Don't render background for performance
      blur={0.8}
      resolution={256}
    />
  );
}

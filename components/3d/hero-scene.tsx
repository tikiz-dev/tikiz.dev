"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function DistortedOrb() {
  const mesh = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.15;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={mesh} scale={1.4}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#1fa7ff"
          roughness={0.2}
          metalness={0.85}
          distort={0.42}
          speed={1.3}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      /* Camera pulled back + smaller mesh scale = transparent padding
         around the sphere so the canvas edge never shows when the section
         clips. */
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <directionalLight position={[-3, -2, -1]} intensity={0.3} color="#ff9a46" />
      <DistortedOrb />
      <Environment preset="city" />
    </Canvas>
  );
}

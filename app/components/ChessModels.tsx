import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

export const ChessModel = ({ color }) => {
  const groupRef = useRef(); // Ref for chess piece group
  const mouseRef = useRef({ x: 0, y: 0 }); // Ref for mouse tracking

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // Normalize mouse X
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1; // Normalize mouse Y
    mouseRef.current = { x, y }; // Update mouse position
  };

  useEffect(() => {
    const animateRotation = () => {
      if (groupRef.current) {
        // Smooth auto-rotation
        groupRef.current.rotation.y += 0.001; // Auto-rotate around Y-axis

        // Smooth mouse influence
        groupRef.current.rotation.x +=
          (mouseRef.current.y * Math.PI * 0.1 - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.z +=
          (mouseRef.current.x * Math.PI * 0.1 - groupRef.current.rotation.z) * 0.05;
      }
      requestAnimationFrame(animateRotation);
    };
    animateRotation();
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove} // Track mouse movements
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas shadows camera={{ position: [20, 8, 41], fov: 35 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} position={[0, 0, 0]} />
        <spotLight
          intensity={1.5}
          angle={0.3}
          penumbra={1}
          position={[10, 10, 10]}
          castShadow
        />
        {/* Environment */}
        <Environment preset="sunset" />
        {/* Contact Shadows */}
        <ContactShadows
          resolution={512}
          position={[0, -10, 0]}
          opacity={0.6}
          scale={10}
          blur={2}
          far={0.8}
        />
        <BaseKing color={color} groupRef={groupRef} />
      </Canvas>
    </div>
  );
};

function BaseKing({ color, groupRef }) {
  const { nodes, materials } = useGLTF('/chess_peice_3d_model/base_king/white.glb');
  const spring = useSpring({
    scale: [1.1, 1.1, 1.1], // Slightly scale up for a dynamic look
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.group ref={groupRef} scale={spring.scale} dispose={null} position={[0, 5, 0]}>
      <mesh geometry={nodes["King"].geometry} rotation={[-0.5,0,0]} castShadow receiveShadow>
        <meshStandardMaterial roughness={0.17} map={materials["WoodenChessKingSideA"].map} />
      </mesh>
      {/* Base */}
      <mesh
        geometry={nodes["Base"].geometry}
        castShadow
        receiveShadow
        position={[0, -4.5, 0]}
        scale={0.5}
        rotation={color === "white" ? [0, -4, 0] : [0, 12, 0]}
      >
        <meshStandardMaterial
          metalness={2}
          roughness={0.17}
          color={color === "white" ? "#806969" : "black"}
        />
      </mesh>
    </animated.group>
  );
}

useGLTF.preload('/chess_peice_3d_model/base_king/white.glb');

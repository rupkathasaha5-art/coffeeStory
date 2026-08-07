// components/CoffeeCup.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, useGLTF } from '@react-three/drei';

//import coffeeCupModel from '../assets/coffee_cup.glb';

export default function CoffeeCup() {
  const cupRef = useRef();
  const scroll = useScroll();
  const { scene } = useGLTF('/coffee_cup.glb');
  useFrame(() => {
    if (!cupRef.current) return;
    
    const r = scroll.range(6 / 7, 1 / 7); 
    
    // Fixed: Scaling an object to exactly 0 can trigger Matrix errors in Three.js and cause rendering to fail.
    // Adjusted to a minimum scale of 0.001 to keep the math valid while effectively remaining invisible.
    cupRef.current.scale.setScalar(Math.max(r, 0.001));

    cupRef.current.position.y = -5 + (r * 4); 
    cupRef.current.position.z = r * 2;
    cupRef.current.rotation.y = r * Math.PI * 2;
  });

  return (
    <primitive 
      object={scene} 
      ref={cupRef} 
      position={[0, -5, 0]} 
    />
  );
}

useGLTF.preload('/coffee_cup.glb');


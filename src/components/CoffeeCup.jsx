import React, {useRef,useEffect} from 'react';
import {useFrame} from '@react-three/fiber';
import {useScroll,useGLTF} from '@react-three/drei';

export default function CoffeeCup() {
  const cupRef=useRef();
  const scroll=useScroll();
  const {scene}=useGLTF('/coffee_cup.glb');

  
  const CUP_SCALE_MULTIPLIER=15; 

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material) {
          child.material.roughness = 0.4;
          child.material.metalness = 0.2;
          child.material.needsUpdate = true;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);
  
  useFrame(() => {
    if (!cupRef.current) return;

    const r=scroll.range(7/8.2,1.2/8.2);
    //7/8.2->animation starts when the screen 7 out of 8.2 is reached
    //1.2/8.2->duration to finish the animation

    const scale=Math.max(r,0.001)*CUP_SCALE_MULTIPLIER;//creates the effect of the cup scaling up from microscopic to full-size
    cupRef.current.scale.setScalar(scale);

    // Starts at -6, but rises by 6. This brings its final resting position 
    // to 0 on the Y-axis (dead center of the screen), creating massive bottom padding.
    cupRef.current.position.y =-6+(r*6); 
    //when the scroll starts (r=0) the cup is hidden at -6 (off the bottom of the screen)
    // when the scroll ends (r=1), 1*6 is 6 and -6 + 6 equals 0,this forces the cup to slide up and stop perfectly center
    
    cupRef.current.position.z=0; 
    cupRef.current.rotation.x=r*0.5;//cup slides up this tilts the top of the cup forward towards the camera so we can look inside it 
    cupRef.current.rotation.y =r*Math.PI*2;//the cup slides up this forces it to do one complete spin
  });

  return (
    <primitive
      object={scene}
      ref={cupRef}
      position={[0,-6,0]}
    />
  );
}

useGLTF.preload('/coffee_cup.glb');
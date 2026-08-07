import React,{useRef,useEffect,useState} from 'react';
import {useFrame} from '@react-three/fiber';
import {useScroll,useGLTF} from '@react-three/drei';
import * as THREE from 'three';



export default function CoffeeBean() {
  const beanRef=useRef();//creates a label so we can grab the 3D bean later and move it around
  const scroll=useScroll();//useScroll:used to track how far a user has scrolled,scroll:grabs the current scroll position of the webpage
  const {scene}=useGLTF('/coffee_bean.glb');

  //for interaction
  const [hovered,setHovered]=useState(false);
  const [isDragging,setIsDragging]=useState(false);
  
  // Track manual rotation applied by dragging
  const [manualRotation,setManualRotation]=useState({x:0,y:0});
  const [previousPosition,setPreviousPosition]=useState({x:0,y:0});

  useEffect(() => {
    scene.traverse((child) => {//looks thru every single part of the model
      if (child.isMesh) {
        child.material.roughness = 0.35; 
        child.material.metalness = 0.1;
        child.material.color = new THREE.Color('#2b170b');
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);
  //changing the cursor
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor='grabbing';
    } else if (hovered) {
      document.body.style.cursor='grab';
    } else {
      document.body.style.cursor='auto';
    }
    return ()=>{document.body.style.cursor='auto'; };
  }, [hovered,isDragging]);

  //useFrame runs the code 60 times a second to create animations
  useFrame(()=>{
    if (!beanRef.current) return;//to check if the bean is fully loaded on the screen
    
    const offset=scroll.offset;//gets a no b/w 0->top of the page & 1->bottom of the page representing how far down the page the user has scrolled

    //throws the bean backward on scroll
    beanRef.current.position.z=Math.max(-offset*20,-10);
    
    // Smooth scaling for touch/hover feedback
    const targetScale=(hovered||isDragging)?1.2:1.0;//if the bean is hovered or dragged its bigger(20%) otherwise its normal 
    //lerp->linear interpolation(makes the animation smooth,without it the coffee bean would pop to the largest size instantly on hovering)
    beanRef.current.scale.lerp(new THREE.Vector3(targetScale,targetScale,targetScale),0.1);//the bean becomes bigger in the 3 axes by 20%
    //0.1->speed of lerp,means move 10% of the remaining distance until the ultimate largest size is reached

    //how much the coffee bean is spun around due to scroll and drag action
    beanRef.current.rotation.x=(offset*Math.PI*10)+manualRotation.x; 
    beanRef.current.rotation.y=(offset*Math.PI*6)+manualRotation.y;
  });

  const handlePointerDown = (e) => {//THE GRAB
    e.stopPropagation();//prevents clicking on things behind the bean
    e.target.setPointerCapture(e.pointerId);//locks the mouse to the bean so it keeps dragging even when the cursor moves very fast
    setIsDragging(true);
    setPreviousPosition({x:e.clientX,y:e.clientY});
  };

  const handlePointerMove = (e) => {//THE DRAG
    if (isDragging) {
      e.stopPropagation();
      const distX=e.clientX-previousPosition.x;
      const distY=e.clientY-previousPosition.y;

      setManualRotation((prev) => ({
        x:prev.x+distY*0.01,//0.01 is multiplied to slow down the spin
        y:prev.y+distX*0.01,
        //movement in Y causes tumling in the x and vice versa
      }));
      
      setPreviousPosition({x:e.clientX,y:e.clientY});
    }
  };

  const handlePointerUp = (e) => {//THE RELEASE
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  return (
    <primitive //primitive tag puts the bean on the screen
      object={scene} 
      ref={beanRef} 
      position={[0, 0, 1]} 
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}//in case the device forcefully interrupts the touch
    />
  );
}

useGLTF.preload('/coffee_bean.glb');//preloads the model into the browsers memory
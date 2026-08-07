// App.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import CoffeeBean from './components/CoffeeBean';
import Stage from './components/Stage';
import CoffeeCup from './components/CoffeeCup'; 

import fruitImg from './assets/fruit.jpg';
import dryingImg from './assets/drying.jpg';
import sortingImg from './assets/sorting.jpg';
import roastingImg from './assets/roasting.jpg';
import grindingImg from './assets/grinding.jpg';
import brewingImg from './assets/brewing.jpg';

const stagesData = [
  { title: "Cultivation & Harvesting", image: fruitImg, description: "Coffee begins as a bright red cherry on a shrub, carefully cultivated and picked at peak ripeness." },
  { title: "Processing & Drying", image: dryingImg, description: "The cherries are processed to reveal the green beans, which are then laid out in the sun to dry." },
  { title: "Milling & Export", image: sortingImg, description: "Dried beans are milled, sorted by size and density, and packed into burlap sacks for global shipping." },
  { title: "Roasting", image: roastingImg, description: "Green beans are heated in large drums, transforming them into the aromatic brown beans we know." },
  { title: "Grinding", image: grindingImg, description: "Roasted beans are crushed into grounds to increase surface area for proper extraction." },
  { title: "Brewing", image: brewingImg, description: "Hot water meets the coffee grounds, extracting the rich oils and flavors into the final beverage." }
];

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundImage: 'radial-gradient(circle at 50% 50%, #F5DEB3 0%, #C49A6C 100%)', margin: 0, padding: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={2.5} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffd4a3" />
        <Environment preset="city" />

        <ScrollControls pages={8} damping={0.25}>
          <Scroll>
            {/* Added Suspense boundary: React Three Fiber requires this to prevent crashes when async models are loading */}
            <Suspense fallback={null}>
              <CoffeeBean />
              <CoffeeCup />
            </Suspense>
          </Scroll>

          <Scroll html style={{ width: '100%' }}>
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.h1 
                initial={{ opacity: 0, y: 30, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.25em' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ fontSize: '6rem', color: '#3e2723', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: '900', textTransform: 'uppercase', textShadow: '0px 10px 25px rgba(62, 39, 35, 0.3)', textAlign: 'center', pointerEvents: 'none' }}>
                Story of Coffee
              </motion.h1>
            </div>

            {stagesData.map((stage, index) => (
              <Stage key={index} index={index} title={stage.title} description={stage.description} image={stage.image} />
            ))}

            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.h2 
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: '4.5rem', color: '#3e2723', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: '900', textShadow: '0px 10px 25px rgba(62, 39, 35, 0.3)', textAlign: 'center', marginTop: '40vh' }}>
                Your coffee is ready.
              </motion.h2>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
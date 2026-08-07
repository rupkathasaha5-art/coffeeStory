import React,{Suspense} from 'react';//Suspense: a tool that tells React to wait for something (like a heavy 3D model) to load before trying to render it
import {Canvas} from '@react-three/fiber';
import {ScrollControls,Scroll,Environment} from '@react-three/drei';
/*ScrollControls manages the math of scrolling a 3D scene, 
Scroll separates 3D elements from 2D HTML elements,
Environment provides realistic pre-calculated lighting/reflections*/
import {motion} from 'framer-motion';
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
  {title:"Cultivation & Harvesting", image: fruitImg, description: "Coffee begins as a bright red cherry on a shrub, carefully cultivated and picked at peak ripeness." },
  {title:"Processing & Drying", image: dryingImg, description: "The cherries are processed to reveal the green beans, which are then laid out in the sun to dry." },
  {title:"Milling & Export", image: sortingImg, description: "Dried beans are milled, sorted by size and density, and packed into burlap sacks for global shipping." },
  {title:"Roasting", image: roastingImg, description: "Green beans are heated in large drums, transforming them into the aromatic brown beans we know." },
  {title:"Grinding", image: grindingImg, description: "Roasted beans are crushed into grounds to increase surface area for proper extraction." },
  {title:"Brewing", image: brewingImg, description: "Hot water meets the coffee grounds, extracting the rich oils and flavors into the final beverage." }
];

export default function App() {
  return (
    <div style={{width:'100vw',height:'100vh',backgroundImage:'radial-gradient(circle at 50% 50%, #FFF0D4 0%, #8D5B36 85%, #5C381D 100%)',margin:0,padding:0}}>
      <Canvas camera={{position:[0,0,5],fov:50}}>
        <ambientLight intensity={0.4} />
        {/*light acting like sun behind clouds*/}
        <spotLight position={[5,5,5]} angle={0.15} penumbra={1} intensity={2.5} castShadow />
        {/*Acts like a strong studio lamp shining down from the top-right-front
         penumbra={1} blurs the edges of the light so the shadows look soft and realistic*/}
        <pointLight position={[-5,-5,-5]} intensity={0.5} color="#ffd4a3" />
        {/* Acts like a warm, glowing lightbulb placed in the bottom-left-back of the scene
    this creates a "rim light" effect on the edges of models
         to make them pop against the background*/}
        <Environment preset="city" />

        {/* Keeping 8.2 for the physical scroll buffer */}
        <ScrollControls pages={8.2} damping={0.25}>
          {/*damping:when the user stops scrolling the website doesn't stop instantly it glides to a stop smoothly over 0.25 seconds
          pages:the browser creates a scrollbar that allows the user to scroll down a distance equal to 8 full screens stacked on top of each other*/}
          <Suspense fallback={null}>{/*if the models take a second to download, it renders null (nothing) instead of crashing the website */}
            <CoffeeBean />
            <CoffeeCup />
          </Suspense>

          <Scroll html style={{width:'100%'}}>{/* tells the canvas everything inside here is 2d layer it perfectly on top of the 3D world*/}
            <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {/*-----"STORY OF COFFEE animation---------" */}
              <motion.h1 
                initial={{opacity:0,y:30,letterSpacing:'0.1em'}}
                animate={{opacity:1,y:0,letterSpacing:'0.25em'}}
                transition={{duration:1.5,ease:"easeOut"}}
                style={{ 
                  fontSize:'6rem',color:'#F5E6D3',fontFamily:'"Playfair Display",Georgia,serif',fontWeight:'900',textTransform:'uppercase',textShadow:'0 2px 4px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), 0 0 30px rgba(62,39,35,0.6)',textAlign:'center',pointerEvents:'none' 
                }}>
                Story of Coffee
              </motion.h1>
            </div>
            {/*--------------LOADING ALL THE STAGES-------------- */}
            {stagesData.map((stage, index) => (
              <Stage key={index} index={index} title={stage.title} description={stage.description} image={stage.image} />
            ))}


            <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {/*-----"Your coffee is ready! animation---------" */}
              <motion.h2 
                initial={{opacity:0,scale:0.8,y:50}}
                whileInView={{opacity:1,scale:1,y:0}}
                viewport={{once:false,amount:0.5}}
                transition={{duration:1,ease:[0.16,1,0.3,1]}}
                style={{ 
                  //fontSize: '4.5rem', color: '#F5E6D3', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: '900', textShadow: '0px 10px 25px rgba(62, 39, 35, 0.3)', textAlign: 'center', 
                  fontSize:'3rem',color:'#F5E6D3',fontFamily:'"Playfair Display",Georgia,serif',fontWeight:'900',textShadow:'0 2px 4px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), 0 0 30px rgba(62,39,35,0.6)',textAlign:'center',pointerEvents:'none' ,
                  marginTop:'-45vh' //pushed the text up even higher to match the new cup height
                }}>
                Your coffee is ready!
              </motion.h2>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
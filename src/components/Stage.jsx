import React from 'react';
import { motion } from 'framer-motion';

export default function Stage({ title, description, image, index }) {
  const isEven = index % 2 === 0;

  // Smoother animations combining scale, opacity, and custom easing
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: isEven ? -60 : 60 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: isEven ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: '100vh',
      padding: '0 10%',
      overflow: 'hidden'
    }}>
      
      <motion.img
        src={image}
        alt={title}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        variants={imageVariants}
        style={{ 
          width: '40%', 
          maxHeight: '60vh',
          borderRadius: '24px', 
          objectFit: 'cover',
          boxShadow: '0 20px 40px rgba(62, 39, 35, 0.25)'
        }}
      />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        variants={textVariants}
        style={{ width: '40%', color: '#3e2723' }}
      >
        <h2 style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem', 
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: '700'
        }}>
          {title}
        </h2>
        <p style={{ 
          fontSize: '1.25rem', 
          lineHeight: '1.8',
          fontFamily: '"Inter", sans-serif',
          color: '#5a3d31'
        }}>
          {description}
        </p>
      </motion.div>
      
    </div>
  );
}
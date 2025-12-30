import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEnergy = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* 1. Base Mesh Grid - Interconnected nodes feel */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #0066FF 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 102, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 102, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(circle at 60% 40%, black, transparent 70%)'
        }}
      />

      {/* 2. Glassmorphic Electric Web Pattern (Left Side Balance) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-contain bg-no-repeat opacity-20 mix-blend-screen"
        style={{
          backgroundImage: "url('https://horizons-cdn.hostinger.com/ff7a3d8f-2894-49d9-aa19-275af81f136a/b0e084ba2ea69ebb6b544bbb90a7aa0c.jpg')",
          filter: "hue-rotate(15deg) brightness(1.2) blur(2px)" 
        }}
      />

      {/* 3. Primary Electric Source (Right Side Origin) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: [0.2, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-[-10%] w-[70%] h-[120%] bg-cover bg-left opacity-30 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('https://horizons-cdn.hostinger.com/ff7a3d8f-2894-49d9-aa19-275af81f136a/86cb0fdc565e812f8280a286b06a763f.jpg')",
          filter: "drop-shadow(0 0 20px #0066FF) blur(1px)",
          transform: "rotate(-15deg)"
        }}
      />

      {/* 4. Flowing Electrical Currents (Spiraling Down) */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Curved Lines representing electricity flow */}
        {[...Array(4)].map((_, i) => (
          <motion.path
            key={`bolt-${i}`}
            d={`M ${100 - i * 10} 0 Q ${60 + i * 10} 40, ${80 - i * 20} 100`}
            stroke="url(#grad1)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0],
              strokeDashoffset: [0, -100]
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5
            }}
          />
        ))}
        
        {/* Subtle Horizontal Pulse across Hero/Subheading areas */}
        <motion.rect
           x="0"
           y="20%"
           width="100%"
           height="2"
           fill="url(#grad1)"
           filter="url(#glow)"
           opacity="0.2"
           animate={{
             x: ['-100%', '100%'],
             opacity: [0, 0.3, 0]
           }}
           transition={{
             duration: 8,
             repeat: Infinity,
             ease: "linear"
           }}
        />
      </svg>

      {/* 5. Ambient Blue Glow overlay for glassmorphic feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0066FF]/5 to-black/80 pointer-events-none mix-blend-overlay" />
    </div>
  );
};

export default BackgroundEnergy;
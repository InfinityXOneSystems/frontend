import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const FuturePage = () => {
  const teasers = [
    "Markets that run themselves", 
    "Companies that operate automatically", 
    "Trust systems you can verify", 
    "Governance built on AI", 
    "Intelligence that predicts society's needs"
  ];

  return (
    <>
      <Helmet><title>The Future | Infinity X</title></Helmet>
      <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Animation */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0066FF]/50 to-transparent" />
           <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/ff7a3d8f-2894-49d9-aa19-275af81f136a/1f82d85f71e26a337aaa7b8ec54d453c.jpg')] bg-cover opacity-10 mix-blend-screen" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
           <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none">
             THE FUTURE IS <br />
             <span className="text-[#0066FF] text-glow">ALREADY MOVING</span>
           </h1>
           
           <p className="text-xl text-white/70 font-light mb-16 max-w-2xl mx-auto">
             We aren&apos;t just building software. We&apos;re creating the foundation for a world where technology handles the work, so you can focus on the vision.
           </p>

           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20 text-left">
              {teasers.map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="glass-panel p-6 rounded-xl border-l-4 border-l-[#0066FF] hover:bg-[#0066FF]/10 transition-colors"
                 >
                    <span className="text-lg font-light text-white">{item}</span>
                 </motion.div>
              ))}
           </div>

           <button className="px-12 py-5 bg-[#0066FF] text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_40px_rgba(0,102,255,0.4)] rounded-lg">
              Join Early Access
           </button>
        </motion.div>
      </div>
    </>
  );
};

export default FuturePage;
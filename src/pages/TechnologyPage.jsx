import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const TechnologyPage = () => {
  return (
    <>
      <Helmet><title>Technology | Infinity X</title></Helmet>
      <div className="min-h-screen pt-40 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <div className="w-20 h-20 mx-auto bg-[#0066FF]/10 rounded-full flex items-center justify-center border border-[#0066FF] mb-12 shadow-[0_0_40px_rgba(0,102,255,0.2)] animate-pulse-slow">
                <div className="w-3 h-3 bg-[#0066FF] rounded-full shadow-[0_0_15px_#0066FF]" />
             </div>
             
             <h1 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight">
               We don&apos;t just sell tools. <br />
               We deliver <span className="text-[#0066FF]">results.</span>
             </h1>
             
             <p className="text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
               Most tech companies sell you a shovel and wish you luck. We build the autonomous machines that dig the foundation while you sleep. Infinity X isn&apos;t just about finishing tasks; it&apos;s about constantly improving your business goals on its own.
             </p>
           </motion.div>
        </div>
      </div>
    </>
  );
};

export default TechnologyPage;
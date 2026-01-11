import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuantumXPage = () => {
  const navigate = useNavigate();

  const steps = [
    { title: "Describe It", desc: "Tell us what you need in plain English. No coding required." },
    { title: "We Plan It", desc: "Quantum X figures out the best database and setup for your needs." },
    { title: "We Build It", desc: "The system writes the code and builds the infrastructure automatically." },
    { title: "It's Live", desc: "Your project is deployed to the cloud instantly." }
  ];

  return (
    <>
      <Helmet><title>Quantum X Builder | Infinity X</title></Helmet>
      <div className="min-h-screen pt-32 pb-20 px-6 overflow-hidden">
        
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
             <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
               QUANTUM X <span className="text-[#0066FF] text-glow">BUILDER</span>
             </h1>
             <p className="text-xl text-white/70 font-light max-w-2xl mx-auto mb-12">
               The tool that builds tools. Go from a simple idea to a fully running system in minutes, not months.
             </p>
             
             <div className="inline-flex gap-4">
               <button className="px-8 py-3 bg-[#0066FF] text-white font-bold tracking-widest text-xs uppercase hover:bg-[#0052cc] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] rounded-lg">
                 Start Building
               </button>
               <button className="px-8 py-3 border border-white/20 text-white font-bold tracking-widest text-xs uppercase hover:border-[#0066FF] hover:text-[#0066FF] transition-all rounded-lg">
                 How it Works
               </button>
             </div>
          </motion.div>
        </div>

        {/* 4-Step Flow */}
        <div className="max-w-7xl mx-auto mb-32 relative">
           {/* Connecting Line */}
           <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent hidden lg:block" />
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {steps.map((step, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.2 }}
                 className="glass-panel p-8 rounded-2xl relative z-10 text-center group hover:-translate-y-2 transition-transform duration-300 bg-black/80"
               >
                 <div className="w-12 h-12 mx-auto bg-[#0066FF]/10 rounded-full flex items-center justify-center border border-[#0066FF]/30 mb-6 text-[#0066FF] text-xl font-bold group-hover:scale-110 transition-transform">
                   {i + 1}
                 </div>
                 <h3 className="text-lg font-bold mb-3 group-hover:text-[#0066FF] transition-colors">{step.title}</h3>
                 <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
               </motion.div>
             ))}
           </div>
        </div>

        {/* Interactive Visual Section */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center mb-32">
           <div className="relative aspect-square rounded-3xl overflow-hidden border border-[#0066FF]/20">
              <div className="absolute inset-0 bg-[#0066FF]/10 blur-[100px]" />
              <img-replace 
                 src="https://horizons-cdn.hostinger.com/ff7a3d8f-2894-49d9-aa19-275af81f136a/aac2d3ec47a7da90ad2d220df35d9b47.jpg" 
                 alt="Simplified code generation visual"
                 className="relative z-10 w-full h-full object-cover" 
              />
           </div>
           
           <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Built-in Trust</h2>
              <div className="space-y-8">
                 <p className="text-white/70 text-lg font-light leading-relaxed">
                   Quantum X doesn&apos;t just blindly write code. It understands security, how to handle lots of users, and the best way to build things so they last.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                       <Shield className="text-[#0066FF] mb-3" />
                       <h4 className="font-bold mb-1">Secure by Default</h4>
                       <p className="text-xs text-white/50">Every line of code is checked for safety.</p>
                    </div>
                    <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                       <Server className="text-[#0066FF] mb-3" />
                       <h4 className="font-bold mb-1">Auto-Scaling</h4>
                       <p className="text-xs text-white/50">It grows automatically as you get more users.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default QuantumXPage;
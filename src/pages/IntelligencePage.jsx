import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Coins, HardHat, Cpu, Cloud, Settings, Megaphone, DollarSign } from 'lucide-react';

const IntelligencePage = () => {
  const industries = [
    { name: "Real Estate", icon: <Building2 size={24} />, active: true },
    { name: "Finance", icon: <TrendingUp size={24} /> },
    { name: "Crypto", icon: <Coins size={24} /> },
    { name: "Construction", icon: <HardHat size={24} /> },
    { name: "AI Industry", icon: <Cpu size={24} /> },
    { name: "SaaS", icon: <Cloud size={24} /> },
    { name: "Automation", icon: <Settings size={24} /> },
    { name: "Marketing", icon: <Megaphone size={24} /> },
    { name: "Sales", icon: <DollarSign size={24} /> },
  ];

  return (
    <>
      <Helmet><title>Infinity X One Intelligence</title></Helmet>
      <div className="min-h-screen pt-32 pb-20 px-6">
        
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-24">
           <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
             Infinity X One <span className="text-[#0066FF]">Intelligence</span>
           </h1>
           <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
             Real insights from millions of data points. We focus on the truth, not just what everyone else is saying.
           </p>
        </div>

        {/* 9-Card Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 mb-32">
           {industries.map((ind, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className={`glass-panel p-8 rounded-2xl flex flex-col items-center justify-center gap-4 text-center cursor-pointer group transition-all duration-500 ${ind.active ? 'border-[#0066FF] bg-[#0066FF]/10' : 'hover:border-[#0066FF]/50'}`}
             >
               <div className={`p-4 rounded-full ${ind.active ? 'bg-[#0066FF] text-white' : 'bg-white/5 text-white/50 group-hover:text-[#0066FF] group-hover:bg-[#0066FF]/20'} transition-colors`}>
                 {ind.icon}
               </div>
               <h3 className={`font-bold tracking-wide ${ind.active ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{ind.name}</h3>
             </motion.div>
           ))}
        </div>

        {/* Real Estate Feature Section */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center glass-panel p-12 rounded-3xl border border-[#0066FF]/20 bg-black/40">
           <div className="space-y-6">
              <div className="text-[#0066FF] font-bold tracking-widest text-xs uppercase mb-2">Featured Sector</div>
              <h2 className="text-4xl font-bold mb-4">Real Estate Intelligence</h2>
              <p className="text-white/70 text-lg leading-relaxed font-light">
                 We analyze zoning laws, market changes, and where people are moving to find you the best opportunities before they hit the open market.
              </p>
              <ul className="space-y-4 pt-4">
                 {["Find deals no one else sees", "Predict neighborhood changes", "Automated risk checking"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                       <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full" /> {item}
                    </li>
                 ))}
              </ul>
              <button className="mt-6 px-8 py-3 bg-[#0066FF] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#0052cc] transition-colors rounded-lg">
                 See the Data
              </button>
           </div>
           <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden border border-white/10">
              <img-replace 
                 src="https://horizons-cdn.hostinger.com/ff7a3d8f-2894-49d9-aa19-275af81f136a/380812bfb6678344cc9093ee76cf1586.jpg" 
                 alt="Real estate data map" 
                 className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0066FF]/20 mix-blend-overlay" />
           </div>
        </div>

      </div>
    </>
  );
};

export default IntelligencePage;
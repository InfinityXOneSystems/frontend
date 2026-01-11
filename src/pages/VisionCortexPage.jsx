import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Zap, Activity, Eye, Brain, Settings, Database } from 'lucide-react';

const VisionCortexPage = () => {
  const [input, setInput] = useState('');

  const sidebarItems = [
    { icon: <Activity size={18} />, label: "Your Feed" },
    { icon: <Eye size={18} />, label: "Focus" },
    { icon: <Zap size={18} />, label: "Opportunities" },
    { icon: <Brain size={18} />, label: "Strategy" },
    { icon: <Database size={18} />, label: "Memory" },
    { icon: <Settings size={18} />, label: "Settings" }
  ];

  return (
    <>
      <Helmet><title>Vision Cortex | Infinity X</title></Helmet>
      <div className="min-h-screen pt-24 px-6 pb-6 flex gap-6 max-w-[1600px] mx-auto">
        
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 glass-panel rounded-2xl hidden lg:flex flex-col py-6"
        >
          <div className="px-6 mb-8">
            <h2 className="text-xs font-bold text-[#0066FF] tracking-[0.2em] uppercase mb-1">System</h2>
            <div className="text-xl font-bold text-white">Cortex V4</div>
          </div>
          
          <nav className="flex-1 px-3 space-y-1">
            {sidebarItems.map((item, i) => (
              <button key={i} className="flex items-center gap-3 w-full p-3 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-light">
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="px-6 mt-auto">
            <div className="flex items-center gap-2 text-xs text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Connected
            </div>
          </div>
        </motion.aside>

        {/* Main Interface */}
        <main className="flex-1 flex flex-col glass-panel rounded-2xl overflow-hidden relative">
          {/* Header */}
          <header className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div>
              <h1 className="text-2xl font-bold text-white">Vision Cortex</h1>
              <p className="text-white/40 text-xs mt-1">Your AI Thinking Partner</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-xs">
              <Zap size={12} /> Online
            </div>
          </header>

          {/* Chat / Content Area */}
          <div className="flex-1 p-8 overflow-y-auto relative">
            <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/ff7a3d8f-2894-49d9-aa19-275af81f136a/ff164e323a6971dca90f2becdbceaa13.jpg')] bg-cover opacity-5 pointer-events-none mix-blend-screen" />
            
            <div className="max-w-3xl mx-auto space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#0066FF]/20 flex items-center justify-center border border-[#0066FF]/30 shrink-0">
                  <Brain size={20} className="text-[#0066FF]" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-bold text-[#0066FF]">VISION CORTEX</div>
                  <p className="text-white/80 leading-relaxed font-light">
                    Hi there. I&apos;m ready to help you solve problems, write code, or plan your next strategic move. What&apos;s on your mind today?
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/5 bg-black/40">
            <div className="max-w-3xl mx-auto relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-14 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors placeholder:text-white/20 font-light"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#0066FF] text-white hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.4)]">
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-[10px] text-white/20 uppercase tracking-widest">Powered by Infinity XOS</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default VisionCortexPage;
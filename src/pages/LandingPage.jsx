
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Brain, 
  Cpu, 
  Globe, 
  Shield, 
  Zap, 
  Activity, 
  Network, 
  Users, 
  CheckCircle,
  BarChart,
  Lock
} from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import NeuralNetworkCanvas from '@/components/NeuralNetworkCanvas';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Global Neural Grid",
      desc: "Distributed intelligence nodes processing data across 140+ countries in real-time.",
      icon: <Globe className="text-[#0066FF]" size={24} />
    },
    {
      title: "Quantum Encryption",
      desc: "Military-grade post-quantum cryptography ensuring your data remains sovereign.",
      icon: <Lock className="text-[#0066FF]" size={24} />
    },
    {
      title: "Predictive Analytics",
      desc: "AI models that don&apos;t just analyze the past, but accurately forecast market vectors.",
      icon: <BarChart className="text-[#0066FF]" size={24} />
    },
    {
      title: "Autonomous Agents",
      desc: "Deploy self-learning agents that execute complex workflows without supervision.",
      icon: <Brain className="text-[#0066FF]" size={24} />
    }
  ];

  const team = [
    {
      name: "Dr. Elena Vosk",
      role: "Chief Architect",
      bio: "Former lead researcher at CERN. Pioneer in distributed neural networks.",
      imgAlt: "Woman with short hair in futuristic lab coat"
    },
    {
      name: "Marcus Thorne",
      role: "Head of Security",
      bio: "20 years in cybersecurity intelligence. Architect of the Titan Protocol.",
      imgAlt: "Man with glasses looking at multiple screens"
    },
    {
      name: "Sarah Chen",
      role: "VP of AI Alignment",
      bio: "Ensuring our autonomous systems remain beneficial and controllable.",
      imgAlt: "Asian woman presenting data visualization"
    }
  ];

  const testimonials = [
    {
      quote: "The predictive accuracy of the Cortex engine is terrifyingly good. It saved us millions in Q4 alone.",
      author: "James K.",
      role: "CTO, FinTech Global"
    },
    {
      quote: "Finally, an intelligence network that respects data sovereignty while delivering enterprise-grade insights.",
      author: "Maria L.",
      role: "Director of Operations, Nexus Corp"
    },
    {
      quote: "We replaced our entire analyst team with three autonomous agents. Efficiency up 400%.",
      author: "David R.",
      role: "Founder, Alpha Stream"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Infinity X AI | Intelligence Data Network</title>
        <meta name="description" content="The world&apos;s most advanced decentralized intelligence network." />
      </Helmet>
      
      <div className="relative w-full overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0066FF]/10 via-[rgb(var(--background))] to-[rgb(var(--background))]" />
          
          <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center text-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/5 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
              <span className="text-[#0066FF] text-[10px] tracking-widest uppercase font-bold">System Online v4.2</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6 text-glow-cyber"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              INTELLIGENCE <br />
              <span className="text-[#0066FF] text-glow">REDEFINED</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-[rgb(var(--light-gray-text))] max-w-3xl font-light leading-relaxed mb-10"
            >
              We are building the neural architecture for the next generation of business. 
              Real-time data. Autonomous agents. Absolute clarity.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg"
                onClick={() => navigate('/pricing')}
                className="bg-[#0066FF] hover:bg-[#0052cc] text-white px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_40px_rgba(0,102,255,0.6)] transition-all"
              >
                Initialize Access
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                className="border-[#0066FF]/30 text-[rgb(var(--foreground))] hover:bg-[#0066FF]/10 px-8 py-6 text-lg rounded-full"
              >
                System Architecture
              </Button>
            </motion.div>
          </div>
          
          {/* Hero Visual - Animated Neural Network */}
          <div className="mt-20 relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-t-3xl overflow-hidden border-t border-x border-[#0066FF]/20 glass-panel shadow-[0_0_50px_rgba(0,102,255,0.1)]">
             
             {/* Interactive Canvas Background */}
             <div className="absolute inset-0 z-0 bg-[#050a14]/40">
                <NeuralNetworkCanvas />
             </div>

             {/* Fade gradient to blend with next section */}
             <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[rgb(var(--background))]" />
             
             {/* HUD Element Overlay */}
             <div className="absolute top-6 left-6 z-20 hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                <span className="text-[#0066FF] text-[10px] font-mono tracking-widest uppercase">Neural Grid Active</span>
             </div>

             <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-2">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-1 h-6 bg-[#0066FF]/20 rounded-full overflow-hidden">
                       <div className="w-full h-full bg-[#0066FF] animate-scanline" style={{ animationDelay: `${i * 0.2}s`}} />
                    </div>
                 ))}
             </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-32 relative bg-[rgb(var(--panel-bg))]/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 text-[rgb(var(--foreground))]">Core Capabilities</h2>
              <div className="h-1 w-20 bg-[#0066FF] mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-8 rounded-2xl hover:bg-[#0066FF]/5 transition-colors group"
                >
                  <div className="mb-6 p-4 bg-[#0066FF]/10 rounded-xl w-fit group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-300">
                    {React.cloneElement(feature.icon, { className: "group-hover:text-white transition-colors text-[#0066FF]" })}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[rgb(var(--foreground))]">{feature.title}</h3>
                  <p className="text-[rgb(var(--light-gray-text))] text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-[rgb(var(--foreground))]">
                  Transform Data into <span className="text-[#0066FF]">Dominance</span>
                </h2>
                <div className="space-y-12">
                  {[
                    { title: "Connect", desc: "Integrate your data streams securely via our API gateway.", icon: <Zap /> },
                    { title: "Process", desc: "Our neural cortex analyzes patterns across millions of data points.", icon: <Cpu /> },
                    { title: "Execute", desc: "Receive actionable intelligence or let agents act autonomously.", icon: <Activity /> }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#0066FF] flex items-center justify-center text-[#0066FF] font-bold relative">
                        {step.icon}
                        {i !== 2 && <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-[#0066FF]/30" />}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-[rgb(var(--foreground))]">{step.title}</h4>
                        <p className="text-[rgb(var(--light-gray-text))]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[#0066FF] blur-[100px] opacity-10 rounded-full" />
                <div className="relative z-10 glass-panel rounded-2xl p-2 border border-[#0066FF]/20">
                   <img-replace 
                     src="https://horizons-cdn.hostinger.com/ff7a3d8f-2894-49d9-aa19-275af81f136a/4f27521c7d23f79391e6047da034604d.jpg"
                     alt="Abstract data visualization dashboard" 
                     className="rounded-xl w-full h-auto"
                   />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 bg-[rgb(var(--panel-bg))]/50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-[rgb(var(--foreground))]">SECTOR REPORT</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-8 rounded-xl border-t-4 border-t-[#0066FF]"
                >
                  <div className="mb-6 text-[#0066FF]">
                    {[1,2,3,4,5].map(star => <span key={star} className="text-lg">★</span>)}
                  </div>
                  <p className="text-lg italic text-[rgb(var(--light-gray-text))] mb-8">&quot;{t.quote}&quot;</p>
                  <div>
                    <div className="font-bold text-[rgb(var(--foreground))]">{t.author}</div>
                    <div className="text-xs uppercase tracking-wider text-[#0066FF]">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold tracking-widest uppercase text-[rgb(var(--foreground))]">The Architects</h2>
              <p className="text-[rgb(var(--light-gray-text))] mt-4">Built by veterans from CERN, NSA, and DeepMind.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {team.map((member, i) => (
                <div key={i} className="group relative">
                  <div className="aspect-[4/5] overflow-hidden rounded-lg mb-6 relative">
                    <img-replace 
                      src="https://horizons-cdn.hostinger.com/ff7a3d8f-2894-49d9-aa19-275af81f136a/e542ef99834156681729b53194a2b254.jpg"
                      alt={member.imgAlt} 
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 p-6">
                       <h3 className="text-xl font-bold text-white">{member.name}</h3>
                       <p className="text-[#0066FF] text-sm uppercase tracking-widest">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-[rgb(var(--light-gray-text))] text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT / CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0066FF] opacity-5 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl font-bold mb-8 text-[rgb(var(--foreground))]">Ready to Deploy?</h2>
            <p className="text-xl text-[rgb(var(--light-gray-text))] mb-12">
              Join the network today. Secure your node and begin processing real-time intelligence immediately.
            </p>
            
            <form className="max-w-md mx-auto mb-12 space-y-4 text-left">
              <div>
                <label className="text-xs uppercase font-bold text-[rgb(var(--light-gray-text))] ml-1">Work Email</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full mt-2 px-6 py-4 rounded-lg bg-[rgb(var(--panel-bg))] border border-[rgb(var(--foreground))]/10 focus:border-[#0066FF] outline-none transition-colors text-[rgb(var(--foreground))]"
                />
              </div>
              <Button className="w-full bg-[#0066FF] hover:bg-[#0052cc] py-6 text-lg rounded-lg">
                Request Access
              </Button>
            </form>
            
            <p className="text-xs text-[rgb(var(--light-gray-text))] opacity-50">
              Encrypted transmission. By requesting access you agree to the Titan Protocol Terms.
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default LandingPage;

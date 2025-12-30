import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Zap, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import BackgroundEnergy from '@/components/BackgroundEnergy';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Default to dark mode for that electric feel
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem('infinity_auth');
    setIsAuthenticated(!!auth);
  }, [location]);

  // Theme Toggle Effect
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/vision-cortex', label: 'Cortex' },
    { path: '/quantum-x-builder', label: 'Builder' },
    { path: '/intelligence', label: 'Intel' },
    { path: '/pricing', label: 'Access' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-light overflow-x-hidden selection:bg-[#0066FF] selection:text-white">
      {/* 
        BackgroundEnergy is designed with a fixed black background.
        In Light Mode, we hide it to reveal the white body background defined in index.css
      */}
      {theme === 'dark' && <BackgroundEnergy />}
      
      {/* Light Mode ambient background (Optional replacement for energy mesh) */}
      {theme === 'light' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
          <div className="absolute inset-0 opacity-30"
             style={{
               backgroundImage: `radial-gradient(circle at center, #0066FF 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }} 
          />
        </div>
      )}
      
      {/* Tech-inspired Holographic Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="relative backdrop-blur-xl bg-[rgb(var(--panel-bg))]/70 border-b border-[#0066FF]/30 rounded-full px-8 py-3 flex items-center gap-10 max-w-6xl w-full justify-between shadow-[0_0_30px_rgba(0,102,255,0.15)] transition-colors duration-300"
        >
          {/* Glowing Border Bottom Effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-50" />

          <Link to="/" className="flex items-center group relative z-10">
             <div className="relative flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(0,102,255,0.5)]">
                <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0066FF] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_#0066FF]">
                   {/* Outer Triangle */}
                   <path 
                      d="M16 4L4 28H28L23 18M20 12L16 4" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                   />
                   
                   {/* The eye design elements have been removed as requested */}
                </svg>
             </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 relative group overflow-hidden rounded-full",
                  location.pathname === link.path ? "text-[rgb(var(--foreground))]" : "text-[rgb(var(--light-gray-text))]/80 hover:text-[rgb(var(--foreground))]"
                )}
              >
                <span className="relative z-10">{link.label}</span>
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-bg" 
                    className="absolute inset-0 bg-[#0066FF]/20 border border-[#0066FF]/30 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="absolute inset-0 bg-[rgb(var(--foreground))]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 relative z-10">
             {/* Theme Toggle */}
             <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[#0066FF]/10 text-[rgb(var(--light-gray-text))]/80 hover:text-[#0066FF] transition-colors"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
             >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>

             {isAuthenticated ? (
               <Link to="/admin" className="group">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/50 text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                    <Shield size={14} />
                    <span className="text-xs font-bold tracking-wider">ADMIN</span>
                  </div>
               </Link>
             ) : (
               <Link to="/auth" className="text-xs text-[rgb(var(--light-gray-text))]/80 hover:text-[#0066FF] transition-colors uppercase tracking-widest mr-2">
                  Log In
               </Link>
             )}
             
             <Link to="/pricing">
                <button className="relative px-6 py-2 overflow-hidden group rounded-full">
                   <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#0066FF] to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                   <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-10 group-hover:rotate-90 ease"></span>
                   <span className="relative text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                     <Zap size={12} className="fill-white" /> Access
                   </span>
                </button>
             </Link>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[#0066FF]/10 text-[rgb(var(--light-gray-text))]/80 hover:text-[#0066FF] transition-colors"
             >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>
            <button 
              className="p-2 text-[rgb(var(--foreground))] hover:text-[#0066FF]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay - Full Tech Grid */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[rgb(var(--background))]/95 backdrop-blur-xl border-l border-[#0066FF]/20 flex flex-col pt-32 px-10"
          >
            <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/ff7a3d8f-2894-49d9-aa19-275af81f136a/ff164e323a6971dca90f2becdbceaa13.jpg')] bg-cover opacity-10 pointer-events-none" />
            
            <div className="flex flex-col gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-4 text-3xl font-light tracking-tight text-[rgb(var(--foreground))] hover:text-[#0066FF] transition-all"
                >
                  <span className="text-xs font-mono text-[#0066FF]/50 border border-[#0066FF]/30 px-2 py-1 rounded">0{i + 1}</span>
                  {link.label}
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#0066FF]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
              
              {isAuthenticated && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-light tracking-tight text-[#0066FF] hover:text-[rgb(var(--foreground))] transition-all flex items-center gap-4 mt-8 pt-8 border-t border-[#0066FF]/20"
                >
                  <Shield size={24} />
                  Admin Console
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 relative z-10 pt-32">
        <Outlet />
      </main>

      <footer className="relative z-10 py-16 px-6 border-t border-[#0066FF]/10 bg-[rgb(var(--panel-bg))]/80 backdrop-blur-md mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-sm">
          <div className="col-span-2">
            {/* Updated footer logo text */}
            <h3 className="text-2xl font-bold tracking-widest mb-6 text-[rgb(var(--foreground))]">Infinity X AI</h3>
            <p className="text-[rgb(var(--light-gray-text))] max-w-sm leading-relaxed mb-8">
              Constructing the neural architecture for the next generation of autonomous intelligence. 
              We build the systems that build the future.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'GitHub', 'Discord'].map(social => (
                <a key={social} href="#" className="text-[rgb(var(--light-gray-text))]/60 hover:text-[#0066FF] transition-colors text-xs uppercase tracking-widest">{social}</a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[rgb(var(--foreground))] mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 text-[rgb(var(--light-gray-text))]">
              <li><Link to="/vision-cortex" className="hover:text-[#0066FF] transition-colors">Vision Cortex</Link></li>
              <li><Link to="/quantum-x-builder" className="hover:text-[#0066FF] transition-colors">Quantum X</Link></li>
              <li><Link to="/pricing" className="hover:text-[#0066FF] transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[rgb(var(--foreground))] mb-6 uppercase tracking-widest text-xs">System</h4>
            <ul className="space-y-4 text-[rgb(var(--light-gray-text))]">
              <li><Link to="/auth" className="hover:text-[#0066FF] transition-colors">Login</Link></li>
              <li><Link to="/admin" className="hover:text-[#0066FF] transition-colors">Admin Console</Link></li>
              <li><span className="text-[#0066FF]">System Status: Online</span></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[rgb(var(--foreground))]/5 flex flex-col md:flex-row justify-between items-center text-xs text-[rgb(var(--light-gray-text))]/60 font-mono">
           <p>© 2024 INFINITY X SYSTEMS. ALL RIGHTS RESERVED.</p>
           <div className="flex items-center gap-2 mt-4 md:mt-0">
             <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-pulse" />
             <span>QUANTUM ENCRYPTION ACTIVE</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  Database, 
  Settings, 
  Cpu, 
  LogOut, 
  Search,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BackgroundEnergy from '@/components/BackgroundEnergy';

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Authentication Check
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('infinity_auth');
      if (!auth) {
        toast({
          title: "Access Denied",
          description: "Restricted area. Authorization required.",
          variant: "destructive"
        });
        navigate('/auth');
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('infinity_auth');
    navigate('/auth');
  };

  if (isLoading || !isAuthenticated) return null;

  const tabs = [
    { id: 'overview', label: 'System Status', icon: Activity },
    { id: 'users', label: 'Operatives', icon: Users },
    { id: 'content', label: 'Knowledge Base', icon: FileText },
    { id: 'config', label: 'Core Config', icon: Settings },
  ];

  return (
    <>
      <Helmet><title>Command Console | Infinity X</title></Helmet>
      <div className="min-h-screen bg-[#02040F] text-white font-light relative overflow-hidden flex">
        <BackgroundEnergy />
        
        {/* Sidebar / Navigation Rail */}
        <motion.aside 
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-20 lg:w-64 fixed left-0 top-0 bottom-0 z-30 border-r border-white/5 bg-[#02040F]/80 backdrop-blur-xl flex flex-col items-center lg:items-stretch py-8"
        >
          <div className="mb-12 px-6 flex items-center justify-center lg:justify-start gap-3">
             <div className="w-8 h-8 rounded-full bg-[#0066FF] animate-pulse shadow-[0_0_15px_#0066FF]" />
             <span className="hidden lg:block font-bold tracking-widest text-sm">ADMIN<span className="text-[#0066FF]">OS</span></span>
          </div>

          <nav className="flex-1 flex flex-col gap-2 px-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  activeTab === tab.id 
                    ? 'bg-[#0066FF]/20 text-white shadow-[0_0_20px_rgba(0,102,255,0.2)]' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={20} className={activeTab === tab.id ? "text-[#0066FF]" : ""} />
                <span className="hidden lg:block text-xs uppercase tracking-wider">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="active-tab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#0066FF]" 
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto px-3">
             <button 
               onClick={handleLogout}
               className="flex items-center gap-4 p-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
             >
               <LogOut size={20} />
               <span className="hidden lg:block text-xs uppercase tracking-wider">Disengage</span>
             </button>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-20 lg:ml-64 p-8 lg:p-12 relative z-10 overflow-y-auto h-screen">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-3xl font-light mb-2">Command Console</h1>
              <div className="flex items-center gap-2 text-xs text-[#0066FF] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                SYSTEM OPTIMAL
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  type="text" 
                  placeholder="Search protocols..." 
                  className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors w-64"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066FF] to-purple-600 flex items-center justify-center border border-white/20">
                <ShieldCheck size={18} />
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              {activeTab === 'overview' && <OverviewSection />}
              {activeTab === 'users' && <UsersSection />}
              {activeTab === 'content' && <ContentSection />}
              {activeTab === 'config' && <ConfigSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

// --- Sub-components for Sections ---

const OverviewSection = () => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { label: "Active Nodes", value: "8,492", change: "+12%", color: "#0066FF" },
        { label: "Neural Load", value: "42%", change: "-5%", color: "#10B981" },
        { label: "Predictive Hits", value: "99.9%", change: "+0.1%", color: "#8B5CF6" }
      ].map((stat, i) => (
        <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-[#0066FF]/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <Activity color={stat.color} />
          </div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
          <div className="flex items-end gap-3">
             <h3 className="text-4xl font-light">{stat.value}</h3>
             <span className={`text-xs mb-1 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-blue-400'}`}>{stat.change}</span>
          </div>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "70%" }}
               transition={{ duration: 1.5, delay: i * 0.2 }}
               className="h-full rounded-full"
               style={{ backgroundColor: stat.color }} 
             />
          </div>
        </div>
      ))}
    </div>

    <div className="glass-panel p-8 rounded-3xl border border-white/5">
      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
        <Activity size={18} className="text-[#0066FF]" />
        Real-time Traffic Ingestion
      </h3>
      <div className="h-64 w-full flex items-end gap-1">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-[#0066FF]/50 to-transparent rounded-t-sm"
            initial={{ height: "10%" }}
            animate={{ 
              height: [`${Math.random() * 40 + 10}%`, `${Math.random() * 90 + 10}%`, `${Math.random() * 40 + 10}%`] 
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const UsersSection = () => (
  <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
    <div className="p-6 border-b border-white/5 flex justify-between items-center">
      <h3 className="text-lg font-light">Authorized Operatives</h3>
      <Button variant="outline" className="border-white/10 hover:bg-[#0066FF] hover:border-[#0066FF] text-xs">
        + Add Operative
      </Button>
    </div>
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-white/30 text-xs uppercase tracking-widest border-b border-white/5">
            <th className="pb-4 pl-4 font-normal">Identity</th>
            <th className="pb-4 font-normal">Clearance</th>
            <th className="pb-4 font-normal">Status</th>
            <th className="pb-4 font-normal text-right pr-4">Last Sync</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {[
            { name: "Alex Chen", role: "SysAdmin", status: "Active", time: "2m ago" },
            { name: "Sarah V.", role: "Moderator", status: "Idle", time: "1h ago" },
            { name: "Unit 734", role: "Bot", status: "Processing", time: "Now" },
            { name: "Marcus K.", role: "Analyst", status: "Offline", time: "2d ago" },
          ].map((user, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors group">
              <td className="py-4 pl-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
                <span className="group-hover:text-[#0066FF] transition-colors">{user.name}</span>
              </td>
              <td className="py-4 text-white/60">{user.role}</td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] uppercase tracking-wider ${
                  user.status === 'Active' || user.status === 'Processing' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-white/40'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="py-4 text-right pr-4 text-white/30 font-mono text-xs">{user.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ContentSection = () => (
  <div className="grid md:grid-cols-2 gap-8">
    <div className="glass-panel p-6 rounded-2xl border border-white/5">
      <h3 className="text-lg font-light mb-4">Latest Transmissions</h3>
      <div className="space-y-4">
         {[1, 2, 3].map((i) => (
           <div key={i} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 hover:border-[#0066FF]/30">
              <div className="flex justify-between mb-2">
                 <span className="text-xs text-[#0066FF]">Blog Post</span>
                 <span className="text-xs text-white/30">Draft</span>
              </div>
              <h4 className="font-normal mb-1">The Quantum Leap in AI Architecture</h4>
              <p className="text-xs text-white/50">Updated 3 hours ago by Admin</p>
           </div>
         ))}
      </div>
    </div>
    
    <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
       <div className="w-16 h-16 rounded-full bg-[#0066FF]/10 flex items-center justify-center mb-4 text-[#0066FF]">
          <Database size={32} />
       </div>
       <h3 className="text-lg font-light mb-2">Content Repository</h3>
       <p className="text-white/40 text-sm max-w-xs mb-6">Manage global assets, hero imagery, and textual data from the central cortex.</p>
       <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white">Access CMS</Button>
    </div>
  </div>
);

const ConfigSection = () => (
  <div className="space-y-6">
    <div className="glass-panel p-8 rounded-2xl border border-white/5">
      <h3 className="text-lg font-light mb-6">Global Parameters</h3>
      <div className="space-y-6">
         {[
           { label: "Maintenance Mode", desc: "Suspend all public access nodes." },
           { label: "Debug Logging", desc: "Verbose output for neural streams." },
           { label: "Quantum Encryption", desc: "Force 256-bit entropy on all connections." }
         ].map((setting, i) => (
           <div key={i} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
              <div>
                 <h4 className="font-normal mb-1">{setting.label}</h4>
                 <p className="text-xs text-white/40">{setting.desc}</p>
              </div>
              <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer hover:bg-white/20 transition-colors">
                 <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md" />
              </div>
           </div>
         ))}
      </div>
    </div>
    
    <div className="glass-panel p-6 rounded-2xl border border-red-500/10 bg-red-500/5">
       <h3 className="text-red-400 mb-2 flex items-center gap-2">
         <AlertTriangle size={18} /> 
         Danger Zone
       </h3>
       <p className="text-xs text-white/40 mb-4">Irreversible actions that affect the entire system topology.</p>
       <div className="flex gap-4">
          <Button variant="destructive" className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20">
             Flush Cache
          </Button>
          <Button variant="destructive" className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20">
             Reset Database
          </Button>
       </div>
    </div>
  </div>
);

export default AdminPage;
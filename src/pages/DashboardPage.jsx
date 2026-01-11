import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { 
  Activity, 
  CreditCard, 
  MessageSquare, 
  Zap,
  TrendingUp
} from 'lucide-react';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fix: Access methods directly from api instance, not api.user
        const [userData, statsData] = await Promise.all([
          api.getProfile(),
          api.getStats()
        ]);
        setUser(userData);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-[#0091FF] animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Total Tokens Used', 
      value: stats?.tokensUsed.toLocaleString(), 
      icon: <Zap className="w-5 h-5" />,
      color: 'text-yellow-400'
    },
    { 
      label: 'Messages Sent', 
      value: stats?.messagesSent, 
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'text-[#0091FF]'
    },
    { 
      label: 'Active Chats', 
      value: stats?.activeChats, 
      icon: <Activity className="w-5 h-5" />,
      color: 'text-green-400'
    },
    { 
      label: 'Current Plan', 
      value: stats?.plan, 
      icon: <CreditCard className="w-5 h-5" />,
      color: 'text-purple-400'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Infinity ΞXAI</title>
      </Helmet>
      
      <div className="flex-1 bg-black p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name}</h1>
            <p className="text-white/50">Here&apos;s an overview of your autonomous systems.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statCards.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#050a14] border border-white/10 p-6 rounded-xl hover:border-[#0091FF]/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-sm">{stat.label}</span>
                  <div className={`${stat.color} bg-white/5 p-2 rounded-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Usage Graph Placeholder */}
          <div className="bg-[#050a14] border border-white/10 rounded-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#0091FF]" />
                Usage Activity
              </h3>
              <select className="bg-black border border-white/10 text-white/70 text-sm rounded-md px-3 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 65, 35, 80, 55, 90, 70].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="flex-1 bg-[#0091FF]/20 hover:bg-[#0091FF]/40 rounded-t-sm relative group transition-all"
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 text-xs text-[#0091FF] transition-opacity">
                    {height * 12} calls
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-white/30">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DashboardPage;
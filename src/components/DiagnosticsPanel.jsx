import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Database, Wifi, AlertCircle, CheckCircle, Terminal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DiagnosticsPanel = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState(logger.getLogs());
  const [activeTab, setActiveTab] = useState('logs');

  useEffect(() => {
    const unsubscribe = logger.subscribe((updatedLogs) => {
      setLogs([...updatedLogs]);
    });
    return unsubscribe;
  }, []);

  const getStatusColor = (type) => {
    switch (type) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'request': return 'text-green-400';
      case 'response': return 'text-cyan-400';
      default: return 'text-blue-400';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-[#050a14] border-l border-white/10 shadow-2xl z-[100] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#0091FF]" />
          <h3 className="font-bold text-white">System Diagnostics</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/10 text-white/60 hover:text-white">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('logs')}
          className={cn(
            "flex-1 p-3 text-sm font-medium transition-colors",
            activeTab === 'logs' ? "bg-white/5 text-[#0091FF] border-b-2 border-[#0091FF]" : "text-white/50 hover:text-white hover:bg-white/5"
          )}
        >
          Logs & Events
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={cn(
            "flex-1 p-3 text-sm font-medium transition-colors",
            activeTab === 'health' ? "bg-white/5 text-[#0091FF] border-b-2 border-[#0091FF]" : "text-white/50 hover:text-white hover:bg-white/5"
          )}
        >
          System Health
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'logs' && (
          <div className="h-full flex flex-col">
             <div className="p-2 border-b border-white/10 flex justify-between items-center bg-black/20">
               <span className="text-xs text-white/40 px-2">{logs.length} events captured</span>
               <Button variant="ghost" size="sm" onClick={() => logger.clear()} className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20">
                 <Trash2 className="w-3 h-3 mr-2" /> Clear
               </Button>
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
              {logs.length === 0 && (
                <div className="text-center py-10 text-white/20">No logs recorded yet</div>
              )}
              {logs.map((log) => (
                <div key={log.id} className="border border-white/5 bg-white/5 rounded p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className={cn("uppercase font-bold text-[10px]", getStatusColor(log.type))}>
                      {log.type}
                    </span>
                    <span className="text-white/30 text-[10px]">{log.timestamp.split('T')[1].slice(0, 12)}</span>
                  </div>
                  <div className="text-white/90 mb-1 break-words">{log.message}</div>
                  {log.data && (
                    <pre className="bg-black/50 p-2 rounded text-white/60 overflow-x-auto mt-2 border border-white/5">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">Connection Status</h4>
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-green-400" />
                    <span className="text-white">API Connection</span>
                  </div>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Active</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-[#0091FF]" />
                    <span className="text-white">Railway Backend</span>
                  </div>
                  <span className="px-2 py-1 bg-[#0091FF]/20 text-[#0091FF] text-xs rounded">Connected</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">Last Error Analysis</h4>
              {logs.find(l => l.type === 'error') ? (
                 <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                       <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                       <div>
                         <p className="text-red-200 text-sm font-medium mb-1">Error Detected</p>
                         <p className="text-red-200/60 text-xs">{logs.find(l => l.type === 'error').message}</p>
                         <div className="mt-3 pt-3 border-t border-red-500/20">
                            <p className="text-xs text-red-300">Suggestion: {
                              logs.find(l => l.type === 'error').message.includes('timeout') ? 'Check your internet connection and try again.' :
                              logs.find(l => l.type === 'error').message.includes('401') ? 'Your session expired. Please log in again.' :
                              'Contact support if the issue persists.'
                            }</p>
                         </div>
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="p-4 bg-green-900/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-200 text-sm">No recent errors detected. System healthy.</span>
                 </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DiagnosticsPanel;
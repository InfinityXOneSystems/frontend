import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Plus, AlertCircle, Activity, Power, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { logger } from '@/lib/logger';
import { useNavigate } from 'react-router-dom';
import DiagnosticsPanel from '@/components/DiagnosticsPanel';

const ChatPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initial Load & Health Check
  useEffect(() => {
    const checkSystemAndLoad = async () => {
      // 1. Check Local Token Existence
      if (!api.isAuthenticated()) {
        logger.add('warning', 'Redirecting to auth: No local token found');
        navigate('/auth');
        return;
      }

      try {
        setError(null);
        logger.add('info', 'Loading chat history');
        
        const history = await api.getChatHistory();
        
        const formattedHistory = Array.isArray(history) ? history.map((msg, idx) => ({
            id: msg.id || idx,
            type: msg.role || (msg.sender === 'user' ? 'user' : 'assistant'),
            content: msg.content || msg.message,
            timestamp: msg.timestamp || Date.now()
        })) : [];

        setMessages(formattedHistory);

      } catch (err) {
        // 2. Handle specific Auth Errors
        if (err.status === 401 || err.code === 'AUTH_EXPIRED' || err.code === 'AUTH_REQUIRED') {
          logger.add('error', 'Auth failed during history load, redirecting...');
          toast({
            title: "Session Expired",
            description: "Please log in again to continue.",
            variant: "destructive"
          });
          api.logout();
          navigate('/auth');
          return;
        }

        // 3. Handle CORS/Network Errors
        let errorMsg = err.message || 'Failed to load history';
        let errorDescription = "Please check system diagnostics.";

        if (err.code === 'NETWORK_CORS_ERROR') {
            errorMsg = "Connection Error (CORS)";
            errorDescription = "The server rejected the request. This is likely a CORS policy issue or the server is offline.";
        } else if (err.code === 'NETWORK_ERROR') {
            errorMsg = "Network Unavailable";
            errorDescription = "Unable to reach Infinity X AI Server.";
        }

        setError(`${errorMsg}: ${errorDescription}`);
        
        toast({
          title: errorMsg,
          description: errorDescription,
          variant: "destructive"
        });
      }
    };
    
    checkSystemAndLoad();
  }, [toast, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
      api.logout();
      navigate('/auth');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Pre-validation
    if (!api.isAuthenticated()) {
        toast({ title: "Authentication Required", description: "Please log in to send messages.", variant: "destructive" });
        navigate('/auth');
        return;
    }
    
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage) return;
    if (isLoading) return;

    setInputValue('');

    // Optimistic UI Update
    const tempUserMsg = {
      id: `temp-${Date.now()}`,
      type: 'user',
      content: trimmedMessage,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const response = await api.sendMessage(trimmedMessage);
      
      const assistantMsg = {
          id: response.id || Date.now(),
          type: 'assistant',
          content: response.message || response.content || "Received empty response", 
          timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);

    } catch (err) {
      // Remove optimistic message
      setMessages(prev => prev.filter(msg => msg.id !== tempUserMsg.id));
      setInputValue(trimmedMessage); // Restore input

      if (err.status === 401 || err.code === 'AUTH_EXPIRED') {
        api.logout();
        navigate('/auth');
        return;
      }
      
      let friendlyError = err.message;
      if (err.code === 'TIMEOUT') friendlyError = "Server took too long to respond (30s).";
      if (err.code === 'RATE_LIMIT') friendlyError = "You are messaging too fast. Please wait.";
      if (err.code === 'NETWORK_CORS_ERROR') friendlyError = "Server connection blocked (CORS).";

      setError(friendlyError);
      toast({
        title: "Failed to send",
        description: friendlyError,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    setMessages([]); 
    try {
        await api.clearHistory();
        toast({ title: "New Chat", description: "Conversation history cleared." });
    } catch (err) {
        toast({ title: "Notice", description: "Local view cleared, but server sync failed.", variant: "warning" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Chat - Infinity ΞXAI</title>
      </Helmet>

      <div className="flex-1 flex flex-col h-full bg-black relative overflow-hidden">
        {/* Header Controls */}
        <div className="absolute top-4 right-4 z-30 flex gap-2">
           <Button 
             variant="ghost" 
             size="icon" 
             className="text-white/20 hover:text-[#0091FF] hover:bg-[#0091FF]/10"
             onClick={() => setShowDiagnostics(true)}
             title="System Diagnostics"
           >
             <Activity className="w-5 h-5" />
           </Button>
           <Button 
             variant="ghost" 
             size="icon" 
             className="text-white/20 hover:text-red-400 hover:bg-red-900/20"
             onClick={handleLogout}
             title="Logout"
           >
             <Power className="w-5 h-5" />
           </Button>
        </div>

        <AnimatePresence>
          {showDiagnostics && (
            <DiagnosticsPanel isOpen={showDiagnostics} onClose={() => setShowDiagnostics(false)} />
          )}
        </AnimatePresence>

        {/* Error Banner */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-900/20 border-b border-red-500/20 p-3 text-center z-20"
          >
             <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-medium flex-wrap">
               <AlertCircle className="w-4 h-4 flex-shrink-0" />
               <span className="text-left">{error}</span>
               <Button variant="link" size="sm" className="text-red-300 underline h-auto p-0 ml-2" onClick={() => setShowDiagnostics(true)}>
                 View Logs
               </Button>
             </div>
          </motion.div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence initial={false}>
              {messages.length === 0 && !isLoading && !error && (
                 <div className="flex flex-col items-center justify-center min-h-[50vh] text-white/30">
                    <div className="w-16 h-16 bg-[#0091FF]/10 rounded-full flex items-center justify-center mb-6 border border-[#0091FF]/20 animate-pulse">
                        <Lock className="w-6 h-6 text-[#0091FF]" />
                    </div>
                    <p className="font-mono text-sm tracking-widest uppercase mb-2">Secure Terminal Active</p>
                    <p className="text-xs text-white/20">Connected to Infinity X Network</p>
                 </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex-1 max-w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[#0091FF] font-bold text-xs">SYSTEM</span>
                          <span className="text-white/40 text-xs">•</span>
                          <span className="text-white/40 text-xs">
                            {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                          </span>
                        </div>
                      </div>
                      <div className="text-white/90 leading-relaxed whitespace-pre-wrap font-light font-mono text-sm">
                        {message.content}
                      </div>
                    </div>
                  )}
                  
                  {message.type === 'user' && (
                    <div className="bg-[#0091FF]/10 border border-[#0091FF]/30 rounded-sm px-5 py-3 max-w-[85%] text-right">
                      <p className="text-white font-mono text-sm">{message.content}</p>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex justify-start w-full"
                >
                   <div className="flex items-center gap-2 text-[#0091FF] font-mono text-xs animate-pulse">
                      <span>PROCESSING</span>
                      <span className="animate-bounce">_</span>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/95 to-transparent z-20">
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#0091FF]/10 blur-xl rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <form onSubmit={handleSendMessage} className="relative bg-[#050a14] border border-white/10 rounded-none flex items-center p-2 shadow-2xl">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="text-white/50 hover:text-white hover:bg-white/10 rounded-none"
                  onClick={handleNewChat}
                  title="Clear Terminal"
                  disabled={isLoading}
                >
                  <Plus className="w-5 h-5" />
                </Button>
                
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter command..."
                  className="border-none bg-transparent text-white placeholder:text-white/30 h-12 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-base font-mono"
                  autoFocus
                  disabled={isLoading}
                />
                
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-[#0091FF] hover:bg-[#007ACC] text-white rounded-none w-10 h-10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
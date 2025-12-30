import React from 'react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { Github, Fingerprint, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import BackgroundEnergy from '@/components/BackgroundEnergy';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loginWithGoogle, loginWithGithub, loading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/admin');
    } catch (error) {
      // Error is already handled in the context
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      navigate('/admin');
    } catch (error) {
      // Error is already handled in the context
    }
  };

  return (
    <>
      <Helmet><title>Log In | Infinity X</title></Helmet>
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#000000] text-white">
        <BackgroundEnergy />

        <div className="w-full max-w-md relative z-10">
          <div className="glass-panel p-10 rounded-3xl border border-[#0066FF]/20 shadow-[0_0_80px_rgba(0,102,255,0.15)] backdrop-blur-xl bg-black/80">
            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto bg-[#0066FF]/10 rounded-full flex items-center justify-center mb-6 text-[#0066FF] ring-1 ring-[#0066FF]/30">
                <Fingerprint size={32} />
              </div>
              <h1 className="text-3xl font-light mb-2 tracking-tight">Welcome Back</h1>
              <p className="text-white/40 text-sm">Mock authentication for testing - no OAuth bullshit.</p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full h-14 bg-white text-black hover:bg-gray-200 font-medium tracking-wide text-sm rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-3" />
                ) : (
                  <Chrome className="mr-3 w-5 h-5" />
                )}
                Mock Google Login
              </Button>

              <Button
                onClick={handleGithubLogin}
                disabled={loading}
                className="w-full h-14 bg-white/5 text-white hover:bg-white/10 border border-white/10 font-medium tracking-wide text-sm rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                ) : (
                  <Github className="mr-3 w-5 h-5" />
                )}
                Mock GitHub Login
              </Button>

              {/* Skip Auth Button for Testing */}
              <Button
                onClick={() => navigate('/admin')}
                className="w-full h-12 bg-[#0066FF]/20 text-[#0066FF] hover:bg-[#0066FF]/30 border border-[#0066FF]/30 font-medium tracking-wide text-sm rounded-xl transition-all hover:scale-[1.02]"
              >
                <Fingerprint className="mr-3 w-4 h-4" />
                Skip Auth (Testing)
              </Button>
            </div>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
               <p className="text-[10px] text-white/20 uppercase tracking-widest">
                  Secure & Encrypted
               </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
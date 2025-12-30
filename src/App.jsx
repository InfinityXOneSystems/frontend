import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import VisionCortexPage from '@/pages/VisionCortexPage';
import PricingPage from '@/pages/PricingPage';
import AuthPage from '@/pages/AuthPage';
import QuantumXPage from '@/pages/QuantumXPage';
import IntelligencePage from '@/pages/IntelligencePage';
import FuturePage from '@/pages/FuturePage';
import TechnologyPage from '@/pages/TechnologyPage';
import AdminPage from '@/pages/AdminPage';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/vision-cortex" element={<VisionCortexPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/quantum-x-builder" element={<QuantumXPage />} />
            <Route path="/intelligence" element={<IntelligencePage />} />
            <Route path="/future" element={<FuturePage />} />
            <Route path="/technology" element={<TechnologyPage />} />
          </Route>

          {/* Protected admin route */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />

          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
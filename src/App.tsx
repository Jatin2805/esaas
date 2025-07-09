import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Page Components
import Dashboard from './pages/Dashboard';
import FunnelBuilder from './pages/FunnelBuilder';
import Templates from './pages/Templates';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';
import Academy from './pages/Academy';
import Marketplace from './pages/Marketplace';

// Store
import { useAppStore } from './store/appStore';

function App() {
  const { sidebarOpen } = useAppStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <Header />
          
          <main className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/builder" element={<FunnelBuilder />} />
                <Route path="/builder/:id" element={<FunnelBuilder />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/marketplace" element={<Marketplace />} />
              </Routes>
            </motion.div>
          </main>
        </div>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
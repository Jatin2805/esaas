import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Zap,
  FileText,
  BarChart3,
  Puzzle,
  Settings,
  GraduationCap,
  Store,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Zap, label: 'Funnel Builder', path: '/builder' },
    { icon: FileText, label: 'Templates', path: '/templates' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Puzzle, label: 'Integrations', path: '/integrations' },
    { icon: GraduationCap, label: 'Academy', path: '/academy' },
    { icon: Store, label: 'Marketplace', path: '/marketplace' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 64 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <motion.div
          initial={false}
          animate={{ opacity: sidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">FunnelPro</h1>
              <p className="text-xs text-gray-500">Ultimate Builder</p>
            </div>
          )}
        </motion.div>
        
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
              
              <motion.span
                initial={false}
                animate={{ 
                  opacity: sidebarOpen ? 1 : 0,
                  width: sidebarOpen ? 'auto' : 0
                }}
                transition={{ duration: 0.2 }}
                className={`font-medium whitespace-nowrap overflow-hidden ${
                  isActive ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </motion.span>
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-2 w-2 h-2 bg-blue-600 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Banner */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Upgrade to Pro</span>
            </div>
            <p className="text-xs opacity-90 mb-3">
              Unlock unlimited funnels, advanced analytics, and AI features.
            </p>
            <button className="w-full bg-white text-purple-600 text-sm font-medium py-2 rounded-md hover:bg-gray-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
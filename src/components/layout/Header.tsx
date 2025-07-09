import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  User,
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Eye,
  Share2,
  MoreHorizontal
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const Header = () => {
  const { currentView, setCurrentView, user, currentFunnel } = useAppStore();

  const viewOptions = [
    { icon: Monitor, value: 'desktop', label: 'Desktop' },
    { icon: Tablet, value: 'tablet', label: 'Tablet' },
    { icon: Smartphone, value: 'mobile', label: 'Mobile' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search funnels, templates..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Current Funnel Info */}
          {currentFunnel && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">{currentFunnel.name}</span>
              <span className="text-xs text-gray-500 capitalize">{currentFunnel.status}</span>
            </div>
          )}
        </div>

        {/* Center Section - View Controls */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          {viewOptions.map((option) => {
            const Icon = option.icon;
            const isActive = currentView === option.value;
            
            return (
              <button
                key={option.value}
                onClick={() => setCurrentView(option.value as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Publish</span>
            </button>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.plan} Plan</p>
            </div>
            
            <button className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
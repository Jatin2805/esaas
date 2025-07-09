import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Zap,
  Target,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Conversions',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: Target,
      color: 'blue'
    },
    {
      title: 'Page Views',
      value: '45,231',
      change: '-2.1%',
      trend: 'down',
      icon: Eye,
      color: 'purple'
    },
    {
      title: 'Active Funnels',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: Zap,
      color: 'orange'
    }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 4000, conversions: 240 },
    { name: 'Feb', revenue: 3000, conversions: 139 },
    { name: 'Mar', revenue: 2000, conversions: 980 },
    { name: 'Apr', revenue: 2780, conversions: 390 },
    { name: 'May', revenue: 1890, conversions: 480 },
    { name: 'Jun', revenue: 2390, conversions: 380 },
    { name: 'Jul', revenue: 3490, conversions: 430 }
  ];

  const topFunnels = [
    { name: 'Fitness Course Landing', conversions: 1247, revenue: '$23,450', rate: '12.4%' },
    { name: 'SaaS Product Demo', conversions: 892, revenue: '$18,920', rate: '8.9%' },
    { name: 'E-book Download', conversions: 654, revenue: '$12,340', rate: '15.2%' },
    { name: 'Webinar Registration', conversions: 543, revenue: '$9,870', rate: '7.8%' }
  ];

  const recentActivity = [
    { action: 'New funnel created', funnel: 'Product Launch 2024', time: '2 minutes ago' },
    { action: 'Template published', funnel: 'Coach Landing Page', time: '1 hour ago' },
    { action: 'Integration connected', funnel: 'Mailchimp sync', time: '3 hours ago' },
    { action: 'A/B test completed', funnel: 'Checkout Optimization', time: '5 hours ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your funnels.</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Funnel</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                
                <div className={`flex items-center space-x-1 text-sm ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="font-medium">{stat.change}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <BarChart3 className="w-4 h-4" />
              <span>Last 7 months</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Conversions Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Conversion Trends</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target className="w-4 h-4" />
              <span>Monthly</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="conversions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Funnels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Funnels</h3>
          
          <div className="space-y-4">
            {topFunnels.map((funnel, index) => (
              <div key={funnel.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{funnel.name}</h4>
                    <p className="text-sm text-gray-600">{funnel.conversions} conversions</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{funnel.revenue}</p>
                  <p className="text-sm text-green-600">{funnel.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.funnel}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
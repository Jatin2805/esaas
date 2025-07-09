import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWorkouts } from '../hooks/useWorkouts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointer,
  DollarSign,
  Eye,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area } from 'recharts';

const Analytics = () => {
  const { workouts, loading } = useWorkouts();
  const [dateRange, setDateRange] = useState('7d');
  const [selectedFunnel, setSelectedFunnel] = useState('all');

  const funnels = workouts.filter(w => w.category === 'funnel');
  const totalVisitors = workouts.reduce((sum, w) => sum + w.reps, 0);
  const totalRevenue = workouts.reduce((sum, w) => sum + (w.load * 100), 0);
  const avgConversion = funnels.length > 0 
    ? (funnels.reduce((sum, f) => sum + (f.reps / (f.load + 1)), 0) / funnels.length * 100).toFixed(1)
    : '0.0';

  const stats = [
    {
      title: 'Total Visitors',
      value: totalVisitors.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: `${avgConversion}%`,
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Avg. Session',
      value: '3m 24s',
      change: '-5.3%',
      trend: 'down',
      icon: Activity,
      color: 'orange'
    }
  ];

  const conversionData = [
    { name: 'Landing', visitors: 1000, conversions: 850 },
    { name: 'Opt-in', visitors: 850, conversions: 680 },
    { name: 'Sales', visitors: 680, conversions: 340 },
    { name: 'Upsell', visitors: 340, conversions: 102 },
    { name: 'Thank You', visitors: 102, conversions: 102 }
  ];

  const revenueData = [
    { date: '2024-01-01', revenue: 4000, visitors: 2400 },
    { date: '2024-01-02', revenue: 3000, visitors: 1398 },
    { date: '2024-01-03', revenue: 2000, visitors: 9800 },
    { date: '2024-01-04', revenue: 2780, visitors: 3908 },
    { date: '2024-01-05', revenue: 1890, visitors: 4800 },
    { date: '2024-01-06', revenue: 2390, visitors: 3800 },
    { date: '2024-01-07', revenue: 3490, visitors: 4300 }
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#3b82f6' },
    { name: 'Mobile', value: 35, color: '#8b5cf6' },
    { name: 'Tablet', value: 20, color: '#10b981' }
  ];

  const topPages = funnels.slice(0, 4).map(funnel => ({
    page: funnel.title,
    views: funnel.reps * 10,
    conversions: funnel.reps,
    rate: `${((funnel.reps / (funnel.load + 1)) * 100).toFixed(1)}%`
  }));

  const trafficSources = [
    { source: 'Google Ads', visitors: 15420, percentage: 34.1 },
    { source: 'Facebook Ads', visitors: 12340, percentage: 27.3 },
    { source: 'Organic Search', visitors: 8760, percentage: 19.4 },
    { source: 'Direct', visitors: 5670, percentage: 12.5 },
    { source: 'Email', visitors: 2980, percentage: 6.6 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your funnel performance and optimize conversions</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedFunnel}
            onChange={(e) => setSelectedFunnel(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Funnels</option>
            {funnels.map(funnel => (
              <option key={funnel._id} value={funnel._id}>
                {funnel.title}
              </option>
            ))}
          </select>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
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
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                
                <div className={`flex items-center space-x-1 text-sm ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
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
            <h3 className="text-lg font-semibold text-gray-900">Revenue & Traffic</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.1}
              />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stroke="#8b5cf6" 
                fill="#8b5cf6"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Device Breakdown</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center space-x-6 mt-4">
            {deviceData.map((device) => (
              <div key={device.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: device.color }}
                ></div>
                <span className="text-sm text-gray-600">{device.name}</span>
                <span className="text-sm font-medium text-gray-900">{device.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
        
        <div className="space-y-4">
          {conversionData.map((step, index) => {
            const conversionRate = ((step.conversions / step.visitors) * 100).toFixed(1);
            const dropOffRate = index > 0 ? 
              (((conversionData[index - 1].conversions - step.visitors) / conversionData[index - 1].conversions) * 100).toFixed(1) : 
              '0';
            
            return (
              <div key={step.name} className="relative">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{step.name}</h4>
                      <p className="text-sm text-gray-600">{step.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{step.conversions.toLocaleString()}</p>
                    <p className="text-sm text-green-600">{conversionRate}% converted</p>
                    {index > 0 && (
                      <p className="text-xs text-red-600">{dropOffRate}% drop-off</p>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${conversionRate}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Pages</h3>
          
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : topPages.length > 0 ? (
              topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{page.page}</h4>
                    <p className="text-sm text-gray-600">{page.views.toLocaleString()} views</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{page.conversions}</p>
                  <p className="text-sm text-green-600">{page.rate}</p>
                </div>
              </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No funnel data available</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
          
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">{source.source}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                    {source.visitors.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {source.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
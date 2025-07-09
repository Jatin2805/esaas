import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Download,
  Eye,
  Heart,
  TrendingUp,
  Users,
  DollarSign,
  Plus,
  Award,
  Zap,
  Crown,
  ShoppingCart
} from 'lucide-react';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'templates', label: 'Templates' },
    { id: 'widgets', label: 'Widgets' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'themes', label: 'Themes' }
  ];

  const marketplaceItems = [
    {
      id: 1,
      type: 'template',
      name: 'E-commerce Checkout Flow',
      description: 'Complete checkout funnel with upsells, downsells, and order bumps',
      author: 'FunnelPro Team',
      authorVerified: true,
      price: 49,
      originalPrice: 79,
      rating: 4.9,
      reviews: 247,
      downloads: 1247,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['E-commerce', 'Checkout', 'Upsell'],
      featured: true,
      bestseller: true,
      conversionRate: '12.4%'
    },
    {
      id: 2,
      type: 'widget',
      name: 'Advanced Countdown Timer',
      description: 'Customizable countdown timer with multiple styles and animations',
      author: 'WidgetMaster',
      authorVerified: false,
      price: 19,
      originalPrice: null,
      rating: 4.7,
      reviews: 89,
      downloads: 432,
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Timer', 'Animation', 'Urgency'],
      featured: false,
      bestseller: false,
      conversionRate: null
    },
    {
      id: 3,
      type: 'template',
      name: 'SaaS Trial Signup',
      description: 'High-converting trial signup flow for SaaS products',
      author: 'ConvertPro',
      authorVerified: true,
      price: 0,
      originalPrice: null,
      rating: 4.8,
      reviews: 156,
      downloads: 892,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['SaaS', 'Trial', 'Signup'],
      featured: true,
      bestseller: false,
      conversionRate: '8.9%'
    },
    {
      id: 4,
      type: 'integration',
      name: 'Advanced Analytics Suite',
      description: 'Comprehensive analytics and reporting integration',
      author: 'DataFlow',
      authorVerified: true,
      price: 29,
      originalPrice: null,
      rating: 4.6,
      reviews: 67,
      downloads: 234,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Analytics', 'Reporting', 'Data'],
      featured: false,
      bestseller: false,
      conversionRate: null
    },
    {
      id: 5,
      type: 'theme',
      name: 'Modern Dark Theme',
      description: 'Sleek dark theme with modern design elements',
      author: 'ThemeStudio',
      authorVerified: false,
      price: 15,
      originalPrice: 25,
      rating: 4.5,
      reviews: 123,
      downloads: 567,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Dark', 'Modern', 'UI'],
      featured: false,
      bestseller: false,
      conversionRate: null
    },
    {
      id: 6,
      type: 'template',
      name: 'Webinar Registration',
      description: 'Complete webinar funnel with registration and follow-up sequences',
      author: 'WebinarPro',
      authorVerified: true,
      price: 39,
      originalPrice: null,
      rating: 4.7,
      reviews: 98,
      downloads: 345,
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Webinar', 'Registration', 'Email'],
      featured: false,
      bestseller: true,
      conversionRate: '15.2%'
    }
  ];

  const topCreators = [
    {
      id: 1,
      name: 'FunnelPro Team',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      items: 24,
      totalDownloads: 12547,
      rating: 4.9,
      badge: 'Pro Creator'
    },
    {
      id: 2,
      name: 'ConvertPro',
      avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      items: 18,
      totalDownloads: 8932,
      rating: 4.8,
      badge: 'Top Seller'
    },
    {
      id: 3,
      name: 'WidgetMaster',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: false,
      items: 12,
      totalDownloads: 5432,
      rating: 4.6,
      badge: 'Rising Star'
    }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const tabs = [
    { id: 'templates', label: 'Browse', icon: Search },
    { id: 'creators', label: 'Top Creators', icon: Users },
    { id: 'earnings', label: 'My Earnings', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">Discover and sell templates, widgets, and integrations</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <DollarSign className="w-4 h-4" />
            <span>Sell Your Items</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Upload Item</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">2,847</h3>
              <p className="text-gray-600 text-sm">Total Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">45,231</h3>
              <p className="text-gray-600 text-sm">Downloads</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">1,247</h3>
              <p className="text-gray-600 text-sm">Creators</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">$124K</h3>
              <p className="text-gray-600 text-sm">Creator Earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'templates' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search marketplace..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex items-center space-x-2 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* Sort */}
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    {/* Item Image */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {item.featured && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full flex items-center space-x-1">
                            <Crown className="w-3 h-3" />
                            <span>Featured</span>
                          </span>
                        )}
                        {item.bestseller && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>Bestseller</span>
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="absolute top-3 right-3">
                        <div className="bg-white rounded-lg px-2 py-1">
                          {item.price === 0 ? (
                            <span className="text-green-600 font-semibold text-sm">Free</span>
                          ) : (
                            <div className="text-right">
                              <span className="text-gray-900 font-semibold text-sm">${item.price}</span>
                              {item.originalPrice && (
                                <span className="text-gray-500 text-xs line-through ml-1">${item.originalPrice}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                          <button className="p-2 bg-white rounded-lg text-gray-700 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white rounded-lg text-gray-700 hover:text-red-600 transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                          item.type === 'template' ? 'bg-blue-100 text-blue-800' :
                          item.type === 'widget' ? 'bg-green-100 text-green-800' :
                          item.type === 'integration' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {item.type}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Author */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-sm text-gray-600">by</span>
                        <span className="text-sm font-medium text-gray-900">{item.author}</span>
                        {item.authorVerified && (
                          <Award className="w-4 h-4 text-blue-500" />
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{item.rating}</span>
                            <span>({item.reviews})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>{item.downloads}</span>
                          </div>
                        </div>
                        {item.conversionRate && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>{item.conversionRate}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          {item.price === 0 ? 'Download Free' : 'Purchase'}
                        </button>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'creators' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Creators</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topCreators.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                    />
                    
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{creator.name}</h4>
                      {creator.verified && (
                        <Award className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
                      creator.badge === 'Pro Creator' ? 'bg-purple-100 text-purple-600' :
                      creator.badge === 'Top Seller' ? 'bg-orange-100 text-orange-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {creator.badge}
                    </span>

                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{creator.items}</div>
                        <div className="text-xs text-gray-600">Items</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{creator.totalDownloads.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Downloads</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{creator.rating}</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View Profile
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Creator Dashboard</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Withdraw Earnings
                </button>
              </div>

              {/* Earnings Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">$2,847</h4>
                      <p className="text-green-600 text-sm">Total Earnings</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Download className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">1,247</h4>
                      <p className="text-blue-600 text-sm">Total Sales</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="w-8 h-8 text-purple-600" />
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">12</h4>
                      <p className="text-purple-600 text-sm">Active Items</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Star className="w-8 h-8 text-orange-600" />
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">4.8</h4>
                      <p className="text-orange-600 text-sm">Avg Rating</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Sales */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Recent Sales</h4>
                <div className="space-y-3">
                  {[
                    { item: 'E-commerce Checkout Flow', buyer: 'john@example.com', amount: '$49', date: '2 hours ago' },
                    { item: 'SaaS Trial Signup', buyer: 'sarah@example.com', amount: 'Free', date: '5 hours ago' },
                    { item: 'Webinar Registration', buyer: 'mike@example.com', amount: '$39', date: '1 day ago' }
                  ].map((sale, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{sale.item}</p>
                        <p className="text-sm text-gray-600">{sale.buyer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{sale.amount}</p>
                        <p className="text-sm text-gray-500">{sale.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
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
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Zap
} from 'lucide-react';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: 'All Templates', icon: Zap },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp },
    { id: 'personal', label: 'Personal', icon: Users }
  ];

  const templates = [
    {
      id: 1,
      name: 'Fitness Course Landing',
      category: 'education',
      description: 'High-converting landing page for fitness courses with video testimonials',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      downloads: 1247,
      price: 'Free',
      tags: ['Landing Page', 'Video', 'Testimonials'],
      conversionRate: '12.4%'
    },
    {
      id: 2,
      name: 'SaaS Product Demo',
      category: 'business',
      description: 'Complete funnel for SaaS product demonstrations with trial signup',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      downloads: 892,
      price: '$29',
      tags: ['SaaS', 'Demo', 'Trial'],
      conversionRate: '8.9%'
    },
    {
      id: 3,
      name: 'E-book Download',
      category: 'marketing',
      description: 'Lead magnet funnel for e-book downloads with email capture',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      downloads: 654,
      price: 'Free',
      tags: ['Lead Magnet', 'E-book', 'Email'],
      conversionRate: '15.2%'
    },
    {
      id: 4,
      name: 'Webinar Registration',
      category: 'education',
      description: 'Multi-step webinar registration with automated email sequences',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      downloads: 543,
      price: '$19',
      tags: ['Webinar', 'Registration', 'Email'],
      conversionRate: '7.8%'
    },
    {
      id: 5,
      name: 'Product Launch',
      category: 'ecommerce',
      description: 'Complete product launch funnel with countdown timer and social proof',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      downloads: 789,
      price: '$39',
      tags: ['Product Launch', 'Countdown', 'Social Proof'],
      conversionRate: '11.3%'
    },
    {
      id: 6,
      name: 'Coaching Services',
      category: 'personal',
      description: 'Personal coaching services funnel with booking calendar integration',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      downloads: 432,
      price: '$24',
      tags: ['Coaching', 'Booking', 'Services'],
      conversionRate: '9.7%'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-600 mt-1">Choose from our collection of high-converting funnel templates</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Upload Template</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
          >
            {/* Template Image */}
            <div className="relative overflow-hidden">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
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

              {/* Price Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  template.price === 'Free' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {template.price}
                </span>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {template.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{template.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {template.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map((tag) => (
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
                    <Download className="w-4 h-4" />
                    <span>{template.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{template.conversionRate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Use Template
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {sortedTemplates.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
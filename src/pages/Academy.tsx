import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  BookOpen,
  Award,
  Clock,
  Users,
  Star,
  CheckCircle,
  Lock,
  Search,
  Filter,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';

const Academy = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');

  const courses = [
    {
      id: 1,
      title: 'Funnel Building Fundamentals',
      description: 'Learn the basics of creating high-converting sales funnels from scratch',
      instructor: 'Sarah Johnson',
      duration: '4h 30m',
      lessons: 24,
      students: 1247,
      rating: 4.9,
      level: 'Beginner',
      progress: 0,
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'Free',
      category: 'Fundamentals'
    },
    {
      id: 2,
      title: 'Advanced Conversion Optimization',
      description: 'Master the art of optimizing funnels for maximum conversion rates',
      instructor: 'Mike Chen',
      duration: '6h 15m',
      lessons: 32,
      students: 892,
      rating: 4.8,
      level: 'Advanced',
      progress: 45,
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$49',
      category: 'Optimization'
    },
    {
      id: 3,
      title: 'Email Marketing Integration',
      description: 'Connect your funnels with powerful email marketing campaigns',
      instructor: 'Lisa Rodriguez',
      duration: '3h 45m',
      lessons: 18,
      students: 654,
      rating: 4.7,
      level: 'Intermediate',
      progress: 100,
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$29',
      category: 'Marketing'
    },
    {
      id: 4,
      title: 'Mobile-First Funnel Design',
      description: 'Create responsive funnels that convert on all devices',
      instructor: 'David Kim',
      duration: '5h 20m',
      lessons: 28,
      students: 543,
      rating: 4.6,
      level: 'Intermediate',
      progress: 0,
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$39',
      category: 'Design'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Funnel',
      description: 'Created your first funnel',
      icon: Zap,
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Conversion Master',
      description: 'Achieved 10%+ conversion rate',
      icon: Target,
      earned: true,
      date: '2024-02-03'
    },
    {
      id: 3,
      title: 'Course Completion',
      description: 'Completed your first course',
      icon: BookOpen,
      earned: true,
      date: '2024-02-10'
    },
    {
      id: 4,
      title: 'Revenue Milestone',
      description: 'Generated $10,000 in revenue',
      icon: TrendingUp,
      earned: false,
      date: null
    }
  ];

  const certifications = [
    {
      id: 1,
      title: 'Certified Funnel Builder',
      description: 'Complete all fundamental courses and pass the certification exam',
      progress: 75,
      requirements: [
        'Complete Funnel Building Fundamentals',
        'Complete Advanced Conversion Optimization',
        'Pass certification exam (80% minimum)',
        'Build 3 live funnels'
      ]
    },
    {
      id: 2,
      title: 'Conversion Optimization Expert',
      description: 'Master advanced optimization techniques and strategies',
      progress: 30,
      requirements: [
        'Complete all optimization courses',
        'Achieve 15%+ conversion rate',
        'Complete A/B testing project',
        'Pass expert-level exam'
      ]
    }
  ];

  const tabs = [
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'certifications', label: 'Certifications', icon: Star }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Funnel Academy</h1>
          <p className="text-gray-600 mt-1">Master the art of funnel building with our comprehensive courses</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            Level 3 Builder
          </div>
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
            75% to Certification
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-gray-600 text-sm">Courses Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">48h</h3>
              <p className="text-gray-600 text-sm">Learning Time</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
              <p className="text-gray-600 text-sm">Achievements</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">1</h3>
              <p className="text-gray-600 text-sm">Certifications</p>
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
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Categories</option>
                  <option>Fundamentals</option>
                  <option>Optimization</option>
                  <option>Marketing</option>
                  <option>Design</option>
                </select>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    {/* Course Image */}
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-blue-600 ml-1" />
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {course.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-white text-xs mt-1">{course.progress}% Complete</p>
                        </div>
                      )}

                      {/* Price Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          course.price === 'Free' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {course.price}
                        </span>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                          course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {course.level}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">• {course.instructor}</span>
                        </div>

                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          {course.progress > 0 ? 'Continue' : 'Start Course'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Your Achievements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        achievement.earned
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${
                          achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {achievement.earned ? (
                            <Icon className="w-6 h-6 text-green-600" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`font-semibold ${
                            achievement.earned ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm mt-1 ${
                            achievement.earned ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-green-600 mt-2">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        {achievement.earned && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Certification Programs</h3>
              
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{cert.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{cert.description}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{cert.progress}%</div>
                        <div className="text-sm text-gray-500">Complete</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-gray-200 rounded-full h-3 mb-4">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${cert.progress}%` }}
                      ></div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Requirements:</h5>
                      <div className="space-y-2">
                        {cert.requirements.map((req, reqIndex) => (
                          <div key={reqIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-600">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Continue Progress
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academy;
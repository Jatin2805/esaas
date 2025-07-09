import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Check,
  Plus,
  Settings,
  Zap,
  Mail,
  Database,
  CreditCard,
  MessageSquare,
  BarChart3,
  Users,
  Globe,
  Smartphone
} from 'lucide-react';

const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [connectedOnly, setConnectedOnly] = useState(false);

  const categories = [
    { id: 'all', label: 'All Integrations', icon: Zap },
    { id: 'email', label: 'Email Marketing', icon: Mail },
    { id: 'crm', label: 'CRM', icon: Database },
    { id: 'payment', label: 'Payments', icon: CreditCard },
    { id: 'messaging', label: 'Messaging', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'social', label: 'Social Media', icon: Users }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Mailchimp',
      category: 'email',
      description: 'Sync leads and automate email campaigns with the world\'s largest marketing automation platform',
      logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
      connected: true,
      popular: true,
      features: ['Lead Sync', 'Email Automation', 'Segmentation', 'Analytics'],
      setupTime: '5 min'
    },
    {
      id: 2,
      name: 'Stripe',
      category: 'payment',
      description: 'Accept payments securely with the most developer-friendly payment platform',
      logo: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=100',
      connected: true,
      popular: true,
      features: ['Payment Processing', 'Subscriptions', 'Invoicing', 'Analytics'],
      setupTime: '10 min'
    },
    {
      id: 3,
      name: 'HubSpot',
      category: 'crm',
      description: 'Manage your entire customer journey with HubSpot\'s comprehensive CRM platform',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      connected: false,
      popular: true,
      features: ['Contact Management', 'Deal Tracking', 'Email Marketing', 'Reporting'],
      setupTime: '15 min'
    },
    {
      id: 4,
      name: 'Google Analytics',
      category: 'analytics',
      description: 'Track and analyze your funnel performance with detailed insights and reports',
      logo: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=100',
      connected: true,
      popular: true,
      features: ['Traffic Analysis', 'Conversion Tracking', 'Custom Reports', 'Real-time Data'],
      setupTime: '5 min'
    },
    {
      id: 5,
      name: 'WhatsApp Business',
      category: 'messaging',
      description: 'Send automated messages and notifications directly to your customers\' WhatsApp',
      logo: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=100',
      connected: false,
      popular: true,
      features: ['Message Automation', 'Broadcast Lists', 'Rich Media', 'Analytics'],
      setupTime: '8 min'
    },
    {
      id: 6,
      name: 'Zapier',
      category: 'automation',
      description: 'Connect your funnels with 5000+ apps through powerful automation workflows',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100',
      connected: false,
      popular: false,
      features: ['Workflow Automation', '5000+ App Connections', 'Custom Triggers', 'Multi-step Zaps'],
      setupTime: '12 min'
    },
    {
      id: 7,
      name: 'Facebook Pixel',
      category: 'analytics',
      description: 'Track conversions and optimize your Facebook ad campaigns with detailed pixel data',
      logo: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=100',
      connected: true,
      popular: true,
      features: ['Conversion Tracking', 'Audience Building', 'Ad Optimization', 'Custom Events'],
      setupTime: '7 min'
    },
    {
      id: 8,
      name: 'Slack',
      category: 'messaging',
      description: 'Get real-time notifications about your funnel performance in your Slack workspace',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
      connected: false,
      popular: false,
      features: ['Real-time Notifications', 'Custom Alerts', 'Team Collaboration', 'Performance Updates'],
      setupTime: '5 min'
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesConnection = !connectedOnly || integration.connected;
    return matchesSearch && matchesCategory && matchesConnection;
  });

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-1">
            Connect your funnels with your favorite tools and services
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {connectedCount} Connected
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Request Integration</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search integrations..."
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

          {/* Connected Filter */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={connectedOnly}
              onChange={(e) => setConnectedOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Connected only</span>
          </label>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                      {integration.popular && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Setup time: {integration.setupTime}</p>
                  </div>
                </div>

                {integration.connected ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Connected</span>
                  </div>
                ) : (
                  <button className="text-blue-600 hover:text-blue-700">
                    <Settings className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {integration.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {integration.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {integration.connected ? (
                  <>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Configure
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600">
                      Disconnect
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Connect
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600">
                      Learn More
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Popular Integrations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Need a Custom Integration?</h2>
          <p className="text-gray-600">
            Can't find the integration you need? Our team can build custom integrations for your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">API Integration</h3>
            <p className="text-sm text-gray-600">Connect any REST API or webhook-enabled service</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Database Sync</h3>
            <p className="text-sm text-gray-600">Sync data with your existing databases and systems</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Smartphone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Mobile Apps</h3>
            <p className="text-sm text-gray-600">Integrate with mobile apps and push notifications</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Request Custom Integration
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Integrations;
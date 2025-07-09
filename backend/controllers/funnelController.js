const Funnel = require('../models/Funnel');
const mongoose = require('mongoose');

// Get all funnels
const getAllFunnels = async (req, res) => {
  try {
    const funnels = await Funnel.find({}).sort({ createdAt: -1 });
    res.status(200).json(funnels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get single funnel
const getFunnel = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid funnel ID' });
  }

  try {
    const funnel = await Funnel.findById(id);
    if (!funnel) {
      return res.status(404).json({ error: 'Funnel not found' });
    }
    res.status(200).json(funnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new funnel
const createFunnel = async (req, res) => {
  const { name, description, status } = req.body;

  try {
    // Create default page
    const defaultPage = {
      id: `page-${Date.now()}`,
      name: 'Landing Page',
      type: 'landing',
      elements: [],
      settings: {
        seo: {
          title: name,
          description: description || '',
          keywords: []
        },
        tracking: {},
        redirects: {}
      }
    };

    const funnel = await Funnel.create({
      name,
      description: description || '',
      status: status || 'draft',
      pages: [defaultPage],
      analytics: {
        views: 0,
        conversions: 0,
        revenue: 0
      },
      settings: {}
    });

    res.status(201).json(funnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update funnel
const updateFunnel = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid funnel ID' });
  }

  try {
    const funnel = await Funnel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    
    if (!funnel) {
      return res.status(404).json({ error: 'Funnel not found' });
    }
    
    res.status(200).json(funnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete funnel
const deleteFunnel = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid funnel ID' });
  }

  try {
    const funnel = await Funnel.findByIdAndDelete(id);
    
    if (!funnel) {
      return res.status(404).json({ error: 'Funnel not found' });
    }
    
    res.status(200).json({ message: 'Funnel deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add page to funnel
const addPage = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid funnel ID' });
  }

  try {
    const funnel = await Funnel.findById(id);
    
    if (!funnel) {
      return res.status(404).json({ error: 'Funnel not found' });
    }

    const newPage = {
      id: `page-${Date.now()}`,
      name: name || 'New Page',
      type: type || 'landing',
      elements: [],
      settings: {
        seo: {
          title: name || 'New Page',
          description: '',
          keywords: []
        },
        tracking: {},
        redirects: {}
      }
    };

    funnel.pages.push(newPage);
    await funnel.save();
    
    res.status(200).json(funnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update page in funnel
const updatePage = async (req, res) => {
  const { id, pageId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid funnel ID' });
  }

  try {
    const funnel = await Funnel.findById(id);
    
    if (!funnel) {
      return res.status(404).json({ error: 'Funnel not found' });
    }

    const pageIndex = funnel.pages.findIndex(page => page.id === pageId);
    
    if (pageIndex === -1) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Update page data
    funnel.pages[pageIndex] = { ...funnel.pages[pageIndex].toObject(), ...req.body };
    await funnel.save();
    
    res.status(200).json(funnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete page from funnel
const deletePage = async (req, res) => {
  const { id, pageId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid funnel ID' });
  }

  try {
    const funnel = await Funnel.findById(id);
    
    if (!funnel) {
      return res.status(404).json({ error: 'Funnel not found' });
    }

    funnel.pages = funnel.pages.filter(page => page.id !== pageId);
    await funnel.save();
    
    res.status(200).json(funnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update analytics
const updateAnalytics = async (req, res) => {
  const { id } = req.params;
  const { views, conversions, revenue } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid funnel ID' });
  }

  try {
    const funnel = await Funnel.findById(id);
    
    if (!funnel) {
      return res.status(404).json({ error: 'Funnel not found' });
    }

    if (views !== undefined) funnel.analytics.views = views;
    if (conversions !== undefined) funnel.analytics.conversions = conversions;
    if (revenue !== undefined) funnel.analytics.revenue = revenue;

    await funnel.save();
    
    res.status(200).json(funnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllFunnels,
  getFunnel,
  createFunnel,
  updateFunnel,
  deleteFunnel,
  addPage,
  updatePage,
  deletePage,
  updateAnalytics
};
const Template = require('../models/Template');
const mongoose = require('mongoose');

// Get all templates
const getAllTemplates = async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = { active: true };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let sortOption = { createdAt: -1 };
    
    // Sort options
    switch (sort) {
      case 'popular':
        sortOption = { downloads: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'price_low':
        sortOption = { price: 1 };
        break;
      case 'price_high':
        sortOption = { price: -1 };
        break;
    }

    const templates = await Template.find(query).sort(sortOption);
    res.status(200).json(templates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get single template
const getTemplate = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid template ID' });
  }

  try {
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new template
const createTemplate = async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update template
const updateTemplate = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid template ID' });
  }

  try {
    const template = await Template.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    res.status(200).json(template);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete template
const deleteTemplate = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid template ID' });
  }

  try {
    const template = await Template.findByIdAndDelete(id);
    
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Increment download count
const incrementDownload = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid template ID' });
  }

  try {
    const template = await Template.findByIdAndUpdate(
      id,
      { $inc: { downloads: 1 } },
      { new: true }
    );
    
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    res.status(200).json(template);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  incrementDownload
};
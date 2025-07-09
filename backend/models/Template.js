const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['business', 'ecommerce', 'education', 'marketing', 'personal']
  },
  thumbnail: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  downloads: {
    type: Number,
    default: 0
  },
  tags: [String],
  conversionRate: {
    type: Number,
    default: 0
  },
  funnelData: {
    type: Schema.Types.Mixed,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Template", templateSchema);
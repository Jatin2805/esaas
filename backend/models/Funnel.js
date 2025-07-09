const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Page Element Schema
const pageElementSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'image', 'button', 'form', 'video', 'countdown', 'testimonial']
  },
  content: {
    type: Schema.Types.Mixed,
    required: true
  },
  styles: {
    type: Schema.Types.Mixed,
    default: {}
  },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  size: {
    width: { type: Number, default: 300 },
    height: { type: Number, default: 100 }
  }
});

// Page Schema
const pageSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['landing', 'checkout', 'thankyou', 'upsell', 'downsell'],
    default: 'landing'
  },
  elements: [pageElementSchema],
  settings: {
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      keywords: [String]
    },
    tracking: {
      googleAnalytics: String,
      facebookPixel: String,
      customCode: String
    },
    redirects: {
      success: String,
      cancel: String
    }
  }
});

// Main Funnel Schema
const funnelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  pages: [pageSchema],
  analytics: {
    views: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  },
  settings: {
    domain: String,
    customCss: String,
    favicon: String
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Funnel", funnelSchema);
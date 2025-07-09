const express = require("express");
const router = express.Router();
const {
  getAllFunnels,
  getFunnel,
  createFunnel,
  updateFunnel,
  deleteFunnel,
  addPage,
  updatePage,
  deletePage,
  updateAnalytics
} = require('../controllers/funnelController');

// Funnel routes
router.get('/', getAllFunnels);
router.get('/:id', getFunnel);
router.post('/', createFunnel);
router.patch('/:id', updateFunnel);
router.delete('/:id', deleteFunnel);

// Page routes
router.post('/:id/pages', addPage);
router.patch('/:id/pages/:pageId', updatePage);
router.delete('/:id/pages/:pageId', deletePage);

// Analytics routes
router.patch('/:id/analytics', updateAnalytics);

module.exports = router;
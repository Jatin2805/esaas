const express = require("express");
const router = express.Router();
const {
  getAllTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  incrementDownload
} = require('../controllers/templateController');

// Template routes
router.get('/', getAllTemplates);
router.get('/:id', getTemplate);
router.post('/', createTemplate);
router.patch('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

// Special routes
router.post('/:id/download', incrementDownload);

module.exports = router;
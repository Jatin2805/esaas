const express = require("express");
const router = express.Router();
const {
  createworkout,
  getallworkout,
  getworkout,
  deleteworkout,
  updateworkout,
  getcategory
} = require('../controllers/controller');



router.get('/', getallworkout);


router.get('/:id', getworkout);


router.post('/', createworkout);


router.delete('/:id', deleteworkout);


router.patch('/:id', updateworkout);


router.get('/category/:categoryname', getcategory);

module.exports = router;

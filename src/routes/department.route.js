var express = require('express');
var router = express.Router();
const departmentController = require('../controllers/department.controller');

/* GET users listing. */
router
  .route('/')
  .get(departmentController.getDepartments);

module.exports = router;

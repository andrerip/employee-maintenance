var express = require('express');
var router = express.Router();
const departmentController = require('../controllers/department.controller');

router
  .route('/')
  .get(departmentController.getDepartments);

module.exports = router;

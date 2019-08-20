/* Libs */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* Objects */
const departmentController= require('../controller/departmentController');

/*********** Departments ************/

/* Get All Departments */
router.get('/', departmentController.findAll);

/* Get a Department */
router.get('/:departmentId', departmentController.find);

/* Add a Department */
router.post('/', departmentController.insert);

/* Update a Department */
router.put('/:departmentId', departmentController.update);

/* Delete a Department */
router.delete('/:departmentId', departmentController.delete);

module.exports = router;

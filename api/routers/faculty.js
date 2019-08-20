/* Libs */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* Objects */
const universityController = require('../controller/universityController');
const facultyController = require('../controller/facultyController');
const departmentController= require('../controller/departmentController');
const facultyDepartmentLookupController= require('../controller/facultyDepartmentLookupController');

/*********** Faculties ************/

/* Get All Faculties */
router.get('/', facultyController.findAll);

/* Get a Faculty */
router.get('/:facultyId', facultyController.find);

/* Add a Faculty */
router.post('/', facultyController.insert);

/* Update a Faculty */
router.put('/:facultyId', facultyController.update);

/* Delete a Faculty */
router.delete('/:facultyId', facultyController.delete);

/* Get All Departments of a Faculty*/
router.get('/:facultyId/departments', facultyController.findDepartments);

module.exports = router;

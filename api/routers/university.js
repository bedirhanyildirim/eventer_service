/* Libs */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* Objects */
const universityController = require('../controller/universityController');
const facultyController = require('../controller/facultyController');
const departmentController= require('../controller/departmentController');
const facultyDepartmentLookupController= require('../controller/facultyDepartmentLookupController');

/*********** Universities ************/

/* Get All Universities */
router.get('/', universityController.findAll);

/* Get University */
router.get('/:uniId', universityController.find);

/* Add a University */
router.post('/', universityController.insert);

/* Update University */
router.put('/:uniId', universityController.update);

/* Delete University */
router.delete('/:uniId', universityController.delete);

/*********** Faculties ************/

/* Get All Faculties */
router.get('/:uniId/faculty', facultyController.findAll);

/* Get a faculty */
router.get('/:uniId/faculty/:facultyId', facultyController.find);

/* Add a faculty */
router.post('/:uniId/faculty/', facultyController.insert);

/* Update a faculty */
router.put('/:uniId/faculty/:facultyId', facultyController.update);

/* Delete a faculty */
router.delete('/:uniId/faculty/:facultyId', facultyController.delete);

/*********** Departments ************/

/* Get All Departments */
router.get('/:uniId/department', departmentController.findAll);

/* Get a department */
router.get('/:uniId/department/:departmentId', departmentController.find);

/* Add a department */
router.post('/:uniId/department/', departmentController.insert);

/* Update a department */
router.put('/:uniId/department/:departmentId', departmentController.update);

/* Delete a department */
router.delete('/:uniId/department/:departmentId', departmentController.delete);

/*********** FacultyDepartmentLookup ************/

router.get("/:uniId/facdeplookup", facultyDepartmentLookupController.find);

router.post("/:uniId/facdeplookup", facultyDepartmentLookupController.insert);

module.exports = router;

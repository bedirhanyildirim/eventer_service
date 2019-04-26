/* Libs */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* Objects */
const universityController = require('../controller/universityController');

/* Get All Universities */
router.get('/', universityController.findAll);

/* Get University */
router.get('/:uniId', universityController.findAll);

/* Add a University */
router.post('/', universityController.insert);

/* Update University */
router.put('/:uniId', universityController.update);

/* Delete University */
router.delete('/:uniId', universityController.delete);

module.exports = router;

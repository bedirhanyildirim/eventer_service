/* Libs */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* Objects */
const University = require('../models/university');

/* Get University */
router.get('/', (req, res, next) => {
  University.find()
    .select('_id name detail contact logo rector website facebook twitter instagram ytube')
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'All info of university.',
        university: docs.map(doc => {
          return {
            id: doc._id,
            name: doc.name,
            detail: doc.detail,
            contact: doc.contact,
            logo: doc.logo,
            rector: doc.rector,
            website: doc.website,
            facebook: doc.facebook,
            twitter: doc.twitter,
            instagram: doc.instagram,
            ytube: doc.ytube
          }
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});

/* Add a University */
router.post('/', (req, res, next) => {

  const uni = new University({
    name: req.body.name,
    detail: req.body.detail,
    contact: req.body.contact,
    logo: req.body.logo,
    rector: req.body.rector,
    website: req.body.website,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
    ytube: req.body.ytube
  });
  uni
    .save()
    .then(result => {
      res.status(201).json({
        message: 'New university was created.',
        university: {
          id: result._id,
          name: result.name,
          detail: result.detail,
          contact: result.contact,
          logo: result.logo,
          rector: result.rector,
          website: result.website,
          facebook: result.facebook,
          twitter: result.twitter,
          instagram: result.instagram,
          ytube: result.ytube
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

/* Update University */
router.patch('/:uniId', (req, res, next) => {
  const id = req.params.uniId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  University.updateOne({_id: id}, {
    $set: updateOps
  })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'University updated.',
        id: id,
        university: req.body
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

/* Delete University */
router.delete('/:uniId', (req, res, next) => {
  const id = req.params.uniId;
  University.deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'University deleted.',
        id: id,
        deleted: 1
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

module.exports = router;

/* Libs */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

/* Middleware */
const checKAuth = require('../middleware/check-auth');

/* Upload File Settings */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    //var findType = file.mimetype.split('/');
    //var type = findType[findType.length-1];
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1
  },
  fileFilter: fileFilter
});

/* Objects */
const Club = require('../models/club');

/* Get All Clubs */
router.get('/', checKAuth, (req, res, next) => {
  if (req.userData.role == 1) {
    Club.find()
      .select('_id name detail faculty president contact logo website facebook twitter instagram')
      .exec()
      .then(docs => {
        res.status(200).json({
          message: 'All list of the student clubs.',
          //user: req.userData,
          length: docs.length,
          clubs: docs.map(doc => {
            return {
              id: doc._id,
              name: doc.name,
              detail: doc.detail,
              faculty: doc.faculty,
              logo: doc.logo
            }
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  } else {
    res.status(500).json({
      error: "Not allowed"
    })
  }
});

/* Add a New Clubs */
router.post('/', checKAuth, upload.single('logo'), (req, res, next) => {

    const club = new Club({
      name: req.body.name,
      detail: req.body.detail,
      faculty: req.body.faculty,
      president: req.body.president,
      contact: req.body.contact,
      logo: {
        url: req.headers.host + '/' + req.file.path,
        type: req.file.mimetype
      },
      website: req.body.website,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      instagram: req.body.instagram
    });
    club
      .save()
      .then(result => {
        res.status(201).json({
          message: 'New student club was created.',
          club: {
            id: result._id,
            name: result.name,
            detail: result.detail,
            faculty: result.faculty,
            president: result.president,
            contact: result.contact,
            logo: result.logo,
            website: result.website,
            facebook: result.facebook,
            twitter: result.twitter,
            instagram: result.instagram,
            more: {
              type: "GET",
              url: req.headers.host + '/clubs/' + result._id
            }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
});

/* Get a Club */
router.get('/:clubId', (req, res, next) => {
    const id = req.params.clubId;
    Club.findById(id)
      .select('_id name detail faculty president contact logo website facebook twitter instagram')
      .exec()
      .then(doc => {
        if (doc) {
          res.status(200).json({
            id: doc._id,
            name: doc.name,
            detail: doc.detail,
            faculty: doc.faculty,
            president: doc.president,
            contact: doc.contact,
            logo: doc.logo,
            website: doc.website,
            facebook: doc.facebook,
            twitter: doc.twitter,
            instagram: doc.instagram,
            more: doc.more
          });
        } else {
            res.status(404).json({
              message: "No valid entry found."
            });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
});

/* Update a Club */
router.patch('/:clubId', (req, res, next) => {
    const id = req.params.clubId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Club.updateOne({_id: id}, {
        $set: updateOps
    })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Club updated.',
          id: id,
          club: req.body
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
});

/* Delete a Club */
router.delete('/:clubId', (req, res, next) => {
    const id = req.params.clubId;
    Club.deleteOne({_id: id})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Club deleted.',
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

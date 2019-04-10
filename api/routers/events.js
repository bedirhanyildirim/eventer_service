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
const Event = require('../models/event');
const Club = require('../models/club');

/* Get All Events */
router.get('/', (req, res, next) => {
    Event.find()
      .select('_id name desc date time place club media')
      .exec()
      .then(docs => {
        res.status(200).json({
          message: 'All list of the events.',
          length: docs.length,
          events: docs.map(doc => {
            return {
              id: doc._id,
              name: doc.name,
              date: doc.data,
              time: doc.time,
              place: doc.place,
              club: doc.club,
              media: doc.media,
              more: {
                type: "GET",
                url: req.headers.host + '/events/' + doc._id
              }
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

/* Add a New Event */
router.post('/', checKAuth, upload.single('media'), (req, res, next) => {
  Club.findById(req.body.clubId)
    .select('_id name detail faculty president contact logo website facebook twitter instagram')
    .exec()
    .then(club => {
      if (!club) {
        return res.status(404).json({
          message: 'Club not found.'
        })
      }
      const event = new Event({
        name: req.body.name,
        desc: req.body.desc,
        date: req.body.date,
        time: req.body.time,
        place: req.body.place,
        club: {
          id: club._id,
          name: club.name,
          faculty: club.faculty,
          logo: club.logo,
          more: {
            type: "GET",
            url: req.headers.host + '/clubs/' + club._id
          }
        },
        media: {
          url: req.headers.host + '/' + req.file.path,
          type: req.file.mimetype
        }
      });
      return event
        .save()
    })
    .then(result => {
      res.status(201).json({
        message: 'New event was created.',
        event: {
          id: result._id,
          name: result.name,
          desc: result.desc,
          date: result.date,
          time: result.time,
          place: result.place,
          clubId: result.clubId,
          club: result.club,
          media: result.media,
          more: {
            type: "GET",
            url: req.headers.host + '/events/' + result._id
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

/* Get a Event */
router.get('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
      .select('_id name desc date time place club media')
      .exec()
      .then(doc => {
        if (doc) {
          res.status(200).json({
            id: doc._id,
            name: doc.name,
            desc: doc.desc,
            date: doc.date,
            time: doc.time,
            place: doc.place,
            clubId: doc.clubId,
            club: doc.club,
            media: doc.media,
            more: doc.more
          })
        }else {
          res.status(404).json({
            message: "No valid entry found."
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
});

/* Update a Event */
router.patch('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Event.updateOne({_id: id}, {
      $set: updateOps
    })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Event updated.',
          id: id,
          event: req.body
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
});

/* Delete a Event */
router.delete('/:eventId', checKAuth, (req, res, next) => {
    const id = req.params.eventId;
    Event.deleteOne({_id: id})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Event deleted.',
          id: id,
          deleted: 1
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
});

module.exports = router;

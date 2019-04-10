const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  place: {type: String, required: true},
  club: {type: Object, required: true},
  media: {type: Object, required: true}
});

module.exports = mongoose.model('Event', eventSchema);

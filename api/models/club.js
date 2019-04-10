const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
  name: {type: String, required: true},
  detail: String,
  faculty: {type: String, required: true},
  president: {type: String, required: true},
  contact: {type: String, required: true},
  logo: {type: Object, required: true},
  website: String,
  facebook: String,
  twitter: String,
  instagram: String
});

module.exports = mongoose.model('Club', clubSchema);

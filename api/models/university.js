const mongoose = require('mongoose');
const BaseSchema = require('./base');

const uniSchema = new BaseSchema({
  name: {type: String, required: true},
  detail: {type: String, default: ''},
  contact: {type: String, default: ''},
  logo: {type: String, default: ''},
  rector: {type: String, default: ''},
  website: {type: String, default: ''},
  facebook: {type: String, default: ''},
  twitter: {type: String, default: ''},
  instagram: {type: String, default: ''},
  youtube: {type: String, default: ''}
});

module.exports = mongoose.model('University', uniSchema);

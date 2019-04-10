const mongoose = require('mongoose');

const uniSchema = mongoose.Schema({
  name: {type: String, required: true},
  detail: {type: String, default: ''},
  contact: {type: String, default: ''},
  logo: {type: String, default: ''},
  rector: {type: String, default: ''},
  website: {type: String, default: ''},
  facebook: {type: String, default: ''},
  twitter: {type: String, default: ''},
  instagram: {typ: String, default: ''},
  ytube: {type: String, default: ''}
});

module.exports = mongoose.model('University', uniSchema);

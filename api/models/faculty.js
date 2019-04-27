const mongoose = require('mongoose');
const BaseSchema = require('./base');

const facultySchema = new BaseSchema({
  universityId: {type: String, required:true},
  name: {type: String, required: true},
  detail: {type: String, default: ''},
  dean: {type: String, default: ''},
  website: {type: String, default: ''}
});

module.exports = mongoose.model('Faculty', facultySchema);

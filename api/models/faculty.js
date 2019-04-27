const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
  universityId: {type: String, required:true},
  name: {type: String, required: true},
  detail: {type: String, default: ''},
  dean: {type: String, default: ''},
  website: {type: String, default: ''}
});

module.exports = mongoose.model('Faculty', facultySchema);

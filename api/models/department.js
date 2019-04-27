const mongoose = require('mongoose');
const BaseSchema = require('./base');

const departmentSchema = new BaseSchema({
  universityId: {type: String, required:true},
  name: {type: String, required: true},
  detail: {type: String, default: ''},
  headOfDepartment: {type: String, default: ''},
  website: {type: String, default: ''}
});

module.exports = mongoose.model('Department', departmentSchema);
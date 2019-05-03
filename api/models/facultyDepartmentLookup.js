const mongoose = require('mongoose');
const BaseSchema = require('./base');

const lookup = new BaseSchema({
    universityId: {type: String, required:true},
    kind: {type: String, required:true},
    code: {type: String, required:true},
    lookup_id: {type: String, required:true}
});

module.exports = mongoose.model('FacultyDepartmentLookup', lookup);

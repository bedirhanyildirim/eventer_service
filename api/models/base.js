const mongoose = require('mongoose');
const util = require('util');

function BaseSchema() {
    mongoose.Schema.apply(this, arguments);

    this.set('toJSON', {
        virtuals: true,
        versionKey:false,
        transform: function (doc, ret) { delete ret._id }
    });
}
util.inherits(BaseSchema, mongoose.Schema);

module.exports = BaseSchema
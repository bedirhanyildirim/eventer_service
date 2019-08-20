const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z]+\.[a-z]+\@stu\.fsm\.edu\.tr/
  },
  password: {type: String, required: true},
  role: {type: Number, default: 4},
  club: {type: String, default: ''},
  emailVerify: {type: Number, default: 0},
  name: {type: String, default: ''},
  surname: {type: String, default: ''},
  username: {type: String, default: ''},
  gender: {type: Number, default: 0},
  faculty: {type: String, default: ''},
  department: {type: String, default: ''},
  favList: {type: Array, default: []},
  attendedEvents: {type: Array, default: []},
  studentNumber: {type: String, default: ''}
});

module.exports = mongoose.model('User', userSchema);

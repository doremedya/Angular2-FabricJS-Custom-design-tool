// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String },
  cellPhone: { type: String },
  telePhone: { type: String },
  breNumber: { type: String },
  fax: { type: String },
  website: { type: String},
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('users', userSchema);
module.exports = User;
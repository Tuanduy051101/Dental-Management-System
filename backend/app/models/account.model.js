const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  // employee: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   require: true,
  //   ref: "Employee"
  // }
});

module.exports = mongoose.model('Account', accountSchema);

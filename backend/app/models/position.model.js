const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: false,
        uppercase: true,
        trim: true,
        // minLength: 0,
        // maxLength: ,
        // default: 
    }
});

module.exports = mongoose.model("Position", positionSchema);

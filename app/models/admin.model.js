const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: false,
        uppercase: false,
        trim: true,
    },
    gender: {
        type: Boolean,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Admin", adminSchema);
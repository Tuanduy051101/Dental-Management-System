const mongoose = require("mongoose");

const patientCardSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        require: true,
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

module.exports = mongoose.model("PatientCard", patientCardSchema);
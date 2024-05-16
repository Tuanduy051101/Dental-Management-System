const mongoose = require("mongoose");

const patientCardSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        uppercase: true,
        trim: true,
    },
    gender: {
        type: Boolean,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        uppercase: true,
        trim: true,
    },
    examVoucher: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "ExamVoucher",
    }]
});

module.exports = mongoose.model("PatientCard", patientCardSchema);
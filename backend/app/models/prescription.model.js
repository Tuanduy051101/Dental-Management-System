const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    dosage: {
        type: String,
        required: true,
    },
    examVoucher: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ExamVoucher"
    }],
    preScriptionDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PrescriptionDetail"
    }]
});

module.exports = mongoose.model("Prescription", prescriptionSchema);

const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    dosage: {
        type: String,
        required: true,
    },
    examVoucher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ExamVoucher"
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
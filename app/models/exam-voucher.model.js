const mongoose = require("mongoose");

const examVoucherSchema = new mongoose.Schema({
    stt: {
        type: String,
        required: true,
    },
    dateExam: {
        type: Boolean,
        required: true,
    },
    expression: {
        type: String,
        required: true,
    },
    patientCard: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PatientCard",
    }
});

module.exports = mongoose.model("ExamVoucher", examVoucherSchema);
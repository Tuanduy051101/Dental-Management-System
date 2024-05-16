const mongoose = require("mongoose");

const examVoucherSchema = new mongoose.Schema({
    stt: {
        type: Number,
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
    },
    scheduleWork: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ScheduleWork",
    },
    // prescription: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false,
    //     ref: "Prescription",
    // }]
});

module.exports = mongoose.model("ExamVoucher", examVoucherSchema);

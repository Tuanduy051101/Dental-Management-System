const mongoose = require("mongoose");

const prescriptionDetailsSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    examVoucher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ExamVoucher"
    },
    medicine: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Medicine"
    }]
});

module.exports = mongoose.model("PrescriptionDetails", prescriptionDetailsSchema);
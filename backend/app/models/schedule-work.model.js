const mongoose = require("mongoose");

const scheduleWorkSchema = new mongoose.Schema({
    date: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Date"
    },
    note: {
        type: String,
        required: false,
        trim: true,
        uppercase: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },
    examVoucher: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "ExamVoucher"
    }],
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Shift"
    }]
    ,
});

module.exports = mongoose.model("ScheduleWork", scheduleWorkSchema);
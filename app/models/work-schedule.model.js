const mongoose = require("mongoose");

const workScheduleSchema = new mongoose.Schema({
    notes: {
        type: String,
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee",
    },
    date: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Date",
    },
    shift: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Shift",
    }]
});

module.exports = mongoose.model("WorkSchedule", workScheduleSchema);
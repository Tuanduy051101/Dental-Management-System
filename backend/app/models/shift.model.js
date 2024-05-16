const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    scheduleWork: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "ScheduleWork"
    }]
});

module.exports = mongoose.model("Shift", shiftSchema);

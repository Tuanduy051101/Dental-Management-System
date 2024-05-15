const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    endTime: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Shift", shiftSchema);
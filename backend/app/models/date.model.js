const mongoose = require("mongoose");

const diplomaSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    scheduleWorks: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "ScheduleWork"
    }]
});

module.exports = mongoose.model("Date", diplomaSchema);
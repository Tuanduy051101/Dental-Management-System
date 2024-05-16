const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        uppercase: true,
        trim: true,
    },
    gender: {
        type: Boolean,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Position"
    },
    diplomas: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Diploma"
    }],
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Account",
    },
    scheduleWorks: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "ScheduleWork"
    }]
});

module.exports = mongoose.model("Employee", employeeSchema);
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    gender: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        require: true,
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Position"
    },
    diploma: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Diploma"
    }]
});

module.exports = mongoose.model("Employee", employeeSchema);
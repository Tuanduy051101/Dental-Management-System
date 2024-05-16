const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    function: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    ingredient: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    }
});

module.exports = mongoose.model("Medicine", medicineSchema);

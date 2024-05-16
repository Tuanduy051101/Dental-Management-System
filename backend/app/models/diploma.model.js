const mongoose = require("mongoose");

const diplomaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: false,
        uppercase: true,
        trim: true,
    },
    institution: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Institution"
    }
});

module.exports = mongoose.model("Diploma", diplomaSchema);
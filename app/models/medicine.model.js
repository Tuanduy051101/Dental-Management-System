const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tFMedicine: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "TFMedicine",
    }
});

module.exports = mongoose.model("Medicine", medicineSchema);
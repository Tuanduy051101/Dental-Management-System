const mongoose = require("mongoose");

const tFMedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("TFMedicine", tFMedicineSchema);
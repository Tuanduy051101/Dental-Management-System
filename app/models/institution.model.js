const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    }
},{
    methods: {
        async checkQuery (query) {

        },
        async checkParam (params) {

        }
    }
});

module.exports = mongoose.model("Institution", institutionSchema);

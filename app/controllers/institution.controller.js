const ApiError = require("../api-error");
const Institution = require("../models/institution.model");

// create a new institution
exports.create = async (req, res, next) => {
    const institutions = await Institution.find().exec();
    console.log(req.body);
    console.log(req.body.province);
    if(institutions.length != 0) {
        const institutionNew = new Institution({
            name: req.body.name,
            province: req.body.province,
        });
        const query = Institution.find();
        const institution = query.and([
            {name: req.body.name},
            {province: req.body.province},
        ]);
        if((await institution).length != 0) {
            return res.send("Institution already exists ???")
        }

        try {
            await institutionNew.save();
            return res.send(institutionNew);
        }catch(error) {
            return next(
                new ApiError(500, "An error occurred while creating the institution ???")
            );
        }
    }

    try {
        Institution.insertMany([
            {
                name: "đại học Cần Thơ",
                province: "Cần Thơ",
            },{
                name: "đại học Nam Cần Thơ",
                province: "Cần Thơ",
            },{
                name: "đại học Thăng Long",
                province: "Cần Thơ",
            },
        ]);
        return res.send("Insert Successfully !!!");
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the institution ???")
        );
    }
};

// find all institution

exports.update = async (req, res, next) => {
    const institutionNew  = req.body;
    let institution = await Institution.findById({ _id: req.params.id });
    if(Object.keys(institutionNew).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try{
        institution.name = institutionNew.name;
        institution.province = institutionNew.province;
        await institution.save();
        return res.send(institution);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while updating diploma ???")
        );
    }
}
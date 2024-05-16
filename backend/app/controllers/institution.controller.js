const ApiError = require("../api-error");
const Institution = require("../models/institution.model");

// create a new institution
exports.create = async (req, res, next) => {
    const institutions = await Institution.find().exec();
    if(institutions.length) {
        if(Object.keys(req.body).length ===0 || req.body.name == "" || req.body.name == "") {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty"
                )
            );
        }

        const newInstitution = new Institution({
            name: req.body.name,
            province: req.body.province,
        });
        const institution = await Institution.find(
            {
                $and: [
                    {name: {$in: req.body.name}},
                    {province: {$in: req.body.province}}
                ]
            }
        );

        if(institution.length) {
            return res.send({
                message: "Institution already exists.",
                content: institution
            });
        }

        try {
            const document = await newInstitution.save();
            return res.send(document);
        }catch (error) {
            return next(
                new ApiError(
                    500, 
                    "An error occurred while creating the training institution."
                )
            );
        }
    }

    try {
        const documents = await Institution.insertMany([
            {
                name: "Can Tho University",
                province: "Can Tho",
            },{
                name: "Nam Can Tho University",
                province: "Can Tho",
            },{
                name: "Can Tho University of Medicine and Pharmacy",
                province: "Can Tho",
            },{
                name: "Ho Chi Minh City University of Medicine and Pharmacy",
                province: "Ho Chi Minh city",
            }
        ]);
        return res.send(documents);
    }catch (error) {
        return next(
            ApiError(
                500,
                "An error occurred while creating the training institutions"
            )
        )
    }
};

// update

exports.update = async (req, res, next) => {
    const newInstitution  = req.body;
    let institution = await Institution.findById({ _id: req.params.id });
    if(Object.keys(newInstitution).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try{
        institution.name = newInstitution.name;
        institution.province = newInstitution.province;
        await institution.save();
        return res.send(institution);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while updating diploma ???")
        );
    }
}

// find all
exports.findAll = async (req, res, next) => {
    try {
        const institutions = await Institution.find().exec();
        res.send(institutions);
    }catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while finding the training institutions"
            )
        );
    }
}

exports.find = async (req, res, next) => {
    try{
        const document = await Institution.findById({_id: req.params.id}).exec();
        if(!document) {
            return next(
                new ApiError(
                    404,
                    "Institution not found"
                )
            )
        }
        return res.send(
            document
        )
    }catch(err) {
        return next(
            new ApiError(
                500,
                `Could not get institution with id = ${req.params.id}`
            )
        )
    }
}

const ApiError = require("../api-error");
const Diploma = require("../models/diploma.model");

// create a new diploma
exports.create = async (req, res, next) => {
    const diplomas = await Diploma.find().exec();
    if(diplomas.length) {
        if(Object.keys(req.body) === 0 || req.body.name == null || req.body.institution) {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty"
                )
            );
        }

        const newDiploma = new Diploma({
            name: req.body.name,
            institution: req.body.institution,
        });
        const diploma = await Diploma.find(
            {
                $and: [
                    {name: {$in: req.body.name}},
                    {institution: {$in: req.body.institution}}
                ]
            }
        ).exec();

        if(diploma.length) {
            return res.send({
                message: "Diploma already exists",
                content: diploma
            });
        }

        try {
            const document = await newDiploma.save();
            return res.send(document);
        }catch(error) {
            return next(
                new ApiError(500, "An error occurred while creating the diploma.")
            );
        }
    }

    try {
        const documents = await Diploma.insertMany([
            {
                name: "graduated in Traditional Medicine",
                institution: "634f9dd04a39457327721b72",
            },{
                name: "graduated in General Medicine",
                institution: "634f9dd04a39457327721b73",
            },{
                name: "graduated in Maxillofacial Dentistry",
                institution: "634f9dd04a39457327721b74",
            },{
                name: "graduated in Information Technology",
                institution: "634f9dd04a39457327721b72"
            },{
                name: "graduated in Accounting",
                institution: "634f9dd04a39457327721b72"
            },{
                name: "graduated in graduated in Finance - Banking",
                institution: "634f9dd04a39457327721b72"
            }
        ]);
        return res.send(documents);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the diplomas.")
        );
    }
};

// find all diplomas
exports.findAll = async (req, res, next) => {
    try {
        const diplomas = await Diploma.find().populate("institution").exec();
        res.send(diplomas);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all diplomas ???")
        )
    }
}

// find diploma
exports.find = async (req, res, next) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== "") {
        searchOptions.name = new RegExp(req.query.name, "i");
    }

    try{
        const diploma = await Diploma.findOne(searchOptions)
            .populate(
                {
                    path: "institution",
                    // name: {$name: "đại học Nam Cần Thơ"},
                    // select: "name",
                    // options: { limit: 2 }
                }
            ).exec()
            // .sort({
            //     name: "desc",
            //     name: -1
            // })
        res.send(diploma);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while finding diploma ???")
        );
    }
}

// update a diploma
exports.update = async (req, res, next) => {
    const newDiploma  = req.body;
    let diploma = await Diploma.findById({ _id: req.params.id });
    if(Object.keys(newDiploma).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try{
        diploma.name = newDiploma.name;
        diploma.institution = newDiploma.institution;
        await diploma.save();
        return res.send(diploma);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while updating diploma ???")
        );
    }
}

// delete a diploma

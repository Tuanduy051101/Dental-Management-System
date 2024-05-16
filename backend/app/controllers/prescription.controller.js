const ApiError = require("../api-error");
const Prescription = require("../models/prescription.model");

// create a new Prescription
exports.create = async (req, res, next) => {
    const prescriptions = await Prescription.find().exec();
    if(prescriptions.length) {
        if(Object.keys(req.body) === 0) {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty"
                )
            );
        }

        const newPrescription = new Prescription({
            dosage: req.body.dosage,
            institution: req.body.institution,
        });
        const Prescription = await Prescription.find(
            {
                $and: [
                    {name: {$in: req.body.name}},
                    {institution: {$in: req.body.institution}}
                ]
            }
        ).exec();

        if(Prescription.length) {
            return res.send({
                message: "Prescription already exists",
                content: Prescription
            });
        }

        try {
            const document = await newPrescription.save();
            return res.send(document);
        }catch(error) {
            return next(
                new ApiError(500, "An error occurred while creating the Prescription.")
            );
        }
    }

    try {
        const documents = await Prescription.insertMany([
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
            new ApiError(500, "An error occurred while creating the Prescriptions.")
        );
    }
};

// find all Prescriptions
exports.findAll = async (req, res, next) => {
    try {
        const Prescriptions = await Prescription.find().populate("institution").exec();
        res.send(Prescriptions);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all Prescriptions ???")
        )
    }
}

// find Prescription
exports.find = async (req, res, next) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== "") {
        searchOptions.name = new RegExp(req.query.name, "i");
    }

    try{
        const Prescription = await Prescription.findOne(searchOptions)
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
        res.send(Prescription);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while finding Prescription ???")
        );
    }
}

// update a Prescription
exports.update = async (req, res, next) => {
    const newPrescription  = req.body;
    let Prescription = await Prescription.findById({ _id: req.params.id });
    if(Object.keys(newPrescription).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try{
        Prescription.name = newPrescription.name;
        Prescription.institution = newPrescription.institution;
        await Prescription.save();
        return res.send(Prescription);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while updating Prescription ???")
        );
    }
}

// delete a Prescription

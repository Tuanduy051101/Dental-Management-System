const ApiError = require("../api-error");
const PatientCard = require("../models/patient-card.model");

exports.create = async (req, res, next) => {
    const patientCards = await PatientCard.find().exec();
    if(patientCards.length) {

        if(Object.keys(req.body).length === 0) {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty."
                )
            );
        }
        for(value in req.body) {
            if(value == "") {
                return next(
                    new ApiError(
                        400,
                        "Data to create can not be empty."
                    )
                );
            }
        }

        const patientCard = await PatientCard.find({
            $or: [
                {phone: {$in: req.body.phone}},
                {email: {$in: req.body.email}}
            ]
        }).exec();
        const new_patientCard = new PatientCard({
            name: req.body.name,
            gender: req.body.gender,
            phone: req.body.phone,
            email: req.body.email,
            examVoucher: req.body.examVoucher
        });

        if(patientCard.length) {
            return res.status(400).send({
                message: "Patient card already exists.",
                content: patientCard
            });
        }

        try {
            const document = await new_patientCard.save();
            return res.send(document);
        }catch(error) {
            return next(
                new ApiError(
                    500,
                    "An error occurred while creating the patient card."
                )
            )
        }
    }

    try {
        const documents = await PatientCard.insertMany([
            {
                name: "Tran Tuan Duy",
                gender: true,
                phone: "0344990956",
                email: "duy@gmail.com",
            },
            {
                name: "Huynh Thien Duyen",
                gender: false,
                phone: "0344760988",
                email: "duyen@gmail.com",
            },
            {
                name: "Nguyen Minh Anh",
                gender: false,
                phone: "0345670977",
                email: "anh@gmail.com",
            },
        ]);
        return res.send(documents);
    }catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while creating the patient card."
            )
        )
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const patientCards = await PatientCard.find().populate().exec();
        return res.send(patientCards);
    }catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while finding for all the type of medicines."
            )
        )
    }
}

exports.find = async (req, res, next) => {
    try{
        const document = await PatientCard.findById({_id: req.params.id}).populate("examVoucher").exec();
        return res.send(document);
    }catch(err) {
        return next(
            new ApiError(
                500,
                "An error occurred while finding for a patient card."
            )
        )
    }
}

exports.update = async (req, res, next) => {
    try{
        const document = await PatientCard.findById({_id: req.params.id});
        document.examVoucher.push("635892b37c120500f37e9f9b");
        document.save();
        return res.send(document);
    }catch(err) {
        return res.send(err);
    }
}

exports.delete = async (req, res, next) => {
    try{
        const document = await PatientCard.deleteOne({_id: req.params.id});
        if(!document) {
            return next(
                new ApiError(
                    404,
                    "Patient card not found"
                )
            )
        }
        return res.send(
            {
                message: "Delete successfully",
                content: document
            }
        )
    }catch(err) {
        return next(
            new ApiError(
                500,
                `Could not delete patient card with id = ${req.params.id}`
            )
        )
    }
}

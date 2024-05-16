const ApiError = require("../api-error");
const DateWork = require("../models/date.model");

// create a new Date
exports.create = async (req, res, next) => {
    const dates = await DateWork.find().exec();
    if(dates.length) {
        if(Object.keys(req.body) === 0) {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty"
                )
            );
        }

        const newDate = new DateWork({
            date: new Date(req.body.date),
        });
        const date = await DateWork.find({date: req.body.date}).exec();
        const date1 = await DateWork.findOne({date: req.body.date}).exec();

        if(date.length) {
            return res.send(date1);
        }

        try {
            const document = await newDate.save();
            return res.send(document);
        }catch(error) {
            return next(
                new ApiError(500, "An error occurred while creating the Date.")
            );
        }
    }

    try {
        const documents = await DateWork.insertMany([
            {
                date: new Date('2022-11-05'),
            },
            {
                date: new Date("2022-10-06"),
            },
            {
                date: new Date("2022-10-07"),
            },
            {
                date: new Date("2022-10-08"),
            },
        ]);
        return res.send(documents);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the Dates.")
        );
    }
};

// find all Dates
exports.findAll = async (req, res, next) => {
    try {
        const dates = await DateWork.find().populate().exec();
        res.send(dates);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all Dates ???")
        )
    }
}


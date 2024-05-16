const ApiError = require("../api-error");
const Shift = require("../models/shift.model");

// create a new shift
exports.create = async (req, res, next) => {
    const shifts = await Shift.find().exec();
    if(shifts.length) {
        if(Object.keys(req.body) === 0 || req.body.name == null || req.body.start == null || req.body.end == null) {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty"
                )
            );
        }

        const newShift = new Shift({
            name: req.body.name,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
        });
        const shift = await Shift.find(
            {
                $and: [
                    {name: {$in: req.body.name}},
                    {start: {$in: req.body.start}},
                    {end: {$in: req.body.end}}
                ]
            }
        ).exec();

        if(shift.length) {
            return res.send({
                message: "Shift already exists",
                content: shift
            });
        }

        try {
            const document = await newShift.save();
            return res.send(document);
        }catch(error) {
            return next(
                new ApiError(500, "An error occurred while creating the shift.")
            );
        }
    }

    try {
        const documents = await Shift.insertMany([
            {
                name: "morning",
                start: new Date("2015-03-25T07:30:00Z"),
                end: new Date("2015-03-25T09:30:00Z")
            },
            {
                name: "midday",
                start: new Date("2015-03-25T09:30:00Z"),
                end: new Date("2015-03-25T11:30:00Z")
            },
            {
                name: "afternoon",
                start: new Date("2015-03-25T13:30:00Z"),
                end: new Date("2015-03-25T15:00:00Z")
            },
            {
                name: "evening",
                start: new Date("2015-03-25T15:30:00Z"),
                end: new Date("2015-03-25T17:30:00Z")
            },
        ]);
        return res.send(documents);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the shifts.")
        );
    }
};

// find all shifts
exports.findAll = async (req, res, next) => {
    try {
        const shifts = await Shift.find().populate("scheduleWork").exec();
        res.send(shifts);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all shifts ???")
        )
    }
}


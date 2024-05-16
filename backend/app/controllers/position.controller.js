const ApiError = require("../api-error");
const Position = require("../models/position.model");

// create 
exports.create = async (req, res, next) => {
    const positions = await Position.find().exec();
    if(positions.length) {
        if(Object.keys(req.body).length === 0 || req.body.name === "") {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty"
                )
            );
        }

        const newPosition = new Position({
            name: req.body.name,
        });
        const position = await Position.findOne({name: req.body.name}).exec();

        if(position) {
            return res.send({
                message: "Position already exists.",
                content: position
            });
        }

        try {
            const document = await newPosition.save();
            res.send(document);
        }catch (error) {
            return next(
                new ApiError(
                    500, 
                    "An error occurred while creating the work position."
                )
            );
        }
    }
    try {
         documents = await Position.insertMany([
            {
                name: "dentist"
            },
            {
                name: "receptionist"
            }
        ]);
        res.send(documents);

    }catch (error) {
        return next(
            ApiError(
                500,
                "An error occurred while creating the work positions"
            )
        )
    }
}

// find all
exports.findAll = async (req, res, next) => {
    try{
        const positions = await Position.find().exec();
        res.send(positions);
    }catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while finding all work positions"
            )
        );
    }
}
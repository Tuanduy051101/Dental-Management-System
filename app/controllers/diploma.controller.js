const ApiError = require("../api-error");
const Diploma = require("../models/diploma.model");
const { param } = require("../routes/diploma.route");

// create a new diploma
exports.create = async (req, res, next) => {
    const diplomas = await Diploma.find().exec();
    if(diplomas.length != 0) {
        const diplomaNew = new Diploma({
            name: req.body.name,
            institution: req.body.institution,
        });
        const query = Diploma.find();
        const diploma = query.and([
            {name: req.body.name},
            {institution: req.body.institution},
        ]);
        if((await diploma).length != 0) {
            return res.send("Diploma already exists ???")
        }

        try {
            await diplomaNew.save();
            return res.send(diplomaNew);
        }catch(error) {
            return next(
                new ApiError(500, "An error occurred while creating the diploma ???")
            );
        }
    }

    try {
        Diploma.insertMany([
            {
                name: "tốt nghiệp đại học ngành Dược",
                institution: "633c10db4eb4b1ac8e13649f",
            },{
                name: "tốt nghiệp đại học ngành Y Đa Khoa",
                institution: "633c1567f0569a1f374e77fa",
            },{
                name: "tốt nghiệp đại học ngành Y Học Cổ Truyền",
                institution: "633c1567f0569a1f374e77fa",
            },
        ]);
        return res.send("Insert Successfully !!!");
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the diploma ???")
        );
    }
};

// find all diplomas
exports.findAll = async (req, res, next) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== "") {
        searchOptions.name = new RegExp(req.query.name, "i");
    }

    try {
        const diplomas = await Diploma.find(searchOptions).populate("institution").exec();
        if(diplomas.length == 0) {
            res.send(`${searchOptions.name} not found ???`);
        }
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
    const diplomaNew  = req.body;
    let diploma = await Diploma.findById({ _id: req.params.id });
    if(Object.keys(diplomaNew).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try{
        diploma.name = diplomaNew.name;
        diploma.institution = diplomaNew.institution;
        await diploma.save();
        return res.send(diploma);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while updating diploma ???")
        );
    }
}

// delete a diploma

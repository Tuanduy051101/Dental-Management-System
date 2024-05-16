const ApiError = require("../api-error");
const { populate } = require("../models/employee.model");
const Employee = require("../models/employee.model");

exports.create = async (req, res, next) => {
    const employees = await Employee.find().exec();
    if(employees.length) {

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

        const employee = await Employee.find({
            $or: [
                {phone: {$in: req.body.phone}},
                {email: {$in: req.body.email}}
            ]
        }).exec();
        const new_Employee = new Employee({
            name: req.body.name,
            gender: req.body.gender,
            phone: req.body.phone,
            email: req.body.email,
            position: req.body.position,
            diplomas: req.body.diplomas,
            account: "aaaaaaaaaaaaaaaaaaaaaaaa"
        });

        if(employee.length) {
            return next(
                new ApiError(
                    400,
                    "Already exists."
                )
            );
        }

        try {
            const document = await new_Employee.save();
            return res.send(document);
        }catch(error) {
            return next(
                new ApiError(
                    500,
                    "An error occurred while creating the employee."
                )
            )
        }
    }

    try {
        const documents = await Employee.insertMany([
            {
                name: "Tran Thi Thien Nga",
                gender: false,
                phone: "0340090956",
                email: "nga@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Huynh Van Da",
                gender: true,
                phone: "0341160988",
                email: "da@gmail.com",
                position: "6345f8f1c5a666c28320122d",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Nguyen Minh Anh Dao",
                gender: false,
                phone: "0345689977",
                email: "dao@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Nguyen Minh Anh Duoc",
                gender: false,
                phone: "0345683377",
                email: "duoc@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Chau Hong Anh",
                gender: false,
                phone: "03453389977",
                email: "chau@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Nguyen Van Da",
                gender: false,
                phone: "0345683377",
                email: "da@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Nguyen Thanh Quyen",
                gender: false,
                phone: "0345229977",
                email: "quyen@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Dang Tuan Kil",
                gender: false,
                phone: "03451189977",
                email: "kil@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Phan Thanh Hang",
                gender: false,
                phone: "0345119977",
                email: "hang@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Trinh Kim Don",
                gender: false,
                phone: "0345619977",
                email: "don@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Tran Thanh Nam",
                gender: false,
                phone: "0345622977",
                email: "nam@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
            {
                name: "Tran Thi Thanh Thao",
                gender: false,
                phone: "0346789977",
                email: "thao@gmail.com",
                position: "6345f8f1c5a666c28320122e",
                diplomas: "63580433dcb20ae2f59ea578",
                account: "aaaaaaaaaaaaaaaaaaaaaaaa"
            },
        ]);
        return res.send(documents);
    }catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while creating the employees."
            )
        )
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const employees = await Employee.find().populate("position").populate("diplomas").populate("scheduleWorks").exec();
        return res.send(employees);
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
        const document = await Employee.findById({_id: req.params.id}).populate("position").populate({
            path: 'diplomas',
            populate: {path: 'institution'}
        }).exec();
        if(!document) {
            return next(
                new ApiError(
                    404,
                    "Employee not found"
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
                `Could not get employee with id = ${req.params.id}`
            )
        )
    }
}

exports.update = async (req, res, next) => {
    try{
        const employee = await Employee.findOne({_id: "634ffdf0637b197cfa8c9743"}).exec();
        console.log(employee.name);
        employee.scheduleWorks.push("aaaaaaaaaaaaaaaaaaaaaaaa");
        employee.save();
        return res.send(employee);
    }catch (err) {
        console.log(err);
    }
}

exports.delete = async (req, res, next) => {
    try{
        const document = await Employee.deleteOne({_id: req.params.id});
        if(!document) {
            return next(
                new ApiError(
                    404,
                    "Employee not found"
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
                `Could not delete employee with id = ${req.params.id}`
            )
        )
    }
}
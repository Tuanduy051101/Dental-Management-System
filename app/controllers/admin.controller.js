const ApiError = require("../api-error");
const Admin = require("../models/admin.model");

// create a new admin
exports.create = async (req, res, next) => {
    const admins = await Admin.find().exec();
    if(admins) {
        const admin = new Admin({
            name: req.body.name,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
        });
        const query = Admin.find();
        const adminName = query.or([
            {name: req.body.name},
            {email: req.body.email},
            {phone: req.body.phone},
        ]);
        if((await adminName).length != 0) {
            return res.send("Admin already exists ???")
        }

        try {
            await admin.save();
            return res.send(admin);
        }catch(error) {
            return next(
                new ApiError(500, "An error occurred while creating the admin ???")
            );
        }
    }

    try {
        Admin.insertMany([
            {
                name: "Trần Tuấn Duy",
                gender: true,
                dateOfBirth: "2001-11-05",
                phone: "0355750988",
                email: "duy@gmail.com",
                address: "Cần Thơ"
            },{
                name: "Nguyễn Hải Đăng",
                gender: true,
                dateOfBirth: "2001-10-05",
                phone: "0355750978",
                email: "dang@gmail.com",
                address: "Cần Thơ"
            },{
                name: "Châu Hồng Anh",
                gender: true,
                dateOfBirth: "2001-09-05",
                phone: "0355750968",
                email: "duy@gmail.com",
                address: "Cần Thơ"
            },
        ]);
        return res.send("Insert Successfully !!!");
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the admin ???")
        );
    }
};

// find all admins


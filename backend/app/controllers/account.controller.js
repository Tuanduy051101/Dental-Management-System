const ApiError = require("../api-error");
const Account = require("../models/account.model");

exports.create = async (req, res, next) => {
    try {
        const account = await new Account({
            email: "admin@example.com",
            password: "0123456789",
        }).save();
        res.send(account);
    }catch(err) {
        return next(
            ApiError(500, 'error creating account')
        )
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const accounts = await Account.find();
        res.send(accounts);
    }catch(err) {
        return next(
            ApiError(500, 'error finding all accounts')
        )
    }
}
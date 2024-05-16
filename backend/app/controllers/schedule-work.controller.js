const ApiError = require("../api-error");
const ScheduleWork = require("../models/schedule-work.model");
const Employee = require('../models/employee.model');
const _Date = require('../models/date.model');

// create a new ScheduleWork
exports.create = async (req, res, next) => {
    
    if(Object.keys(req.body) == 0) {
        return next(
            new ApiError(
                400,
                "Data to create can not be empty"
            )
        );
    }

    const newScheduleWork = new ScheduleWork({
        date: req.body.date,
        note: req.body.note || "no note",
        shifts: req.body.shifts,
        employee: req.body.employee,
    });
    const scheduleWork = await ScheduleWork.find(
        {
            $and: [
                {employee: {$in: req.body.employee}},
                {date: {$in: req.body.date}},
            ]
        }
    ).exec();

    if(scheduleWork.length) {
        return res.send({
            message: "ScheduleWork already exists",
            content: scheduleWork
        });
    }

    try {
        const document = await newScheduleWork.save();

        // update employee
        const employee = await Employee.findById(req.body.employee);
        employee.scheduleWorks.push(document._id);
        await employee.save();

        // update date
        const _date = await _Date.findById(req.body.date);
        _date.scheduleWorks.push(document._id);
        await _date.save();

        return res.send(_date, employee, document);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the ScheduleWork.")
        );
    }
};

// find all ScheduleWorks
exports.findAll = async (req, res, next) => {
    try {
        const scheduleWorks = await ScheduleWork.find().populate("date").populate("employee").populate("shifts").exec();
        res.send(scheduleWorks);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all ScheduleWorks ???")
        )
    }
}

exports.find = async (req, res, next) => {
    try {
        const scheduleWork = await ScheduleWork.findById({_id: req.params.id}).populate("date").populate("employee").populate("shifts").exec();
        res.send(scheduleWork);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all ScheduleWorks ???")
        )
    }
}

exports.delete = async (req, res, next) => {
    try {
        const schedule = await ScheduleWork.findByIdAndDelete(req.params.id);
        // update employee
        const employee = await Employee.findById(schedule.employee);
        employee.scheduleWorks = employee.scheduleWorks.filter(
            (value, index) => {
                return ![value].join("").includes(schedule._id);
            }
        )
        await employee.save();

        // update date
        const _date = await _Date.findById(schedule.date);
        _date.scheduleWorks = _date.scheduleWorks.filter(
            (value, index) => {
                return ![value].join("").includes(schedule._id);
            }
        )
        await _date.save();

        res.send(employee);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while deleting")
        )
    }
}


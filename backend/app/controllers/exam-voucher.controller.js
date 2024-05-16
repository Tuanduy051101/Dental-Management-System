const ApiError = require("../api-error");
const ExamVoucher = require("../models/exam-voucher.model");
const Patient = require("../models/patient-card.model");
const Schedule = require("../models/schedule-work.model");

// create a new ExamVoucher
exports.create = async (req, res, next) => {
    if(Object.keys(req.body) === 0) {
        return next(
            new ApiError(
                400,
                "Data to create can not be empty"
            )
        );
    }

    const newExamVoucher = new ExamVoucher({
       stt: req.body.stt,
       expression: req.body.expression,
       patientCard: req.body.patientCard,
       scheduleWork: req.body.scheduleWork,
    });
    const examVoucher = await ExamVoucher.find(
        {
            $and: [
                {stt: {$in: req.body.stt}},
                {scheduleWork: {$in: req.body.scheduleWork}},
            ]
        }
    ).exec();

    if(examVoucher.length) {
        return res.send({
            message: "ExamVoucher already exists",
            content: ExamVoucher
        });
    }

    try {
        const document = await newExamVoucher.save();
        // update patient card
        const patient = await Patient.findById(req.body.patientCard);
        patient.examVoucher.push(document._id);
        await patient.save();

        // update schedule
        const schedule = await Schedule.findById(req.body.scheduleWork);
        schedule.examVoucher.push(document._id);
        await schedule.save();
        
        return res.send(document);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the ExamVoucher.")
        );
    }
};

// find all ExamVouchers
exports.findAll = async (req, res, next) => {
    try {
        const examVouchers = await ExamVoucher.find().populate("patientCard").populate(
            // "scheduleWork"
            {
                path: 'scheduleWork',
                populate: {
                    path: 'employee',
                    path: 'date'
                },
            }
        ).exec();
        console.log(examVouchers);
        res.send(examVouchers);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all ExamVouchers ???")
        )
    }
}


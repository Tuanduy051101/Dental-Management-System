const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const ApiError = require("./app/api-error");
const institutionRouter = require("./app/routes/institution.route");
const diplomasRouter = require("./app/routes/diploma.route");
const positionRouter = require("./app/routes/position.route");
const medicineRouter = require("./app/routes/medicine.route");
const patientCardRouter = require("./app/routes/patient-card.route");
const shiftRouter = require("./app/routes/shift.route");
const employeeRouter = require("./app/routes/employee.route");
const scheduleWorkRouter = require("./app/routes/schedule-work.route");
const examVoucherRouter = require("./app/routes/exam-voucher.route");
const dateRouter = require("./app/routes/date.route");
const accountRouter = require("./app/routes/account.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// register routes
app.use("/api/institutions", institutionRouter);
app.use("/api/diplomas", diplomasRouter);
app.use("/api/positions", positionRouter);
app.use("/api/medicines", medicineRouter);
app.use("/api/patient_cards", patientCardRouter);
app.use("/api/shifts", shiftRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/schedule_works", scheduleWorkRouter);
app.use("/api/exam_vouchers", examVoucherRouter);
app.use("/api/dates", dateRouter);
app.use("/api/accounts", accountRouter);


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the clinic management app." });
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;



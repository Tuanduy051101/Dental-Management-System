const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const ApiError = require("./app/api-error");
const adminsRouter = require("./app/routes/admin.route");
const indexesRouter = require("./app/routes/index.route");
const institutionRouter = require("./app/routes/institution.route");
const diplomasRouter = require("./app/routes/diploma.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(indexesRouter);

// register routes
app.use("/api/admins", adminsRouter);
app.use("/api/admin/institution", institutionRouter);
app.use("/api/admin/diploma", diplomasRouter);

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



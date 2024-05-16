const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");

// start server
const uri = config.db.uri;
const port = config.app.port;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// connect db
mongoose.connect(uri, options);

// get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors
db.on("error", console.error.bind(console, "MongDB connection error : "));
db.once("open", () => {
    console.log("Connected to Database");
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});



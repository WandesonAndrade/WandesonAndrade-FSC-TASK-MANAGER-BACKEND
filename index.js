const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectToDatabase();

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.listen(8000, () => {
    console.log("Server is running on port 3000");
});

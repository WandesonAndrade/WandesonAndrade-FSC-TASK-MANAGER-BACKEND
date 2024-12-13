const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const taskRouter = require("./src/routes/task.routes");

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();

app.use("/tasks", taskRouter);
//inicia o servidor
app.listen(8000, () => {
    console.log("Server is running on port 3000");
});

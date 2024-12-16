const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectToDatabase = require("./src/database/mongoose.database");
const taskRouter = require("./src/routes/task.routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 8000;
//inicia o servidor
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

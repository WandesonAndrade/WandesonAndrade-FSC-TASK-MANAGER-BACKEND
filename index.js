const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.models");

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();

app.get("/tasks", async (req, res) => {
    try {
        // retorna todas as tasks
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        // cria uma task
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskToDelete = TaskModel.findById(taskId);
        if (!taskToDelete) {
            return res.status(500).send("Task not found");
        }
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 3000");
});

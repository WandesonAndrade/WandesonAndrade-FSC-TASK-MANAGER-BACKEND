const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.models");
const taskModel = require("./src/models/task.models");

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();

//retorna todas as tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});
//busca uma task por id
app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).send("Task not found");
        }
        return res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});
//cria uma task
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

//atualiza uma task
app.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const updateTask = await TaskModel.findById(taskId);
        const allowedUpdate = ["isCompleted"];
        const requestedUpdate = Object.keys(taskData);

        for (update of requestedUpdate) {
            if (allowedUpdate.includes(update)) {
                updateTask[update] = taskData[update];
            } else {
                return res.status(500).send("Invalid update");
            }
        }
        await updateTask.save();
        return res.status(200).send(updateTask);
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

//inicia o servidor
app.listen(8000, () => {
    console.log("Server is running on port 3000");
});

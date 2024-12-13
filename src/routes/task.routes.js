const express = require("express");
const TaskModel = require("../models/task.models");

const router = express.Router();

//retorna todas as tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});
//busca uma task por id
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;

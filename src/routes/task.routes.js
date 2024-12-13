//import de bibliotecas
const express = require("express");

//import de arquivos
const TaskModel = require("../models/task.models");
const TaskController = require("../controllers/task.controller");

const router = express.Router();

//retorna todas as tasks
router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});
//busca uma task por id
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTaskById();
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
    return new TaskController(req, res).updateTask();
});

//Delete task
router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask();
});

module.exports = router;

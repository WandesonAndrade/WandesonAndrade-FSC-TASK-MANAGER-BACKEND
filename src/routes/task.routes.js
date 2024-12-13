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
    return new TaskController(req, res).createTask();
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

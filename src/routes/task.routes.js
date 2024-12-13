//import de bibliotecas
const express = require("express");

//import de arquivos
const TaskModel = require("../models/task.models");
const TaskController = require("../controllers/task.controller");

const router = express.Router();

//rota para retornar todas as tasks
router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});
//rota para buscar uma task por id
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTaskById();
});
//rota para criar uma task
router.post("/", async (req, res) => {
    return new TaskController(req, res).createTask();
});

//rota para atualizar uma task
router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).updateTask();
});

//rota para deletar uma task
router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask();
});

module.exports = router;

const mongoose = require("mongoose");

const TaskModel = require("../models/task.models");
const { dbError, objectCastIdError } = require("../errors/mongodb.error");
const { notAllowed } = require("../errors/general.error");

//classe controller
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    //retorna todas as tasks
    async getTasks() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error);
        }
    }
    //busca uma task por id
    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return dbError(this.res);
            }

            return this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectCastIdError(this.res);
            }
            this.res.status(500).send(error);
        }
    }
    //cria uma task
    async createTask() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error);
        }
    }
    //atualiza uma task
    async updateTask() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const updateTask = await TaskModel.findById(taskId);

            if (!updateTask) {
                return dbError(this.res);
            }

            const allowedUpdate = ["isCompleted"];
            const requestedUpdate = Object.keys(taskData);

            for (const update of requestedUpdate) {
                if (allowedUpdate.includes(update)) {
                    updateTask[update] = taskData[update];
                } else {
                    return notAllowed(this.res);
                }
            }
            await updateTask.save();
            return this.res.status(200).send(updateTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectCastIdError(this.res);
            }
            this.res.status(500).send(error);
            console.error("Erro ao atualizar a tarefa:", error);
        }
    }
    //Delete task
    async deleteTask() {
        try {
            const taskId = this.req.params.id;
            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) {
                return dbError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectCastIdError(this.res);
            }
            this.res.status(500).send(error);
        }
    }
}

module.exports = TaskController;

const TaskModel = require("../models/task.models");
const { dbError } = require("../errors/mongodb.error");

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
            const allowedUpdate = ["isCompleted"];
            const requestedUpdate = Object.keys(taskData);

            if (!updateTask) {
                return dbError(this.res);
            }

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
            this.res.status(500).send(error);
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
            this.res.status(500).send(error);
        }
    }
}

module.exports = TaskController;

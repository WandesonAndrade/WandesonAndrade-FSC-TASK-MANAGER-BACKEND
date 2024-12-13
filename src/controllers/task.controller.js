const TaskModel = require("../models/task.models");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async getTasks() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error);
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return this.res.status(404).send("Task not found");
            }
            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error);
        }
    }

    async updateTask() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;
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
            this.res.status(500).send(error);
        }
    }

    async deleteTask() {
        try {
            const taskId = this.req.params.id;
            const taskToDelete = TaskModel.findById(taskId);
            if (!taskToDelete) {
                return res.status(500).send("Task not found");
            }
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error);
        }
    }
}

module.exports = TaskController;

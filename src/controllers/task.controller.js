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
}

module.exports = TaskController;

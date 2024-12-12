const { Schema, model } = require("mongoose");

const TaskSkema = Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const taskModel = model("Task", TaskSkema);

module.exports = taskModel;

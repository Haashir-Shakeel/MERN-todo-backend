const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

const TaskModel = mongoose.model("tasks", TaskSchema)
module.exports = TaskModel
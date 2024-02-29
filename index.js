const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TaskModel = require('./models/tasks')
const path = require("path")
const app = express()
require('dotenv').config();

app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGODB_URL)   

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

app.get('/get', (req, res)=>{
    TaskModel.find()
    .then(result => res.json(result)).then(console.log("succes"))
    .catch(error => res.json(error))

})

app.put('/update/:id', async (req,res) => {
    // const completed = req.body.completed;
    console.log(req.body);
    const taskid = req.params.id
    const task = await TaskModel.findOne({_id: taskid})
    task.completed = !task.completed
    await task.save()
        console.log(task)

    res.json(task)
})


app.delete('/delete/:id', (req,res) => {
    const task = req.body.task;
    const taskid = req.params.id
    TaskModel.findByIdAndDelete({
        _id: taskid}
        ).then(result => res.json(result)).then(console.log("succes"))
    .catch(error => res.json(error))
})

app.post('/add', (req,res) => {
    const task = req.body.task;
    TaskModel.create({
        task: task,
        completed: false
    }).then(result => res.json(result)).then(console.log("succes"))
    .catch(error => res.json(error))
})

app.listen('3000',()=>{
    console.log('server is up and running on port 3000');
})
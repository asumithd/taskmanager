const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect("mongodb://localhost:27017/taskmanager", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done"],
        required: true,
    },
});

const Task = mongoose.model("Task", taskSchema);

app.get("/api/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.put("/api/tasks/:id", async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedTask);
});

app.delete("/api/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

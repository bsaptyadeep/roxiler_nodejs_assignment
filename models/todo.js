const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    userId: {type: Number, required: false},
    completed: { type: Boolean, required: true }
 },{ _id : false });

 const Todo = mongoose.model("todo", todoSchema);

 module.exports = Todo;
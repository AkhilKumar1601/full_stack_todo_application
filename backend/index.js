import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userModel, todoModel } from "./db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "dsfdfsldk";
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:12akhilKumar34@cluster0.hms7u.mongodb.net/todoApplication"
);

// auth middleware
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  await userModel.create({ name, email, password });

  res.json({ message: "You are successfully signed up." });
});

// signin
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const response = await userModel.findOne({ email, password });
  if (response) {
    const token = jwt.sign({ id: response._id.toString() }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Signin successful", token });
  } else {
    res.json({ message: "Incorrect credentials" });
  }
});

// get todos
app.get("/todos", auth, async (req, res) => {
  try {
    const todos = await todoModel.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

// create todo
app.post("/todo", auth, async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = await todoModel.create({
      title,
      completed: false,
      userId: req.userId,
    });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo" });
  }
});

// update todo
app.put("/todo/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

// delete todo
app.delete("/todo/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await todoModel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

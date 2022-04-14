const express = require("express");
const cors = require("cors");

const DB = require("../database/db");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Welcome to my backend application!");
});

server.get("/api/users", (req, res) => {
  const users = DB.getUsers();
  res.status(200).json(users);
});

server.post("/api/register", (req, res) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.password) {
    res.status(400).json({ message: "Username and password are both required to register" });
  } else {
    DB.insertUser(newUser);
    res.status(201).json(newUser);
  }
});

server.post("/api/login", (req, res) => {
  const loggingInUser = req.body;
  if (!loggingInUser.username || !loggingInUser.password) {
    res.status(400).json({ message: "Username and password are both required to login" });
  } else {
    const answer = DB.loginUser(loggingInUser);
    if (answer === 1) {
      res.status(200).send(process.env.LOGIN_MESSAGE);
    } else {
      res.status(404).json({ message: "Incorrect username or password, user not found" });
    }
  }
});

module.exports = server;

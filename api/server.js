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
  DB.getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in retrieving the users" });
    });
});

server.post("/api/register", (req, res) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.password) {
    res.status(400).json({ message: "Username and password are both required to register" });
  } else {
    DB.insertUser(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: "There was an error in creating the user" });
      });
  }
});

server.post("/api/login", (req, res) => {
  const loggingInUser = req.body;
  if (!loggingInUser.username || !loggingInUser.password) {
    res.status(400).json({ message: "Username and password are both required to login" });
  } else {
    DB.loginUser(loggingInUser)
      .then((answer) => {
        if (answer === 1) {
          res.status(200).send(process.env.LOGIN_MESSAGE);
        } else {
          res.status(404).json({ message: "Incorrect username or password, user not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "There was an error while logging you in." });
      });
  }
});

module.exports = server;

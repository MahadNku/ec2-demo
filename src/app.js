const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let idCounter = 1;

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/", (req, res) => {
  res.send("Hello from my Node.js backend on EC2!");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const user = { id: idCounter++, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Not found" });
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Not found" });
  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = app;

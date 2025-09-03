const express = require("express");
const { exec } = require("child_process");

const app = express();

app.post("/deploy", (req, res) => {
  exec("cd ~/ec2-demo && git pull origin main && npm install && pm2 restart server", (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

app.listen(4000, () => console.log("Deploy server running on port 4000"));

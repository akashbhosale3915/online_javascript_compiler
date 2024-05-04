const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
app.use(express.json());
app.use(cors());

const userFolder = "./user";
const userFile = "./user/index.js";
if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder);
if (!fs.existsSync(userFile))
  fs.writeFileSync(userFile, "", "utf-8");

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.post("/run", (req, res) => {
  req.on("data", (data) => {
    const code = data.toString();
    fs.writeFileSync(userFile, code, "utf-8");
  });

  exec(`node ${userFile}`, (err, stdout, stderr) => {
    if (err) {
      res.json({ status: "error", message: err.message });
      return;
    }
    if (stderr) {
      res.json({ status: "error", message: stderr });
      return;
    }
    res.json({ status: "ok", message: stdout.trim() });
  });
});

app.listen(9000, () => {
  console.log("Server running on port 9000");
});

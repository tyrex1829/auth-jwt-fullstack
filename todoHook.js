import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

const app = express();
const port = 3001;

const users = [];
const JWT_SECRET = "Tyrex_TodoHook_app";

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((u) => u.username === username)) {
    alert("already signed up as a user!");
    res.json({
      message: "Already a user",
    });
    return;
  }
  users.push({
    username: username,
    password: password,
  });

  res.send("Successfully Signed up!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

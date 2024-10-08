import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const port = 3001;

const users = [];
const JWT_SECRET = "Tyrex_TodoHook_app";

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*", // Allow requests from any origin
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
  })
);

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
    return res.status(400).json({
      message: "User already exists",
    });
  }

  users.push({
    username: username,
    password: password,
  });

  res.status(201).json({
    message: "Successfully signed up",
  });
});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signin.html"));
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      JWT_SECRET
    );
    user.token = token;
    res.status(200).json({
      token, // Return the token
    });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid Username or Password",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.authorization;

  console.log("Authorization Header:", token);
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Unauthorized",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "unauthorized",
    });
  }
}

app.get("/me", auth, (req, res) => {
  const user = req.user;

  res.send({
    username: user.username,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

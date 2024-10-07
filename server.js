import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

let users = [];

app.use(express.json());

const JWT_SECRET = "USER_APP";

app.get("/", (req, res) => {
  res.send("landing page");
});

app.post("/signing-up", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((u) => u.username === username)) {
    res.json({
      message: "You are already signed-up",
    });
    return;
  }

  users.push({
    username,
    password,
  });

  res.send({
    message: "Successfully signed up",
  });
});

app.post("/signing-in", (req, res) => {
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
    res.send({
      token,
    });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.authorization;
  const userDetails = jwt.verify(token, JWT_SECRET);
  const username = userDetails.username;

  const user = users.find((u) => u.username === username);

  if (user) {
    res.send({
      username: user.username,
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

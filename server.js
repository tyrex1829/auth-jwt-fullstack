import express from "express";

const app = express();
const port = 3000;

let users = [];

app.use(express.json());

function generateRandomToken() {
  return "&x" + Math.floor(Math.random() * 1000000) + 1 + "x" + "@0";
}

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
    const token = generateRandomToken();
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
  const user = users.find((u) => u.token === token);

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

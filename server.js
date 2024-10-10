import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

let users = [];

app.use(express.json());
app.use(express.static("./public"));

const JWT_SECRET = "USER_APP";

app.get("/", (req, res) => {
  // res.sendFile("index.html");
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

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Unauthorized",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
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

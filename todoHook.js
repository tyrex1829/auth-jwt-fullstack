import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

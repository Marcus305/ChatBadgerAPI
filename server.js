import router from "./routes.js";
import express from "express";
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

app.use("/users", router);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

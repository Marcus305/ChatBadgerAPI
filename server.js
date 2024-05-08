import userRouter from "./userRoutes.js";
import roomRouter from "./roomRoutes.js";
import express from "express";
import messageRouter from "./messageRoutes.js";
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

app.use("/users", userRouter);

app.use("/rooms", roomRouter);

app.use("/messages", messageRouter);
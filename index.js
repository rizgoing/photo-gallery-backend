import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as PostController from "./controllers/Post.js";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", PostController.create);
app.post("/posts/:id", PostController.update);
app.delete("/posts/:id", PostController.remove);

app.listen(process.env.PORT || "4444", (err) => {
  err ? console.log(err) : console.log(`Server is running on port ${PORT}`);
});

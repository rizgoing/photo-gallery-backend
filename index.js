import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as PostController from "./controllers/Post.js";

const app = express();

const portServer = false;
const PORT = 4444 || portServer;

mongoose
  .connect(
    "mongodb+srv://alcohoolik:AgwoZnkdwGzE32SB@cluster0.6eyzvnu.mongodb.net/photos?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", PostController.create);
app.post("/posts/:id", PostController.update);
app.delete("/posts/:id", PostController.remove);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is running on port ${PORT}`);
});

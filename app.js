import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";
const app = express();
import userRoutes from "./routes/users.js";

app.use(bodyparser.json());
app.use(cors());
app.use("/user", userRoutes);

const uri =
  "mongodb+srv://den:den123@cluster0.rn771.mongodb.net/login-authentication?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() =>
    app.listen(process.env.PORT || 8080, () => {
      console.log("listening for request");
    })
  )
  .catch((err) => console.log(err));

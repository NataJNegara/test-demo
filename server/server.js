import express from "express";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

// // resolving dirname for ES Module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// // use the client app
// app.use(express.static(path.join(__dirname, "/client/dist")));
// // render client for any path
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/dist/index.html"));
// });

mongoose
  .connect(process.env.DB_URI, { dbName: "mern-demo" })
  .then(() => {
    console.log("connect to DB successfully");
    app.listen(port, () =>
      console.log(`listening to : http://localhost:${port}`)
    );
  })
  .catch((err) => console.log(err));

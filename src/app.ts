import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
import permitRoute from "./router/permit.routes";
import fileUpload from "express-fileupload";
import roleRoute from "./router/role.routes";
import userRoute from "./router/user.routes";
import imageRoute from "./router/image.routes";
import videoRoute from "./router/video.routes";
import catRoute from "./router/cat.routes";
import tagRoute from "./router/tag.routes";
import seriesRoute from "./router/seriese.routes";
import verifyRoute from "./router/verify.routes";

const app = express();

const server = require("http").createServer(app);

const port = config.get<number>("port");
const host = config.get<string>("host");
const dbUrl = config.get<string>("dbUrl");

app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(express.static(__dirname));

mongoose.connect(dbUrl);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("ok");
});

app.use("/permit", permitRoute);
app.use("/role", roleRoute);
app.use("/user", userRoute);
app.use("/image", imageRoute);
app.use("/cat", catRoute);
app.use("/tag", tagRoute);
app.use("/video", videoRoute);
app.use("/series", seriesRoute);
app.use("/verify", verifyRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 409;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

server.listen(port, () =>
  console.log(`server is running in  http://${host}:${port}`)
);

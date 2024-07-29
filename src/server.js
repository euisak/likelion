import "./db";
import express from "express";
import morgan from "morgan";
import path from "path";
import globalRouter from "./routers/globalRouter";
import storeRouter from "./routers/storeRouter";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/", globalRouter);
app.use("/store", storeRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

export default app;

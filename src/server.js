import express from "express";
import morgan from "morgan";
import path from "path";
import globalRouter from "./routers/globalRouter";
import shoppingRouter from "./routers/shoppingRouter";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";




const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(express.static(path.join(process.cwd(), "src/public")));

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/shopping", shoppingRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

export default app;

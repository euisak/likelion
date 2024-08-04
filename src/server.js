import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import flash from "connect-flash";
import centerRouter from "./routers/centerRouter";
import userRouter from "./routers/userRouter";
import storeRouter from "./routers/storeRouter";
import adminRouter from "./routers/adminRouter";
import postRouter from "./routers/postRouter";
import challengeRouter from "./routers/challengeRouter";
import { localsMiddleware } from "./middlewares";
import { MongoClient } from "mongodb";

dotenv.config();

// MongoDB 클라이언트 생성
const mongoUrl = process.env.DB_URL1;
if (!mongoUrl) {
    throw new Error('DB_URL1 환경 변수가 설정되지 않았습니다.');
}
const mongoClient = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoClient.connect();

const PORT = 4000;
const app = express();
const db = mongoose.connection;

// 데이터베이스 연결
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set("view engine", "pug"); // pug 사용
app.set("views", path.join(process.cwd(), "src/views"));

app.use(express.static(path.join(process.cwd(), "src/public")));
app.use(morgan("dev"));
app.use(express.static(path.join(process.cwd(), "src")));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            client: mongoClient, // MongoClient 인스턴스를 store에 전달
        }),
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(localsMiddleware);
app.use("/", centerRouter);
app.use("/user", userRouter);
app.use("/store", storeRouter);
app.use("/admin", adminRouter);
app.use("/post", postRouter);
app.use("/challenge", challengeRouter);


const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🔥`);
const handleOpen = () => console.log("✅ Connected to Store DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.once("open", handleOpen);
db.on("error", handleError);

app.listen(PORT, handleListening);

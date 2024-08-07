import express from "express";
import dotenv from "dotenv";
import passport from "./libs/passport";
import authRouter from "./routes/auth.route";
import oauthRouter from "./routes/oauth.route";
import profileRouter from "./routes/profile.route";
import statisticRouter from "./routes/statistic.route";
import userRouter from "./routes/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(
  cors({
    origin: `${process.env.BASE_URL_CLIENT}`,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/",oauthRouter);
app.use("/auth",authRouter);
app.use("/statistic", statisticRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

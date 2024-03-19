import express, { Response, Application } from "express";
import "dotenv/config";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./user/routes";

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", userRouter);

app.get("/", (_, res: Response) => {
  res.send("App is LiVE");
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
};

start();

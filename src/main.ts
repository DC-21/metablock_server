import express, { Response, Application } from "express";
import "dotenv/config";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";

const app: Application = express();
const PORT = process.env.PORT || 1400;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res: Response) => {
  res.send("BONDI is LiVE");
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`Bondi is running on http://localhost:${PORT}`);
  });
};

start();

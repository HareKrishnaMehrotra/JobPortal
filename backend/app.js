import express from "express";
import { config } from "dotenv";
import cors from "cors"; // cors use hota connection establish karne ke liye between front and back end
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";


const app = express();
config({ path: "./config/config.env" }); //config ko import kara from dotenv fir file ki loc dedi

app.use( //app.use mtlb cors ko as a middleware use kar rahe
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser()); // jb user login karta toh json web token generate hota, toh usko backend mae access karne keliye ye use karte
app.use(express.json()); // ye aur neeche waala kis type ka data aarha wo pata lagane ke liye middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

newsLetterCron()
connection();
app.use(errorMiddleware);

export default app;

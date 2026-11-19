import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { carRouter } from "./routes/carRouter";

import indexRouter from "./routes/index";
import customersRouter from "./routes/customers";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

/**************** ROTAS ****************/

app.use("/", indexRouter);

app.use("/customers", customersRouter);

app.use("/cars", carRouter);

export default app;

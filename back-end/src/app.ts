import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./router/index";
import usersRouter from "./router/users";
import customersRouter from "./router/customers";
import carsRouter from "./router/cars";        

import cors from 'cors'

const app = express();

app.use(cors({
 origin: process.env.ALLOWED_ORIGINS.split(','),
}))

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

/***************** ROTAS *************************/

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/customers", customersRouter);
app.use("/cars", carsRouter);

export default app;
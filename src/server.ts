import "reflect-metadata";
import express, { json } from "express";
import { router } from "./routes";

import "./database";

const app = express();

app.use(json);

app.use(router);

app.listen(3000, () => console.log("Server Running"));
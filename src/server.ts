import express, { Application } from "express";
import { PORT } from "./keys";

const app: Application = express();

app.listen(PORT, () => console.log("Server listening..."));

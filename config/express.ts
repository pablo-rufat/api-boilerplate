import express from "express";
import * as bodyParser from "body-parser";
import { key } from "../config/config";

export const app = express();
export const routes = express.Router();

app.set('key', key);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
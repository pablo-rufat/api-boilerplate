import express from "express";
import * as bodyParser from "body-parser";
import { key } from "../config/config";
import * as jwt from "jsonwebtoken";

export const app = express();
export const routes = express.Router();

app.set('key', key);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes.use((req, res, next) => {
    const accessToken = req.headers["access-token"];
    const token = Array.isArray(accessToken) ? accessToken[0] : accessToken;
    if (token) {
        jwt.verify(token, app.get("key"), (err: any, decoded: any) => {
            if (err) {
                return res.json({ mensaje: "Token inválida" });
            } else {
                req.body.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            message: "Invalid token"
        });
    }
 });
import { app, routes } from "../config/express";
import * as jwt from "jsonwebtoken";

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
import express from "express";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";
import { key } from "../config/config";

const app = express();

app.set('key', key);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Inicio');
});

app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000')
});
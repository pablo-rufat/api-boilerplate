import { app, routes } from "../config/express";
import * as jwt from "jsonwebtoken";

app.get('/', (req, res) => {
    res.send('Inicio');
});

app.post('/login', (req, res) => {
    if(req.body.user === "pablo" && req.body.pass === "pablo") {
        const payload = {
            check:  true,
        };
        const token = jwt.sign(payload, app.get('key'), {
            expiresIn: 1440,
        });
        res.json({
            message: 'Logged in',
            token,
        });
    } else {
        res.json({ message: "Invalid user or password"})
    }
});

app.get('/data', routes, (req, res) => {
    const data = [
        { id: 1, nombre: "Asfo" },
        { id: 2, nombre: "Denisse" },
        { id: 3, nombre: "Carlos" }
    ];

    res.json(data);
});

app.listen(3000,()=>{
    console.log('Server running at 3000')
});
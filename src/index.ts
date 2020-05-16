import { app, routes } from "../config/express";
import * as jwt from "jsonwebtoken";
import { database } from "../config/config";
import { UserDTO } from "./interfaces";

app.get('/', (req, res) => {
    res.send('Inicio');
});

app.post('/login', (req, res) => {
    const username = req.body.user;
    database.userRepository.getUserByName(username)
    .then( (result) => {
        if(result.password === req.body.pass) {
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
            res.json({ message: "Invalid password"}).status(400).send();
        }
    })
    .catch( (error) => {
        res.json({ message: "Invalid user"}).status(400).send();
    });
});

app.post('/register', (req, res) => {
    const newUser: UserDTO = req.body;
    database.userRepository.getUserByEmailOrName(newUser.email, newUser.name)
    .then( (result) => {
        if (result) {
            res.json({ message: "Email or name already exists"}).status(400).send();
        }else {
            database.userRepository.createUser(newUser)
            .then( user => {
                res.json(user).status(201).send();
            })
            .catch(error => {
                res.json({ message: `Fatal: ${error}`}).status(500).send();
            });
        }
    })
    .catch( (error) => {
        res.json({ message: `Fatal: ${error}`}).status(500).send();
    });
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
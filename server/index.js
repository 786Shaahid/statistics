import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { ConnectionDB } from "./src/configure/mongoose.configure.js";
import routes from './src/services/services.routes.js';

const app = express();
const port = process.env.PORT;
/** EXPRESS MIDDLEWARE */
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

/** ROUTES */
app.use('/api', routes);

// for testing the api
app.get('/*', (req, res) => {
    return res.send("<h1 style='text-align: center; margin-top:10rem'>404 PAGE<h1>");
});



ConnectionDB().then((connectedDB) => {
    app.listen(port, () => {
        console.log(`app listening on port ${port}`);
        console.log(`connected to DB:: ${ConnectionDB.name}`);
    })
}).catch((error) => console.log(`${error} did not connect`));






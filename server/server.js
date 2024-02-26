import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from "./router/route.js";
const app = express();

/*middleware*/
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack
app.use('/uploads',express.static('uploads'))
app.use(express.urlencoded({extended:false}))
const port = 8080;

/*http GET request*/
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

// api routes
app.use('/api',router); //end point for routes

//start server when valid mongodb conection 
connect().then(() => {  //if successfull promise return from connect file
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})
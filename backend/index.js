import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'; // Add this line
import cors from 'cors';//from gpt

import booksRoute from './routes/booksRoute.js';

const app = express();

//Middleware for parsing request body 
app.use(express.json());


//Middleware for handling cors policy
//Option1 hai ke use all origins
app.use(cors());


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to SAIM');

});

app.use('/books', booksRoute);
mongoose
    .connect(mongoDBURL)
    .then( () => {
        console.log('App is connected to database!');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error);
    });
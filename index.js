import express  from "express";
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import { usersRouter } from "./routes/users.js";
import {mailRouter} from './routes/mailSend.js';

dotenv.config();  // getting all env keys from here

const app = express()

app.use(express.json());
// const MONGO_URL = "mongodb://localhost:27017/";

app.use(cors());
 const MONGO_URL = process.env.MONGO_URL; // if MONGO_URL is not defined in .env file, it will take localhost url

//To create connection 
async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB connected");
    return client;
};


//calling that function 
export const client = await createConnection();        //await outside async fun allowed only in "type" :"module"

const PORT = process.env.PORT || 5000;
 
app.listen(PORT,()=>{
    console.log(`Server is up and running at ${PORT}`)
})
 

app.get('/',(req,res)=>{
    res.send('Welcome to Email Backend Server')  
})
app.use('/mailForm',mailRouter);    // Whenever mailForm is coming, it will be routed to mailRouter
app.use("/users",usersRouter);    // For signup and login



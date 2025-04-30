import express  from "express";
const router = express.Router();
import { getAllData, getDataByID, createData, deleteDataByID, updateDataByID} from '../helper.js'
import { sendMail } from '../nodeMailerApp.js';
import {auth} from '../middleware/auth.js'

router
    .route("/")
    .get(auth,async(req,res)=>{
        console.log(req.query)
        const filter=req.query;
        const filtData = await getAllData(filter) ;
        res.send(filtData)
        
        
    })
    .post(auth,async(req,res)=>{
    
        const data = req.body;       //req.body[0] is used since it will taken as array and only one value is there
        console.log(`Incoming data ${data}`)
        const result = createData(data) ;
        res.send(result)
        // Sending mail 
        const emailData = req.body[0];       //req.body[0] is used since it will taken as array and only one value is there
        sendMail(emailData).then(result => console.log('Email Sent ', result))
        .catch((error)=>console.log(error.message)) 
    
        
});

export const mailRouter = router;

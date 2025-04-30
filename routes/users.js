import express from "express";
import bcrypt from "bcrypt"; 
import jwt from 'jsonwebtoken';


import { createUsers,genPassword,getUserByName } from "../userHelper.js";
const router = express.Router();



//signup process
router
    .route("/signup")
    .post(async(request,response)=>{
        //POST Method
        const  {username,password,date,displayDate} = request.body;
        
        const isUserExist  = await getUserByName(username);
        console.log(`userExist ${isUserExist}`)
        //checking whether the username already exists
        if(isUserExist[0]!=undefined)
        {
            response.status(400).send({message: "Username already exists",status:false});
            return;
        }
        //Password strength checking
        if(
            !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
        ){
            response.status(400).send({message: "Password pattern did not match",status:false});
            return;
        }

        const hashedPassword = await genPassword(password);

        const result = await createUsers({username:username,password:hashedPassword,date:date,userCreatedAt:displayDate});
    
        response.status(200).send({message:'User Registered successfully', status:true})
    });

//signin process
router
    .route("/login")
    .post(async(request,response)=>{
        //POST Method
        const  {username,password} = request.body;
        

        const userFromDB  = await getUserByName(username);
        console.log('UserfromDB',userFromDB)
        //checking whether the username already exists 

        if(userFromDB[0]===undefined)
        {
            response.status(401).send({message: "User does not exist",status:'notUser'});
            return;
        }
        else{

            const storedPassword = userFromDB[0].password;
            const isPasswordMatch = await bcrypt.compare(password,storedPassword);
            console.log(storedPassword);

            if(isPasswordMatch){
                // issue the token
                // const token = jwt.sign({id:userFromDB[0]._id}, process.env.SECRET_KEY);
                const token = jwt.sign({id:userFromDB[0]._id}, process.env.SECRET_KEY);
                console.log(token);
                response.send({message:"Successful login", token:token,status:'success'});
            }
            else{
                response.status(401).send({message: "Invalid Credentials",status:'notPwd'});
            }
        }
        
        
    });


export const usersRouter = router;
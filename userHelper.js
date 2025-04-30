//This page contains functions that is used in user signup and signin progress
import { client } from "./index.js";
import bcrypt from "bcrypt"; 


// Create users
async function createUsers(data) {
    return await client
      .db("bulk-email")
      .collection("users")
      .insertOne(data);
  }
  
  async function genPassword(password){
    const salt = await bcrypt.genSalt(10);
    console.log("salt",salt);
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(hashedPassword);
    return hashedPassword;
  }
  
  // get username
  async function getUserByName(username) {
    return await client.db("bulk-email").collection("users").find({ username:username }).toArray();
  }


  export{
      createUsers,
      genPassword,
      getUserByName
  }
import { client } from "./index.js";
import { ObjectId } from "mongodb";

//get all data
async function getAllData(filter){
    return await client.db('bulk-email')
            .collection('broadcast')
            .find(filter)
            .toArray()
}

//add data 
async function createData(data){
    return await client.db('bulk-email')
    .collection('broadcast')
    .insertMany(data);
}

//get data by ID 
async function getDataByID(id){
    // ObjectID function is used to change the id to object ID 
    return await client.db('bulk-email')
    .collection('broadcast')
    .findOne({ _id: ObjectId(id)});
}
// delete data by ID
async function deleteDataByID(id) {
    return await client.db('bulk-email')
    .collection('broadcast')
    .deleteOne({  _id: ObjectId(id)});
  }


// update data by ID
async function updateDataByID(id,updatedData) {
    return await client.db('bulk-email')
    .collection('broadcast')
    .updateOne({ _id: ObjectId(id)},{$set:updatedData});
  }

export{
    getAllData,
    getDataByID,
    createData,
    deleteDataByID,
    updateDataByID
}
require('dotenv').config();
const mongoose=require('mongoose');

const dbPath="mongodb://localhost:27017/bloodbank"
const connectDb=async()=>{
    try{
        await mongoose.connect(dbPath,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("database connected");
    }
    catch(err){
        console.log("error connecting with database");
        console.log(err);
        

    }
}
module.exports=connectDb;
const mongooes= require("mongoose");
require("dotenv").config();

async function connectDb(){
    try{
     await mongooes.connect(process.env.MONGO_URL,{
})
console.log("Connected to DB");
    }catch(error){
        console.log(error.message);
    }
}
module.exports= connectDb;
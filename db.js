const mongooes= require("mongoose");

async function connectDb(){
    try{
     await mongooes.connect("",{
})
console.log("Connected to DB");
    }catch(error){
        console.log(error.message);
    }
}
module.exports= connectDb;
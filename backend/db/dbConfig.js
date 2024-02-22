const mongoose =require('mongoose');

const createMongoConn= async ()=>{
  try{
    let uri = process.env.MONGO_ATLAS_URI;
    const conn =  await mongoose.connect(uri) 
        console.log("Database is connected!");
  }catch(err){
    console.log(err.message)
  }
}
module.exports = createMongoConn
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:'backend/config/config.env'})
const connectDB =()=>{
  mongoose.connect( process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedtopology: true 
  }).then((data)=> {
  console.log(`Mongodb connected with server: ${data.connection.host}`)
  })  
}

export default connectDB;
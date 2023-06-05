import app from "./app.js";
import dotenv from 'dotenv';
import connectDataBase from "./config/database.js";
import cloudinary from "cloudinary";
dotenv.config({path:'backend/config/config.env'})
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

// If we add undefined values uncaughtException error occur like console.log(youtube)
// this process always declare above the code then it identify errors
// handling Uncaught error
process.on('uncaughtException',(error)=>{
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to Uncaught error`);
    process.exit(1);
});

// if this error occures Mongodb error: MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
// then goto administrative tools then services and click it and click to start
// and then restart your program npm run dev.

// connecting DataBase
connectDataBase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(port,()=>{
    console.log(`Server is working on port http://localhost:${port}`);
})

// unhandled promise rejection error
// if define wrong path of mongodb this unhandledRejection error occures OR 
// Go-to services search mongodb file click it and click the start and again run cmd to check server working or not
process.on('unhandledRejection',(error)=>{
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`)

    server.close(()=>{
        process.exit(1);
    });
});

// console.log(youtube); //If we add undefined values uncaughtException error occur

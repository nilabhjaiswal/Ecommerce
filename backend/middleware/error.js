import errorHandler from "../utils/errorHandling.js";

 const error = (err, req, res, next) =>{
     err.statusCode = err.statusCode || 500;
     err.message = err.message || "Internal Server Error";

// Wrong Mongodb Id error or enter wrong id of product
if(err.name === "CastError"){
   const message = `Resource not found. Invalid${err.path}`;
   err = new errorHandler(message, 400); //Bad request || 400
}

// Mongoose Duplicate Key Error
if(err.code === 11000){
   const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
   err = new errorHandler(message, 400); //Bad request || 400
}

// Wrong JWT error
if(err.name === "JsonWebTokenError"){
   const message = `Json web token is INVALID ,Try again`;
   err = new errorHandler(message, 400); //Bad request || 400
}

// JWT Expire error
if(err.name === "TokenExpiredError"){
   const message = `Json web token is EXPIRED ,Try again`;
   err = new errorHandler(message, 400); //Bad request || 400
}

res.status(err.statusCode).json({
        success: false,
      //   error: err.stack,
        message: err.message,
     })
}

export default error;
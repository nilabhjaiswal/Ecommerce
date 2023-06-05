import ErrorHandler from "../utils/errorHandling.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from 'jsonwebtoken';
import User from "../models/userModels.js";
export const isAuthenticatedUser = catchAsyncError(async (req,res,next) => {
   const { token } = req.cookies;
   if (!token) {
      return next(new ErrorHandler("Please login to access this resources",401));
   }
   const decodedData = jwt.verify(token, process.env.JWT_SECRET);
   req.user = await User.findById(decodedData.id); 
   next();
});

// Below code is used to authenticate user as admin 
// which allow system to differentiate between admin and user allow access to the resources.
export const authorizeRoles = (...roles)=>{
   return(req,res,next) =>{
      if (!roles.includes(req.user.role)) {
        return next( 
         new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resource.`,403
         )
        );         
      }
      next();
   }; 
};
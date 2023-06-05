import express  from "express";
const app = express();
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route import
import product from './routes/productRoute.js';
import user from './routes/userRoute.js';
import order from './routes/orderRoute.js';

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(errorMiddleware);

export default app;
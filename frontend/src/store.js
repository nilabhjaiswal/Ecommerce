import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer.js";
import { userReducer } from "./reducers/userReducer.js";
import { profileReducer, forgotPasswordReducer } from "./reducers/profileReducer.js";
const reducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user : userReducer,
  profile : profileReducer,
  forgotPassword : forgotPasswordReducer,
});

let initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;

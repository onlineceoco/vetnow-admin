import authReducer from "./auth.reducers";
import { combineReducers } from "redux";
import alertReducer from "./alert.reducers";
import productReducer from "./product.reducer";
import commentReducer from "./commentReducers";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  product: productReducer,
  comment: commentReducer,
  user: userReducer,
});

export default rootReducer;

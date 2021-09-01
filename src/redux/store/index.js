import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
const initialState = {};
const middleWare = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleWare)),
);

export default store;

import userReducer from "./Reducer";
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";


const rootReducer = combineReducers({
    userReducer,
    cartReducer
})

export default rootReducer
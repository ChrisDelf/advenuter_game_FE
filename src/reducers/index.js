import {combineReducers} from "redux";

import authReducer from "./authReducer";
import charReducer from "./charReducer";

export default combineReducers({
    authReducer,
    charReducer,

});

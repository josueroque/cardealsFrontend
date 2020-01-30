import { combineReducers } from 'redux';
import userReducer from './userReducer';

//import validacionReducer from './validacionReducer';

export default combineReducers({
    user: userReducer,

});
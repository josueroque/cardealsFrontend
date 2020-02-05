import { combineReducers } from 'redux';
import userReducer from './userReducer';
import carsReducer from './carsReducer';

//import validacionReducer from './validacionReducer';

export default combineReducers({
    user: userReducer,
    cars:carsReducer

});
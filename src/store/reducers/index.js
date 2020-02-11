import { combineReducers } from 'redux';
import userReducer from './userReducer';
import carsReducer from './carsReducer';
import adsReducer from './adsReducer';

//import validacionReducer from './validacionReducer';

export default combineReducers({
    user: userReducer,
    cars:carsReducer,
    ads:adsReducer
});
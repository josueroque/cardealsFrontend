import {
    START_SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE
} from '../types';

const initialState={user:{},loading:false,error:false};

export default function (state=initialState,action){
    switch(action.type){
        case START_SAVE_USER:
            return{
                ...state,
                loading:true,
                error:false
            } 
        case SAVE_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
                loading:false,
                error:false,
            }
        case SAVE_USER_FAILURE:
            return{
                ...state,
                user:{},
                loading:false,
                error:true,
            }    
        default:
            return state;
    }
}

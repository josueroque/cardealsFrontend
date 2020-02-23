import {
    START_SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE,
    START_AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILURE,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILURE,
    START_VERIFY_EMAIL,
    VERIFY_NICKNAME_SUCCESS,
    VERIFY_NICKNAME_FAILURE,
    START_VERIFY_NICKNAME,
    START_EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    START_DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
} from '../types';

import { REHYDRATE } from 'redux-persist';

const initialState={user:{},loading:false,error:false,errorInfo:''};

export default function (state=initialState,action){
    switch(action.type){
        case START_DELETE_USER:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            } 
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
                loading:false,
                error:false,
            }
        case DELETE_USER_FAILURE:
            return{
                ...state,
             //   user:{},
                loading:false,
                error:true,
                errorInfo:action.payload
            }    

        case START_EDIT_USER:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            } 
        case EDIT_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
                loading:false,
                error:false,
            }
        case EDIT_USER_FAILURE:
            return{
                ...state,
             //   user:{},
                loading:false,
                error:true,
                errorInfo:action.payload
            }    

        case START_SAVE_USER:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
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
                errorInfo:action.payload
            }    
            case START_AUTH_USER:
                return{
                    ...state,
                    loading:true,
                    error:false
                } 
            case AUTH_USER_SUCCESS:
                return{
                    ...state,
                    user:action.payload,
                    loading:false,
                    error:false,
                }
            case AUTH_USER_FAILURE:
                return{
                    
                    user:{},
                    loading:false,
                    error:true,
                  
                }
            // case START_VERIFY_EMAIL:
            //     return{
            //         ...state,
            //         loading:true,
            //         error:false
            //     } 
            // case VERIFY_EMAIL_SUCCESS:
            //     return{
            //         ...state,
            //         user:action.payload,
            //         loading:false,
            //         error:false,
            //     }
            // case AUTH_USER_FAILURE:
            //     return{
                    
            //         user:{},
            //         loading:false,
            //         error:true,
            //     }   

            case LOGOUT_USER_SUCCESS:
                return{
                    ...state,
                    user:action.payload,
                    loading:false,
                    error:false,
                }  
    
            default:
            //return {...state};
            return state;
    }
}

import {
    START_SAVE_AD,
    SAVE_AD_SUCCESS,
    SAVE_AD_FAILURE,
    START_GET_ADS,
    GET_ADS_SUCCESS,
    GET_ADS_FAILURE,

} from '../types';

import { REHYDRATE } from 'redux-persist';

const initialState={ads:[],ad:{},loading:false,error:false,errorInfo:''};

export default function (state=initialState,action){
    switch(action.type){
        case START_SAVE_AD:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            } 
        case SAVE_AD_SUCCESS:
            return{
                ...state,
                ad:action.payload,
                loading:false,
                error:false,
            }
        case SAVE_AD_FAILURE:
            return{
                ...state,
                ad:{},
                loading:false,
                error:true,
                errorInfo:action.payload
            }    
        case START_GET_ADS:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            } 
        case GET_ADS_SUCCESS:
            return{
                ...state,
                ads:action.payload,
                loading:false,
                error:false,
            }
        case GET_ADS_FAILURE:
            return{
                ...state,
                ads:[],
                loading:false,
                error:true,
                errorInfo:action.payload
            }    

            default:
            //return {...state};
            return state;
    }
}
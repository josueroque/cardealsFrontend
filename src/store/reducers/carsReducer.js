import {
     START_GET_MAKES,
     GET_MAKES_SUCCESS,
     GET_MAKES_FAILURE,
     START_GET_MODELS,
     GET_MODELS_SUCCESS,
     GET_MODELS_FAILURE,
} from '../types';

import { REHYDRATE } from 'redux-persist';

const initialState={makes:[],models:[],loading:false,error:false,errorInfo:''};

export default function (state=initialState,action){
    switch(action.type){
        case START_GET_MAKES:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:'',
                makes:[]
            } 
        case GET_MAKES_SUCCESS:
            return{
                ...state,
                makes:action.payload,
                loading:false,
                error:false,
            }
        case GET_MAKES_FAILURE:
            return{
                ...state,
                makes:[],
                loading:false,
                error:true,
                errorInfo:action.payload
            }    
            case START_GET_MODELS:
                return{
                    ...state,
                    loading:true,
                    error:false,
                    models:[]
                } 
            case GET_MODELS_SUCCESS:
                return{
                    ...state,
                    models:action.payload,
                    loading:false,
                    error:false,
                }
            case GET_MODELS_FAILURE:
                return{
                    
                    models:[],
                    loading:false,
                    error:true,
                  
                }
    
            default:
            //return {...state};
            return state;
    }
}

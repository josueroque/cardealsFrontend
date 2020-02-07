import {
    START_GET_MAKES,
    GET_MAKES_SUCCESS,
    GET_MAKES_FAILURE,
    START_GET_MODELS,
    GET_MODELS_SUCCESS,
    GET_MODELS_FAILURE,
} from '../types';

import {getMakes,getModels} from '../../services/apiServices';


export const getMakesSuccess=makes=>({
    type:GET_MAKES_SUCCESS,
    payload:makes
});

export const startGetMakes = () => ({
    type: START_GET_MAKES
});

export const getMakesFailure = (error) => ({
    type: GET_MAKES_FAILURE,
    payload:error
});


export const getModelsSuccess=models=>({
    type:GET_MODELS_SUCCESS,
    payload:models
});

export const startGetModels = () => ({
    type: START_GET_MODELS
});

export const getModelsFailure = (error) => ({
    type: GET_MODELS_FAILURE,
    payload:error
});




export  function  getMakesAction  () {
    return async (dispatch)=>{
         dispatch(startGetMakes());

         try {
             
            const response=await getMakes();
            console.log(response);
            dispatch(getMakesSuccess(response.data.results));
               
         } catch (error) {
             dispatch(getMakesFailure(error.data.error));
         }
     }
 };

export  function  getModelsAction  (make) {
    return async (dispatch)=>{
         dispatch(startGetModels());
      //   console.log(user);

         try {
             
            const models=await getModels(make);
            
            dispatch(getModelsSuccess(models.data.results));
            
            
         } catch (error) {
             console.log(error);
             dispatch(getModelsFailure(error));
         }
     }
 };


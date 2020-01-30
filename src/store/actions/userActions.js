import {
    START_SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE
} from '../types';

import {saveUser} from '../../services/apiServices';



export const saveUserSuccess=user=>({
    type:SAVE_USER_SUCCESS,
    payload:user
});

export const startSaveUser = () => ({
    type: START_SAVE_USER
});

export const saveUserFailure = () => ({
    type: SAVE_USER_FAILURE
});

export  function  saveUserAction  (user) {
    return async (dispatch)=>{
         dispatch(startSaveUser());
      //   console.log(user);

         try {
             
            const response=await saveUser(user);

            dispatch(saveUserSuccess(user));
               
         } catch (error) {
             console.log(error);
             dispatch(saveUserFailure());
         }
     }
 };
import {
    START_SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE,
    START_AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILURE
} from '../types';

import {saveUser,loginUser} from '../../services/apiServices';


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


export const authUserSuccess=user=>({
    type:AUTH_USER_SUCCESS,
    payload:user
});

export const startAuthUser = () => ({
    type: START_SAVE_USER
});

export const authUserFailure = () => ({
    type: AUTH_USER_FAILURE
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

export  function  authUserAction  (user) {
    return async (dispatch)=>{
         dispatch(startAuthUser());
      //   console.log(user);

         try {
             
            const response=await loginUser(user);
            console.log(response);

            if (response.data.ok){
                user.token=response.data.token;
                user.name=response.data.name;
                user.surname=response.data.surname;
                dispatch(authUserSuccess(user));
            }
            else {
                dispatch(authUserFailure());
            }
               
         } catch (error) {
             console.log(error);
             dispatch(authUserFailure());
         }
     }
 };
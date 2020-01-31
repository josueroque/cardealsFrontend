import {
    START_SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE,
    START_AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILURE,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS
} from '../types';

import {saveUser,loginUser} from '../../services/apiServices';


export const saveUserSuccess=user=>({
    type:SAVE_USER_SUCCESS,
    payload:user
});

export const startSaveUser = () => ({
    type: START_SAVE_USER
});

export const saveUserFailure = (error) => ({
    type: SAVE_USER_FAILURE,
    payload:error
});


export const authUserSuccess=user=>({
    type:AUTH_USER_SUCCESS,
    payload:user
});

export const startAuthUser = () => ({
    type: START_AUTH_USER
});

export const authUserFailure = () => ({
    type: AUTH_USER_FAILURE
});


export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const logoutUserSuccess=user=>({
    type:LOGOUT_USER_SUCCESS,
    payload:user
});

export  function  saveUserAction  (user) {
    return async (dispatch)=>{
         dispatch(startSaveUser());
         console.log(user);

         try {
             
            const response=await saveUser(user);
            console.log(response);
            //dispatch(saveUserSuccess(user));
               
         } catch (error) {
             console.log(typeof(error.data.error));
             dispatch(saveUserFailure(error.data.error));
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
                user.nickname=response.data.nickname;
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

 export  function  logoutUserAction  (user) {
    return async (dispatch)=>{
         try {
             
                user.token=null;
                console.log(user);
                dispatch(logoutUserSuccess(user));
               
         } catch (error) {
             console.log(error);
//             dispatch(authUserFailure());
         }
     }
 };
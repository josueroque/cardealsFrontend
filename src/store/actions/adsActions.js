import {
    START_SAVE_AD,
    SAVE_AD_SUCCESS,
    SAVE_AD_FAILURE,
    START_GET_ADS,
    GET_ADS_SUCCESS,
    GET_ADS_FAILURE,
    START_DELETE_AD,
    DELETE_AD_SUCCESS,
    DELETE_AD_FAILURE,
    START_EDIT_AD,
    EDIT_AD_SUCCESS,
    EDIT_AD_FAILURE
} from '../types';

import {saveAd,deleteAd,getAdsUser,getAd,editAd} from '../../services/apiServices';

export const editAdSuccess=ad=>({
    type:EDIT_AD_SUCCESS,
    payload:ad
});

export const startEditAd = () => ({
    type: START_EDIT_AD
});

export const editAdFailure = (error) => ({
    type: EDIT_AD_FAILURE,
    payload:error
});


export const saveAdSuccess=ad=>({
    type:SAVE_AD_SUCCESS,
    payload:ad
});

export const startSaveAd = () => ({
    type: START_SAVE_AD
});

export const saveAdFailure = (error) => ({
    type: SAVE_AD_FAILURE,
    payload:error
});

export const deleteAdSuccess=ad=>({
    type:DELETE_AD_SUCCESS,
    payload:ad
});

export const startDeleteAd = () => ({
    type: START_DELETE_AD
});

export const deleteAdFailure = (error) => ({
    type: DELETE_AD_FAILURE,
    payload:error
});

export const getAdsSuccess=ads=>({
    type:GET_ADS_SUCCESS,
    payload:ads
});

export const startGetAds = () => ({
    type: START_GET_ADS
});

export const getAdsFailure = (error) => ({
    type: GET_ADS_FAILURE,
    payload:error
});

export  function  saveAdAction  (ad,token,files) {
    return async (dispatch)=>{
         dispatch(startSaveAd());
         console.log(ad);

         try {
             
            const response=await saveAd(ad,token,files);
            console.log(response);
            dispatch(saveAdSuccess(ad));
               
         } catch (error) {
             console.log(error);
             dispatch(saveAdFailure(error));
         }
     }
 };


 export  function  editAdAction  (ad,id,token) {
    return async (dispatch)=>{
         dispatch(startEditAd());

         try {
             console.log(ad);
            const response=await editAd(ad,id,token);
            dispatch(editAdSuccess(response.data.results));
               
         } catch (error) {
             console.log(error);
             dispatch(editAdFailure(error));
         }
     }
 };

 export  function  deleteAdAction  (id,token) {
    return async (dispatch)=>{
         dispatch(startDeleteAd());

         try {
             console.log(id);
            const response=await deleteAd(id,token);
            dispatch(deleteAdSuccess(id));
               
         } catch (error) {
             console.log(error);
             dispatch(deleteAdFailure(error));
         }
     }
 };

 export  function  getAdsAction  (filter) {
    return async (dispatch)=>{
         dispatch(startGetAds());

         try {
//            console.log(filter);


            if (filter.user||!filter.id){
            const response=await getAdsUser(filter);
            console.log(response);
            dispatch(getAdsSuccess(response.data.results));
    //        console.log(response);

            } 

            if (filter.id){
                const response=await getAd(filter.id);
                console.log(response);
                dispatch(getAdsSuccess(response.data.results));
    
            }    

               
         } catch (error) {
             console.log(error);
             dispatch(getAdsFailure(error));
         }
     }
 };


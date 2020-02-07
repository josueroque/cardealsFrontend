import {
    START_SAVE_AD,
    SAVE_AD_SUCCESS,
    SAVE_AD_FAILURE,

} from '../types';

import {saveAd} from '../../services/apiServices';

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

export  function  saveAdAction  (ad,token) {
    return async (dispatch)=>{
         dispatch(startSaveAd());
         console.log(ad);

         try {
             
            const response=await saveAd(ad,token);
            console.log(response);
            dispatch(saveAdSuccess(ad));
               
         } catch (error) {
             console.log(error);
             dispatch(saveAdFailure(error));
         }
     }
 };


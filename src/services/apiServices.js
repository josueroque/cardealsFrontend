import axios from 'axios';
const URL='http://localhost:3001/apiv1';

export async function saveUser(user){  
   try {
     
      const requestUrl =URL +'/authenticate/register';
      const config = {}

   const response = await axios.post(requestUrl, user );
      if (response.statusText!=="OK") {
        throw new Error('Error saving user');
      }

      return response; 
     
  }
  catch(error){
      console.log(error.response);
      throw error.response;
  }
}

export async function loginUser(user){  
  try {
    
     const requestUrl =URL +'/authenticate';

  const response = await axios.post(requestUrl, user);
     console.log(response);
     if (response.statusText!=="OK") {
       throw new Error('Error saving user');
     }

     return response; 
    
 }
 catch(error){
     console.error(error.response);
     throw error;
 }
}

export async function getMakes(){  
   try {
     
      const requestUrl =URL +'/makes';
  
   const response = await axios.get(requestUrl);
      if (response.statusText!=="OK") {
        throw new Error('Error getting makes');
      }
 
      return response; 
     
  }
  catch(error){
      console.error(error.response);
      throw error;
  }
 }
 
 export async function getModels(make){  
   try {
     
      let requestUrl;
   if (!make) {
     requestUrl  =URL +'/makes/models';
    } 
    else{
     requestUrl =URL +'/makes/models?make='+make;
    }

      const response = await axios.get(requestUrl);
   if (response.statusText!=="OK") {
        throw new Error('Error getting models');
      }
 
      return response; 
     
  }
  catch(error){
      console.error(error.response);
      throw error;
  }
 }

 export async function getAdsUser(user){  
  try {
    
    const requestUrl =URL +'/adverts?user='+user;
    const response = await axios.get(requestUrl);
 
    if (response.statusText!=="OK") {
        throw new Error('Error getting adverts');
      }
      return response; 
    }
  
    catch(error){
     console.error(error.response);
     throw error;
 }
}

export async function getAd(id){  
  try {
    
    const requestUrl =URL +'/adverts?id='+id;
    const response = await axios.get(requestUrl);
 
    if (response.statusText!=="OK") {
        throw new Error('Error getting adverts');
      }
      return response; 
    }
  
    catch(error){
     console.error(error.response);
     throw error;
 }
}


 export const  saveAd= async (ad,token,files) =>{
  try {
    const requestUrl =URL +'/adverts/create';
    // console.log('desde api Save ');
    // console.log(ad);
    //console.log(requestUrl);
    console.log(files);
    console.log(ad);
     const config = {
       headers: { 
        
        'x-access-token': `${token}`,
                  'Content-Type':'multipart/form-data'},
       //files:files           
       };
    //console.log(files);  

    
    const response = await axios.post(requestUrl,ad,config);
    console.log(response);
    return response;   
  } catch (error) {
   
    throw(error);
  }
}

export const  deleteAd= async (id,token) =>{
  try {
    const requestUrl =URL +'/adverts/'+id;

     const config = {
       headers: { 
        
        'x-access-token': `${token}`,
        // 'Content-Type':'multipart/form-data'},
       }};
    console.log(requestUrl);
    const response = await axios.delete(requestUrl,config);
    console.log(response);
    return response;   
  } catch (error) {
   
    throw(error);
  }
}

export const  editAd= async (ad,id,token) =>{
  try {
    const requestUrl =URL +'/adverts/'+id;

     const config = {
       headers: { 
        
        'x-access-token': `${token}`,
        // 'Content-Type':'multipart/form-data'},
       }};
    console.log(requestUrl);
    console.log(ad);
    const response = await axios.put(requestUrl,ad,config);
    console.log(response);
    return response;   
  } catch (error) {
   
    throw(error);
  }
}
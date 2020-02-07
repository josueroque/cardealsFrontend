import axios from 'axios';
const URL='http://localhost:3001/apiv1';

export async function saveUser(user){  
   try {
     
      const requestUrl =URL +'/authenticate/register';
      const config = {}

   const response = await axios.post(requestUrl, user );
      console.log(response);
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
    //  const config = {
    //    headers: { 'Authorization': `Bearer ${token}` }
    //   };
     console.log(requestUrl);
     console.log(user);



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
      console.log(response);
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
     
      const requestUrl =URL +'/makes/models?make='+make;
  console.log(requestUrl);
   const response = await axios.get(requestUrl);
   console.log(response);   
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

 
 export const  saveAd= async (ad,token) =>{
  try {
    const requestUrl =URL +'/adverts';
    console.log('desde api Save ');
    console.log(ad);
    console.log(requestUrl);
     const config = {
       headers: { 'x-access-token': `${token}` }
      };
    const response = await axios.post(requestUrl,ad,config);
    console.log(response);
    return response;   
  } catch (error) {
   
    throw(error);
  }
}
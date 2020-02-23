import axios from 'axios';
//const URL='http://ec2-18-222-129-172.us-east-2.compute.amazonaws.com/apiv1';
const URL='http://localhost:3001/apiv1';

export async function saveUser(user){  
   try {
     
      const requestUrl =URL +'/authenticate/register';

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
    let requestUrl;
    let parameterSymbol='?';
   // console.log(user);
    if(user.limit){
       requestUrl =URL +'/adverts?limit='+user.limit;
       parameterSymbol='&';
    }
    else{
      if(user.user){
       requestUrl =URL +'/adverts'+parameterSymbol+ 'user='+user.user;
       parameterSymbol='&';

      }
      else{
        requestUrl =URL +'/adverts'

      }
    }
    if(user.amountFrom&&user.amountTo){
      requestUrl+=parameterSymbol+ 'price='+user.amountFrom+'-'+user.amountTo;
      parameterSymbol='&';

    }
    if(user.make){
      requestUrl+=parameterSymbol+ 'make='+user.make;
      parameterSymbol='&';

    }
    if(user.model){
      requestUrl+=parameterSymbol+ 'model='+user.model;
      parameterSymbol='&';

    }
    
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
     const config = {
       headers: { 
        
        'x-access-token': `${token}`,
                  'Content-Type':'multipart/form-data'},
       };

    for (var pair of ad.entries())
    {
     console.log(pair[0]+ ', '+ pair[1]); 
    }
    const response = await axios.post(requestUrl,ad,config);
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

      }};

      const response = await axios.delete(requestUrl,config);

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

      }};

      const response = await axios.put(requestUrl,ad,config);

      return response;   
  } catch (error) {
   
    throw(error);
  }
}

export const  editUser= async (user,id,token) =>{
  try {
    const requestUrl =URL +'/users/'+id;

     const config = {
       headers: { 
        
        'x-access-token': `${token}`,

      }};

      const response = await axios.put(requestUrl,user,config);

      return response;   
  } catch (error) {
   
    throw(error);
  }
}

export const deleteUser= async (user,id,token) =>{
  try {
    const requestUrl =URL +'/users/'+id;

     const config = {
       headers: { 
        
        'x-access-token': `${token}`,
        'email':user.email

      }};

      const response = await axios.delete(requestUrl,config);

      return response;   
  } catch (error) {
   
    throw(error);
  }
}
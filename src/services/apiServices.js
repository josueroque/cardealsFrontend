import axios from 'axios';
const URL='http://localhost:3001/apiv1';

export async function saveUser(user){  
   try {
     
      const requestUrl =URL +'/authenticate/register';
      const config = {}
      //   headers: { 'Authorization': `Bearer ${token}` }
      //  };
      console.log(requestUrl);
      console.log(user);
      console.log(config);


   const response = await axios.post(requestUrl, user );
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


import axios from 'axios';
const URL='http://localhost:3001/apiv1';
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMyMjg5ZmI0N2JjNzNiZjBhNmYxZmIiLCJpYXQiOjE1ODAzNTcxOTMsImV4cCI6MTU4MDQ0MzU5M30.Bv2L4JzzqelunqfzM-ZzQx_3m8jpjbnuxR5196_zlxE'


//export async function saveUser(user,token){
export async function saveUser(user){  
   try {
     
      const requestUrl =URL +'/authenticate/register';
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
       };
      console.log(requestUrl);
      console.log(user);
      console.log(config);


   const response = await axios.post(requestUrl, user ,config);
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


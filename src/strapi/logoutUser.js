import axios from 'axios';

async function logoutUser({token}) {
    const response = await axios.delete(`http://localhost:5000/users/account/logout/${token}`)
      .catch(error => console.log(error));
    return response;
  } 
  
  export default logoutUser;
   
// login user
import axios from "axios";

async function loginUser({ email, password }) {
  const response = await axios.post(`http://localhost:5000/users/account/signin`, {password,email})
    .catch(error => console.log(error));
  return response;
} 

export default loginUser;
 
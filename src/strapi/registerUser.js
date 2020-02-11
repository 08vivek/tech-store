// register user
import axios from "axios";

async function registerUser({ email, password, username }) {
  const response = await axios.post(`http://localhost:5000/users/account/signup`, {username,email,password})
                    .catch(error => console.log(error));
  return response;
}

export default registerUser;
 
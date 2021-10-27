import Axios from 'axios';

const API = 'https://three-points.herokuapp.com/api/';


///////////////
// ENDPOINTS //
///////////////

const ValidateUser = userID => Axios({
  method: 'get',
  url: API + 'users/' + userID,
});

const Login = ({ password, username }) => Axios({
  method: 'post',
  url: API + 'login',
  data: {
    password,
    username,
  }
});

export {
  Login,
  ValidateUser,
}

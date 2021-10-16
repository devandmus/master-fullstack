import Axios from 'axios';
import { API } from './settings';
import { getUser } from './services.helpers';

const MainRequest = ({url, loggout, method='get', data={}}) =>
  Axios({
    method,
    data,
    url: API + url,
  })
    .then(response => {
      if(response.status === 401)
        throw new Error(401);
      return response;
    })
    .catch(err => {
      // Si cualquier petición HTTP devuelve código 401, deberá borrarse el localStorage del
      // navegador, limpiar el estado currentUser y redirigir al usuario a la ruta /login.
      if (err === 401 && loggout)
        loggout();
      return false;
    });

const Login = ({ password, username }) =>
  MainRequest({
    method: 'post',
    url: 'login',
    data: {
      password,
      username,
    }
  })
    .then(({ data }) => {
      if (data.id)
        return data;
      return false;
    });

const GetPosts = async ({ loggout }) =>
  await MainRequest({
    loggout,
    url: 'posts',
  });

const ValidateUser = async ({ loggout }) =>{
  const { id } = getUser()
  return MainRequest({
    loggout,
    url: `users/${id}`,
  });
}


export {
  Login,
  GetPosts,
  ValidateUser,
}

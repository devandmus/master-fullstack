import { ValidateUser } from '../services';

const USER_KEY = 'userid';

const checkLoggedUser = async () => {
  const id = localStorage.getItem(USER_KEY);
  if (id) {
    const validate = await ValidateUser(id);
    return !!validate.data;
  }
  return false;
}

const storeUser = id => localStorage.setItem(USER_KEY, id);

const logout = () => {
  localStorage.removeItem(USER_KEY);
  window.location.replace('/');
}

export {
  checkLoggedUser,
  storeUser,
  logout,
}
import { USER_KEY } from './settings';

const storeUser = async user => {
  await localStorage.setItem(USER_KEY, JSON.stringify(user))
};

const removeUser = () => localStorage.removeItem(USER_KEY);

const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));

export {
  storeUser,
  removeUser,
  getUser,
}
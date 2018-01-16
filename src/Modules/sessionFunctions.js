import decode from 'jwt-decode';
import { loadState } from './localStorage';

const isUserLogged = () => {
  if (loadState()) {
    return true;
  }
  return false;
};
const getUserDataFromToken = () => {
  if (loadState().login.MAHtoken) {
    return decode(loadState().login.MAHtoken);
  }
  return false;
};
const clearSession = () => {
  localStorage.clear();
};
export { isUserLogged, getUserDataFromToken, clearSession };


import { loadState } from './localStorage';

const server = process.env.REACT_APP_API;
let token = '';

if (loadState()) {
  token = `Bearer ${loadState().login.token}`;
}
export { server, token };

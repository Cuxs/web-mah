import _ from 'lodash';
import { server } from './params';
import { loadState } from './localStorage';

let token = '';

if (loadState()) {
  token = `Bearer ${loadState().login.token}`;
}

// Account --------------------
export const login = (username, password) => {
  const url = `${server}/loginAdmin`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const recoverPassword = (email) => {
  const url = `${server}/recoverPass`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const updatePassword = (data) => {
  const url = `${server}/updatePassword`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      previousPassword: data.previousPassword,
      newPassword: data.newPassword,
    }),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};

export const getFiltersAndTotalResult = (search) => {
  const url = `${server}/getFiltersAndTotalResult`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      search,
    }),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};


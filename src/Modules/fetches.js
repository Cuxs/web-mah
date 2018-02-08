import _ from 'lodash';
import { server } from './params';
import { loadState } from './localStorage';

let token = '';

if (loadState()) {
  token = `Bearer ${loadState().login.MAHtoken}`;
}

// Account --------------------
export const login = (email, password) => {
  const url = `${server}/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
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
export const loginAdmin = (email, password) => {
  const url = `${server}/loginAdmin`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
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
  if (loadState()) {
    token = `Bearer ${loadState().login.MAHtoken}`;
  }
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
export const uploadAgencyImages = (profileImage, bannerImage, id) => {
  const url = `${server}/uploadAgencyImages/${id}`;
  const formData = new FormData();

  formData.append('profileImage', profileImage);
  formData.append('bannerImage', bannerImage);

  const options = {
    method: 'POST',
    headers: {
      mimeType: 'multipart/form-data',
      Authorization: token,
    },
    body: formData,
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const createPublication = (dataPublication, {imageGroup}) => {
  const url = `${server}/createPublication`;
  const formData = new FormData();
  imageGroup.map((img)=>{
    formData.append('imageGroup', img)
  })
  formData.append('dataPublication', JSON.stringify(dataPublication));

  const options = {
    method: 'POST',
    headers: {
      mimeType: 'multipart/form-data',
      Authorization: token,
    },
    body: formData,
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
export const getSoldPublications = () => {
  if (loadState()) {
    token = `Bearer ${loadState().login.MAHtoken}`;
  }
  const url = `${server}/getSoldPublications`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};

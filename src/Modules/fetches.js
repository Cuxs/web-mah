import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
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

// Colors -------------------
export const getColor = () => {
  const url = `${server}/getColor`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const updateColor = (color) => {
  const url = `${server}/updateColor`;
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      selectedColor: color,
    }),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};

// Posts -----------------------
export const getAllPosts = () => {
  const url = `${server}/getAllPosts`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const getPost = (id) => {
  const url = `${server}/getPost/${id}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const createPost = (title, file, content, author, tags) => {
  const url = `${server}/createPost`;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('image', file);
  formData.append('content', content);
  formData.append('author', author);
  formData.append('tags', JSON.stringify(tags));
  const options = {
    method: 'POST',
    headers: {
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
export const updatePost = (data, tags) => {
  const url = `${server}/updatePost/${data.id}`;
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('author', data.author);
  formData.append('image', data.file);
  formData.append('tags', JSON.stringify(tags));
  const options = {
    method: 'PATCH',
    headers: {
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
export const deletePost = (id) => {
  const url = `${server}/deletePost/${id}`;
  const options = {
    method: 'POST',
    headers: {
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

// Testimonials ------------------------
export const getAllTestimonials = () => {
  const url = `${server}/getAllTestimonials`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const deleteTestimonial = (id) => {
  const url = `${server}/deleteTestimonial/${id}`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const createTestimonial = (name, rol, testimony) => {
  const url = `${server}/createTestimonial`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      rol,
      testimony,
    }),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const updateTestimonial = (data) => {
  const url = `${server}/updateTestimonial/${data.id}`;
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};

// Workers -----------------------------------
export const getAllWorkers = () => {
  const url = `${server}/getAllWorkers`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const deleteWorker = (id) => {
  const url = `${server}/deleteWorker/${id}`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const createWorker = (name, file1, file2, occupation, bio) => {
  const url = `${server}/createWorker`;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('image1', file1);
  formData.append('image2', file2);
  formData.append('occupation', occupation);
  formData.append('bio', bio);
  const options = {
    method: 'POST',
    headers: {
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
export const updateWorker = (data, file1, file2) => {
  const url = `${server}/updateWorker/${data.id}`;
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('occupation', data.occupation);
  formData.append('bio', data.bio);
  formData.append('image1', file1);
  formData.append('image2', file2);
  const options = {
    method: 'PATCH',
    headers: {
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

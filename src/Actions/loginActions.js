
export const login = () => ({
    type: 'LOGIN',
  });
  
  export const loginFail = error => ({
    type: 'LOGIN_FAIL',
    payload: {
      error,
    },
  });
  
  export const loginSuccess = token => ({
    type: 'LOGIN_SUCCESS',
    payload: {
      token,
    },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
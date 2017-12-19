const initialState = {
    token: ''
};

export const login = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loggingIn: true
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loggingIn: false,
                token: action.payload.token,
                loginError: null
            };
        case 'LOGIN_FAIL':
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: action.payload.error
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};
export default login;
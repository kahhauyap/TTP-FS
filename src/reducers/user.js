const user = (state = {
    email: '',
    password: ''
}, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return { ...state, email: action.email }
        case 'UPDATE_PASSWORD':
            return { ...state, password: action.password };
        default:
            return state;
    }
}

export default user;

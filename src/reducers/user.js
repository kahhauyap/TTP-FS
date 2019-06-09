const user = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return action.email;
        default:
            return state;
    }
}

export default user;

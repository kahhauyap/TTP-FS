const UPDATE_USER = 'UPDATE_USER';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';


export const updateUser = (email) => ({
    type: UPDATE_USER,
    email
})

export const updatePassword = (password) => ({
    type: UPDATE_PASSWORD,
    password
})
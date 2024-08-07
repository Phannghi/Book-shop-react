import axios from '../utils/axios-customize'
export const postRegisterUser = (fullname, email, password, phone) => {
    return axios.post('api/v1/user/register', { fullName: fullname, email, password, phone })
}

export const postLogin = (username, password) => {
    return axios.post('api/v1/auth/login', { username, password, delay: 2000 })
}

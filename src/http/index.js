import axios from "axios";
 
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterсeptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}` //!!!Нужно разобраться как это работает???
    return config
}

$authHost.interceptors.request.use(authInterсeptor)

export {
    $host,
    $authHost
};
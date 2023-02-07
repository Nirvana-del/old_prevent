import axios from 'axios'
import {message} from "antd";
import {store} from '@/redux'
let baseURL
if (import.meta.env.MODE === 'development'){
    // baseURL = import.meta.env.VITE_APP_REAL_API
    baseURL = import.meta.env.VITE_APP_BASE_API
}else {
    baseURL = import.meta.env.VITE_PRODUCTION_APP_REAL_API
}
const request = axios.create({
    // baseURL,
    baseURL,
    timeout: 5000,
    withCredentials:true
})
console.log(request.defaults)
request.interceptors.request.use((config) => {
    store.dispatch({
        type: 'CHANGE_LOADING',
        payload: true
    })
    return config;
})

request.interceptors.response.use((res) => {
    store.dispatch({
        type: 'CHANGE_LOADING',
        payload: false
    })
    return res;
}, () => {
    message.error({
        content: '请求错误',
        duration: 1.5
    }).then(() => {
        store.dispatch({
            type: 'CHANGE_LOADING',
            payload: false
        })
    })
    return Promise.reject(new Error('fail'))
})


export default request;
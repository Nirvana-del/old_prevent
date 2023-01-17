import axios from 'axios'
import {message} from "antd";
// import {store} from "@/store";
// import { store } from '@/redux'
// import Cookie from "js-cookie";
const request  = axios.create({
    baseURL:'http://47.97.208.219:8087',
    timeout:5000,
    headers: { 'Content-Type': 'application/json' }
})
request.interceptors.request.use((config)=>{
    // store.dispatch({
    //     type: 'CHANGE_LOADING',
    //     payload: true
    // })
    // if (config.url?.includes("/login")){
    //     return config;
    // }
    // const token = Cookie.get("token")
    // if (token && typeof config.headers !== 'undefined') {
    //     config.headers.Authorization = token;
    // }
    return config;
})

request.interceptors.response.use((res)=>{
    // store.dispatch({
    //     type: 'CHANGE_LOADING',
    //     payload: false
    // })
    return res;
},(err)=>{
    message.error({
        content:'请求错误',
        duration: 2
    })
    console.log(err)
    // store.dispatch({
    //     type: 'CHANGE_LOADING',
    //     payload: false
    // })
    return Promise.reject(new Error('fail'))
})


export default request;
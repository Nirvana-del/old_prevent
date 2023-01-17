import Cookie from 'js-cookie'
import {AES} from "crypto-js";
export const get_Token = () => {
    return Cookie.get('token') || null
}

export const set_Token = (token:string, time_limit:number) => {
    Cookie.set('token', token, {
        expires: time_limit
    })
}

export const remove_Token = () => {
    Cookie.remove('token')
}

export const set_UserInfo = (username: string, password: string, type: number, remember: boolean) => {
    Cookie.set('user_Name', username, {
        expires: 5
    })
    Cookie.set('user_Pwd', password, {
        expires: 5
    })
    Cookie.set('user_Type', type, {
        expires: 5
    })
    Cookie.set('remember', remember, {
        expires: 5
    })
}

export const remove_UserInfo = () => {
    Cookie.remove('user_Name')
    Cookie.remove('user_Pwd')
    Cookie.remove('user_Type')
    Cookie.remove('remember')
}


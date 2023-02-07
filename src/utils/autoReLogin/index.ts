import Cookie from "js-cookie";

export const get_Token = () => {
    return Cookie.get('re_login') || null
}

export const set_Token = (token:string, time_limit:number) => {
    Cookie.set('re_login', token, {
        expires: time_limit
    })
}

export const remove_Token = () => {
    Cookie.remove('token')
}
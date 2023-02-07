import Cookie from "js-cookie";

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
    Cookie.set('user_remember', remember, {
        expires: 5
    })
}

export const remove_UserInfo = () => {
    Cookie.remove('user_Name')
    Cookie.remove('user_Pwd')
    Cookie.remove('user_Type')
    Cookie.remove('user_remember')
}
export const set_AdminInfo = (username: string, password: string, remember: boolean) => {
    Cookie.set('Admin_Name', username, {
        expires: 5
    })
    Cookie.set('Admin_Pwd', password, {
        expires: 5
    })
    Cookie.set('Admin_remember', remember, {
        expires: 5
    })
}

export const remove_AdminInfo = () => {
    Cookie.remove('Admin_Name')
    Cookie.remove('Admin_Pwd')
    Cookie.remove('Admin_remember')
}
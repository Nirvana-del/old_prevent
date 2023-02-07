import React, {createContext, useMemo, useState} from 'react'
import {AuthProviderValue} from "@/components/Auth/types";
import {store} from "@/redux";
import {UserType} from "@/types/user";

export const AuthContext = createContext<AuthProviderValue>({
    userInfo: {
        phone: ''
    },
    changeUserInfo: () => {},
    pathname: '',
    changePathname: () => {}
})

interface IProps {
    children: React.ReactNode
}

const AuthProvider: React.FC<IProps> = (props) => {
    const [userInfo, setUserInfo] = useState<UserType>(store.getState().UserInfo.userMsg);
    const [pathname, setPathname] = useState<string>(store.getState().HandlePathname.pathname);
    const changeUserInfo = (userMsg: UserType) => {
        store.dispatch({
            type: 'SET_USER_INFO',
            payload: userMsg
        })
        setUserInfo(userMsg)
    }
    const changePathname = (pathString: string) => {
        store.dispatch({
            type: 'CHANGE_PATHNAME',
            payload: pathString
        })
        setPathname(pathString)
    }
    const globalValue = useMemo(() => {
        return {
            userInfo,
            changeUserInfo,
            pathname,
            changePathname
        }
    }, [userInfo, pathname]);
    return (
        <AuthContext.Provider value={globalValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
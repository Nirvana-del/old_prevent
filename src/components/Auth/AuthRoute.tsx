import React from 'react'
import {Navigate, useLocation} from "react-router-dom";
import {get_Token} from "@/utils/autoReLogin";

type RouteProps = {
    children?: React.ReactNode
}
const loginRoute = '/login'
const indexRoute = '/'
const allowList = ['/login', '/register']

const AuthRoute: React.FC<RouteProps> = (props) => {
    const location = useLocation();
    const {children} = props
    let reLogin_flag = get_Token()
    if(reLogin_flag && reLogin_flag !== 'undefined'){
        if(location.pathname === loginRoute){
            return <Navigate to={indexRoute}></Navigate>
        } else {
            return <>{children}</>
        }
    } else {
        if(allowList.includes(location.pathname || '')){
            return <>{children}</>
        } else {
            return <Navigate to={loginRoute}></Navigate>
        }
    }
}
export default AuthRoute
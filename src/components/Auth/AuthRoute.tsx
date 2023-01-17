import React from 'react'
import {Navigate, useLocation} from "react-router-dom";
import {get_Token} from "@/utils/handleToken";

type RouteProps = {
    children?: React.ReactNode
}
const loginRoute = '/login'
const indexRoute = '/'
const allowList = ['/login']

const AuthRoute: React.FC<RouteProps> = (props) => {
    const location = useLocation();
    const {children} = props
    let token = get_Token()
    if(token && token !== 'undefined'){
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
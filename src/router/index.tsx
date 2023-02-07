import React, {useEffect} from 'react'
import NProgress from "nprogress"
import UserLogin from "@/pages/Login/UserLogin";
import {Navigate, useRoutes} from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/layout";
import Index from "@/pages/User/UserSetting";
// import Welcome from "@/pages/Welcome";
import UserCenter from "@/pages/User/UserCenter";
import User from "@/pages/User";
import UserRegister from "@/pages/Login/UserRegister";
export interface RoutePath {
  path: string,
  element?: React.ReactNode,
  children?: RoutePath []
}
const AppRouter: React.FC = () => {
  NProgress.start()
  useEffect(() => {
    NProgress.done()
  })
  let staticRoutes:RoutePath[] = [
    {
      path: '/login',
      element: <UserLogin/>
    },
    {
      path: '/register',
      element: <UserRegister/>
    },
    {
      path: '/',
      element: <Navigate to="/home"></Navigate>
    },
    {
      path: '/',
      element: <Layout />,
      children:[
        {
          path: 'home',
          element: <Home />
        },
        // {
        //   path: 'welcome',
        //   element: <Welcome />
        // },
        {
          path: 'user',
          element: <User />,
          children: [
            {
              path: 'center',
              element: <UserCenter />,
            },
            {
              path: 'setting',
              element: <Index />,
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to='/login'></Navigate>
    }
  ]
  return useRoutes(staticRoutes)
}
export default AppRouter
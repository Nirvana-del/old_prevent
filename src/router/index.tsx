import React, {useEffect} from 'react'
import NProgress from "nprogress"
import Login from "@/pages/Login";
import {Navigate, useRoutes} from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/layout";
import UserSetting from "@/pages/User/UserSetting";
import Welcome from "@/pages/Welcome";
import UserCenter from "@/pages/User/UserCenter";
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
      element: <Login/>
    },
    {
      path: '/',
      element: <Navigate to="/welcome"></Navigate>
    },
    {
      path: '/',
      element: <Layout />,
      children:[
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'welcome',
          element: <Welcome />
        },
        {
          path: 'user',
          children: [
            {
              path: 'center',
              element: <UserCenter />,
            },
            {
              path: 'setting',
              element: <UserSetting />,
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
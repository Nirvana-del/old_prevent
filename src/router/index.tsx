import React, {useEffect} from 'react'
import NProgress from "nprogress"
import UserLogin from "@/pages/Login/UserLogin";
import {Navigate, useRoutes} from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/layout";
import UserSetting from "@/pages/User/UserSetting";
import UserRegister from "@/pages/Login/UserRegister";
import CloudData from "@/pages/Home/components/CloudData";
import OldMessage from "@/pages/Home/components/OldMessage";
import EquipmentStatus from "@/pages/Home/components/EquipmentStatus";
import {useAuthContext} from "@/components/hooks/useAuthContext";
import {RoleMap} from "@/types/user";
import OldList from "@/pages/Home/AdminUser/OldList";
import FmList from "@/pages/Home/AdminUser/FmList";
import OldDetail from "@/pages/Home/FmUser/OldDetail";
import AdminUser from "@/pages/Home/AdminUser";

export interface RoutePath {
    path: string,
    element?: React.ReactNode,
    children?: RoutePath []
}

const staticRoutes: RoutePath[] = [
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
        path: '*',
        element: <Navigate to='/'></Navigate>
    }
]

const AppRouter: React.FC = () => {
    NProgress.start()
    useEffect(() => {
        NProgress.done()
    })
    // 不能定义在外面，每次加载路由都要重新初始化一遍 asyncRoutes，否则会导致路由叠加
    let asyncRoutes = [{
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: 'user',
                element: <UserSetting/>
            }
        ]
    },
    ] as RoutePath[]
    const {userInfo:{roleType}} = useAuthContext()

    const {children} = asyncRoutes[0]
    let authRoutes = [] as RoutePath[]
    switch (roleType) {
        case RoleMap.OLD:
            authRoutes = [
                {
                    path: 'home',
                    element: <Home/>,
                    children: [
                        {
                          path: '',
                          element:< Navigate to='equipment' />
                        },
                        {
                            path: 'equipment',
                            element: <EquipmentStatus/>
                        },
                        {
                            path: 'cloudData',
                            element: <CloudData/>
                        },
                        {
                            path: 'oldMessage',
                            element: <OldMessage/>
                        }
                    ]
                }
            ]
            break;
        case RoleMap.FAMILY:
            authRoutes = [
                {
                    path: 'home',
                    element: <Home/>
                },
                {
                    path: 'oldDetail/:id',
                    element: <OldDetail/>
                },
            ]
            break;
        case RoleMap.ADMIN:
            authRoutes = [
                {
                    path: 'home',
                    element: <AdminUser/>,
                    children: [
                        {
                            path: 'oldList',
                            element: <OldList/>
                        },
                        {
                            path: 'oldDetail/:id',
                            element: <OldDetail/>
                        },
                        {
                            path: 'fmList',
                            element: <FmList/>
                        }
                    ]
                }
            ];
            break;
        default:
            break;
    }
    asyncRoutes[0].children = [...children!, ...authRoutes]
    return useRoutes([...staticRoutes, ...asyncRoutes])
}
export default AppRouter
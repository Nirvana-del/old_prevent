import {ReactNode} from "react";
import {staticRoutes} from "@/layout/components/static";
import {useAuthContext} from "@/components/hooks/useAuthContext";
import {RoleMap} from "@/types/user";

interface RouteType {
    path: string;
    routes: Array<{
        exact?: boolean;
        icon?: ReactNode;
        name: string;
        path: string;
        // 可选二级菜单
        routes?: RouteType['routes'];
    }>;
}

let asyncRoutes = [] as RouteType['routes']
export default () => {
    const {userInfo:{roleType}} = useAuthContext()
    switch (roleType) {
        case RoleMap.OLD:
            asyncRoutes = [{
                path: '/home',
                name: '分析页',
                icon: <i className="ri-dashboard-3-line"></i>,
                routes: [
                    {
                        path: 'equipment',
                        name: '设备状态',
                    },
                    {
                        path: 'cloudData',
                        name: '人体点云数据',
                    },
                    {
                        path: 'oldMessage',
                        name: '老人身体数据',
                    }
                ]
            }];
            break;
        case RoleMap.FAMILY:
            asyncRoutes = [
                {
                    path: '/home',
                    name: '老人信息',
                    icon: <i className="ri-user-search-line"></i>
                }
            ];
            break;
        case RoleMap.ADMIN:
            asyncRoutes = [
                {
                    path: '/home',
                    name: '用户管理',
                    icon: <i className="ri-user-search-line"></i>,
                    routes: [
                        {
                            path: 'oldList',
                            name: '老人信息',
                        },
                        {
                            path: 'fmList',
                            name: '家属信息',
                        }
                    ]
                }
            ];
            break;
        default:
            break;
    }
    return {
        route: {
            path: '/',
            routes: [...asyncRoutes, ...staticRoutes],
        } as RouteType
    };
}
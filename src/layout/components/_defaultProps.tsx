import { RouterTypes } from '@ant-design/pro-layout/lib/typings';

import {ReactNode} from "react";
interface RouteType {
    path: string;
    routes: Array<{
        exact?: boolean;
        icon: ReactNode;
        name: string;
        path: string;
        // 可选二级菜单
        routes?: RouteType['routes'];
    }>;
}

export default {
    route: {
        path: '/',
        routes: [
            // {
            //     path: '/welcome',
            //     name: '欢迎',
            //     icon: <SmileFilled />
            // },
            {
                path: '/home',
                name: '分析页',
                icon: <i className="ri-dashboard-3-line"></i>
            },
            {
                path: '/user',
                name: '个人页',
                icon: <i className="ri-user-line"></i>,
                routes: [
                    // {
                    //     path: '/user/center',
                    //     name: '个人中心'
                    // },
                    {
                        path: '/user/setting',
                        name: '个人设置'
                    },
                ]
            },
            // {
            //     path: 'https://ant.design',
            //     name: 'Ant Design 官网外链',
            //     icon: <ChromeFilled />,
            // },
        ],
    } as RouteType,
    location: {
        pathname: '/',
    },
    // 头部左侧所有应用
    // appList: [
    //     {
    //         icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    //         title: 'Ant Design',
    //         desc: '杭州市较知名的 UI 设计语言',
    //         url: 'https://ant.design',
    //     },
    // ],
};
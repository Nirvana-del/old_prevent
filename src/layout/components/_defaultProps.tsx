import {DashboardOutlined, SmileFilled, UserOutlined} from '@ant-design/icons';
// import { RouterTypes } from '@ant-design/pro-layout/lib/typings';

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/welcome',
                name: '欢迎',
                icon: <SmileFilled />
            },
            {
                path: '/home',
                name: '主页',
                icon: <DashboardOutlined />
            },
            {
                path: '/user',
                name: '个人页',
                icon: <UserOutlined />,
                routes: [
                    {
                        path: '/user/center',
                        name: '个人中心'
                    },
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
    } ,
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
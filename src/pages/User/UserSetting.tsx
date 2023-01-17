import React, {CSSProperties} from 'react'
import type { TabsProps } from 'antd';
import {Tabs} from "antd";
import BasicSetting from "@/pages/User/components/BasicSetting";
import AccountBinding from "@/pages/User/components/AccountBinding";
import SecuritySetting from "@/pages/User/components/SecuritySetting";
import MessageNotification from "@/pages/User/components/MessageNotification";
import "./index.scss"
const items = [
    {
        label: `基本设置`,
        key: '1',
        children: <BasicSetting />,
    },
    {
        label: `账号绑定`,
        key: '2',
        children: <AccountBinding />,
    },
    {
        label: `安全设置`,
        key: '3',
        children: <SecuritySetting />,
    },
    {
        label: `新消息通知`,
        key: '4',
        children: <MessageNotification />,
    },
]
const tabBarStyle:CSSProperties = {
    width: '20%',
}
const UserSetting: React.FC = () => {
    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => {
        return (
            <DefaultTabBar {...props}  />
        )
    };
    return <Tabs className='user-setting' tabBarStyle={tabBarStyle} renderTabBar={renderTabBar} items={items} tabPosition='left' />
}
export default UserSetting
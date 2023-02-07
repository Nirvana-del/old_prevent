import React, {CSSProperties, useEffect, useState} from 'react'
import type {TabsProps} from 'antd';
import {Tabs} from "antd";
import BasicSetting from "@/pages/User/UserSetting/components/BasicSetting";
import AccountBinding from "@/pages/User/UserSetting/components/AccountBinding";
import SecuritySetting from "@/pages/User/UserSetting/components/SecuritySetting";
import MessageNotification from "@/pages/User/UserSetting/components/MessageNotification";
import "../index.scss"
import {connect} from "react-redux";

const items = [
    {
        label: `基本设置`,
        key: '1',
        children: <BasicSetting/>,
    },
    {
        label: `账号绑定`,
        key: '2',
        children: <AccountBinding/>,
    },
    // {
    //     label: `安全设置`,
    //     key: '3',
    //     children: <SecuritySetting/>,
    // },
    // {
    //     label: `新消息通知`,
    //     key: '4',
    //     children: <MessageNotification/>,
    // },
]
const tabBarStyle: CSSProperties = {
    width: '20%',
    // color: '#3b82f6',
    // background: 'rgb(230,244,255)'
}
interface IProps {
    activeKey: string,
    changeActiveKey: (activeKey: string) => void
}
const UserSetting: React.FC<IProps> = (props) => {
    const {activeKey, changeActiveKey} = props
    console.log(props)
    // const [activeKey, setActiveKey] = useState<string>(items[0].key);
    useEffect(() => {
        console.log(activeKey)
    }, []);

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => {
        return (
            <DefaultTabBar {...props}  />
        )
    };
    return <Tabs className='user-setting'
                 activeKey={activeKey}
                 onChange={(activeKey) => changeActiveKey(activeKey)}
                 tabBarStyle={tabBarStyle}
                 renderTabBar={renderTabBar}
                 items={items}
                 tabPosition='left'/>
}
const mapStateToProps = (state: any) => {
    const {UserSetting:{activeKey}} = state
    return {
        activeKey
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeActiveKey: (activeKey: string) => {
            dispatch({type: 'CHANGE_TAB_PAGE', payload: activeKey})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserSetting)
// export default UserSetting
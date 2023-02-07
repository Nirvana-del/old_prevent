import React, {CSSProperties, ReactNode, useEffect, useState} from 'react'
import type {TabsProps} from 'antd';
import {Tabs} from "antd";
import BasicSetting from "@/pages/User/UserSetting/components/BasicSetting";
import "../index.scss"
import {connect} from "react-redux";
import {useAuthContext} from "@/components/hooks/useAuthContext";
import AccountBinding from "@/pages/User/UserSetting/components/AccountBinding";
import {RoleMap} from "@/types/user";


const tabBarStyle: CSSProperties = {
    width: '20%',
}
interface IProps {
    activeKey: string,
    changeActiveKey: (activeKey: string) => void
}
interface TabItemType {
    label: string,
    key: string,
    children: ReactNode,
}
const staticItems: TabItemType[] = [
    {
        label: `基本设置`,
        key: '1',
        children: <BasicSetting/>,
    }
]
const UserSetting: React.FC<IProps> = (props) => {
    const [asyncItems, setAsyncItems] = useState<TabItemType[]>([]);
    const {activeKey, changeActiveKey} = props
    const {userInfo:{roleType}} = useAuthContext()

    const [tabItems, setTabItems] = useState<TabItemType[]>([]);
    useEffect(() => {
        if (roleType === RoleMap.OLD){
            setAsyncItems([{
                label: `账号绑定`,
                key: '2',
                children: <AccountBinding/>,
            }])
        }
    }, []);

    useEffect(() => {
        setTabItems([...staticItems, ...asyncItems])
    }, [asyncItems])
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
                 items={tabItems}
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

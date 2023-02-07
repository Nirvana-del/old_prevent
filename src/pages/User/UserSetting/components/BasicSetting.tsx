import React, {useEffect, useState} from 'react'
import {Descriptions} from "antd";
import {useAuthContext} from "@/components/hooks/useAuthContext";
import {NameMap} from "@/types/user";

const BasicSetting: React.FC = () => {
    const {userInfo:{phone, roleType}} = useAuthContext()

    return (
        <div>
            <Descriptions title="基本信息">
                <Descriptions.Item label="手机号码">{phone}</Descriptions.Item>
                <Descriptions.Item label="用户身份">{NameMap[roleType!]}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}
export default BasicSetting
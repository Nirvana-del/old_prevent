import React, {CSSProperties} from 'react'
import {Divider, Space} from "antd";

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};
const otherLogin: React.ReactNode = (
    <div className={'flex-cc flex-col'}>
        <Divider plain>
                          <span style={{color: '#CCC', fontWeight: 'normal', fontSize: 14}}>
                            其他登录方式
                          </span>
        </Divider>
        <Space align="center" size={24}>

            <i className="ri-alipay-fill text-blue cursor-pointer text-2xl"></i>
            <i className="ri-taobao-fill text-orange cursor-pointer text-2xl"></i>
            <i className="ri-weibo-fill text-red cursor-pointer text-2xl"></i>
        </Space>
    </div>
)

export default otherLogin
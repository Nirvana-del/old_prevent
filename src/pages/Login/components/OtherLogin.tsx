import React, {CSSProperties} from 'react'
import {Divider, Space} from "antd";
import {AlipayOutlined, TaobaoOutlined, WeiboOutlined} from "@ant-design/icons";
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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: 40,
                    width: 40,
                    border: '1px solid #D4D8DD',
                    borderRadius: '50%',
                }}
            >
                <AlipayOutlined style={{...iconStyles, color: '#1677FF'}}/>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: 40,
                    width: 40,
                    border: '1px solid #D4D8DD',
                    borderRadius: '50%',
                }}
            >
                <TaobaoOutlined style={{...iconStyles, color: '#FF6A10'}}/>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: 40,
                    width: 40,
                    border: '1px solid #D4D8DD',
                    borderRadius: '50%',
                }}
            >
                <WeiboOutlined style={{...iconStyles, color: '#333333'}}/>
            </div>
        </Space>
    </div>
)

export default otherLogin
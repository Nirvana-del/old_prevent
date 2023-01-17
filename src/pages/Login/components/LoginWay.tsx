import React from 'react'
import {ProFormCaptcha, ProFormRadio, ProFormText} from "@ant-design/pro-components";
import {LockOutlined, MobileOutlined, UserOutlined} from "@ant-design/icons";
import {PHONE_NUMBER_RULE} from "@/pages/Login/constant";
import {message} from "antd";

type loginWayProps = {
    loginType: string
}

const loginWay: React.FC<loginWayProps> = (props) => {
    const { loginType } = props
    return (
        <div>
            {loginType === 'account' && (
                <>
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'}/>,
                        }}
                        placeholder={'用户名:'}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            }
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'}/>,
                        }}
                        placeholder={'密码:'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                    <ProFormRadio.Group
                        name="type"
                        label="您的身份："
                        options={[
                            {
                                label: '老人',
                                value: 0,
                            },
                            {
                                label: '家属',
                                value: 1,
                            }
                        ]}
                    />
                </>
            )}
            {loginType === 'phone' && (
                <>
                    <ProFormText
                        fieldProps={{
                            size: 'large',
                            prefix: <MobileOutlined className={'prefixIcon'}/>,
                        }}
                        name="mobile"
                        placeholder={'手机号'}
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: PHONE_NUMBER_RULE,
                                message: '手机号格式错误！',
                            },
                        ]}
                    />
                    <ProFormCaptcha
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'}/>,
                        }}
                        captchaProps={{
                            size: 'large',
                        }}
                        placeholder={'请输入验证码'}
                        captchaTextRender={(timing, count) => {
                            if (timing) {
                                return `${count} ${'获取验证码'}`;
                            }
                            return '获取验证码';
                        }}
                        name="captcha"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码！',
                            },
                        ]}
                        onGetCaptcha={async () => {
                            message.success('获取验证码成功！验证码为：1234');
                        }}
                    />
                </>
            )}
        </div>
    )
}
export default loginWay
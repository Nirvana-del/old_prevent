import React from 'react'
import {ProFormCaptcha, ProFormRadio, ProFormText} from "@ant-design/pro-components";
import {PHONE_NUMBER_RULE} from "@/constant";
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
                            prefix: <i className="ri-user-line"></i>,
                        }}
                        placeholder={'手机号码:'}
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号码',
                            }
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <i className="ri-lock-line"></i>,
                        }}
                        placeholder={'密码:'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    />
                    <ProFormRadio.Group
                        name="type"
                        label="您的身份："
                        rules={[
                            {
                                required: true,
                                message: '请选择身份',
                            },
                        ]}
                        options={[
                            {
                                label: '老人',
                                value: 1,
                            },
                            {
                                label: '家属',
                                value: 2,
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
                            prefix: <i className="ri-smartphone-line"></i>,
                        }}
                        name="mobile"
                        placeholder={'手机号'}
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                            {
                                pattern: PHONE_NUMBER_RULE,
                                message: '手机号格式错误',
                            },
                        ]}
                    />
                    <ProFormCaptcha
                        fieldProps={{
                            size: 'large',
                            prefix: <i className="ri-lock-line"></i>,
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
                                message: '请输入验证码',
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
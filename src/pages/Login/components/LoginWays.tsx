import React from 'react'
import {LoginType} from "@/pages/Login/UserLogin";
import {ProFormCheckbox, ProFormRadio, ProFormText} from '@ant-design/pro-components';
import {PHONE_NUMBER_RULE} from "@/constant";
import {useNavigate} from "react-router-dom";

type IProps = {
    loginType: LoginType
}
const LoginWays: React.FC<IProps> = (props) => {
    const navigate = useNavigate()

    return (
        <>
            {
                props.loginType === 'user' && (
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
                                },
                                {
                                    pattern: PHONE_NUMBER_RULE,
                                    message: '请输入正确的手机号',
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
                        <div className={'flex-bc'}>
                            <ProFormCheckbox noStyle name="remember">
                                记住密码
                            </ProFormCheckbox>
                            <div className={'float-right p-2'}>
                                <a className='hover:text-blue' onClick={() => navigate('/register')}>注册</a>
                            </div>
                        </div>
                    </>
                )
            }
            {
                props.loginType === 'admin' && (
                    <>
                        <ProFormText
                            name="admin_username"
                            fieldProps={{
                                size: 'large',
                                prefix: <i className="ri-user-line"></i>,
                            }}
                            placeholder={'手机号码:'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号码',
                                },
                                {
                                    pattern: PHONE_NUMBER_RULE,
                                    message: '请输入正确的手机号',
                                }
                            ]}
                        />
                        <ProFormText.Password
                            name="admin_password"
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
                        <div className='mb-4'>
                            <ProFormCheckbox noStyle name="admin_remember">
                                记住密码
                            </ProFormCheckbox>
                        </div>
                    </>
                )
            }
        </>

    )
}
export default LoginWays
import React, {useEffect} from 'react'
import {
    PageContainer,
    ProForm,
    ProFormSelect,
    ProFormText
} from "@ant-design/pro-components";
import {USER_NAME_RULE, PASSWORD_RULE, PHONE_NUMBER_RULE} from "@/constant";
import {useNavigate} from "react-router-dom";
import {Form, message} from 'antd';
import {RegisterType} from "@/pages/Login/types";
import {reqRegister} from "@/api/user";

const UserRegister: React.FC = () => {
    const [registerRef] = Form.useForm()
    const navigate = useNavigate()
    useEffect(() => {
        document.title = '注册-老人跌倒检测系统'
    })
    const handleSignup = async (values: Record<string, any>) => {
        console.log(values)
        const {
            register_password: password,
            register_password_confirm: password_confirm,
            register_phone: phone,
            register_type: type,
            register_username: name
        } = values
        if (password !== password_confirm) {
            await message.warning('两次密码输入不一致')
        } else {
            const registerMsg = {
                phone,
                password,
                name,
                type
            } as RegisterType
            const res = await reqRegister(registerMsg)
            console.log(res)
            if (res.data.code === 200){
                message.success('注册成功！')
                registerRef.resetFields()
                navigate('/login')
            }
        }
    }
    return (
        <div className='flex-bs box-border animate__animated animate__bounceInRight'>
            <PageContainer
                className='flex-col flex-2 flex-cc'
                title={<div className='flex-bc mt-4'>
                    <i className="ri-bubble-chart-fill text-blue text-4xl mr-4"></i>
                    <h2 className='text-4xl'>注册</h2>
                    <div className={'ml-12 font-normal text-base'}>
                        已有账号？<a className='text-blue hover:text-light-blue'
                                    onClick={() => navigate('/login')}>去登录</a>
                    </div>
                </div>}
            >
                <ProForm
                    form={registerRef}
                    onFinish={async (values) => handleSignup(values)}
                >
                    <div className='flex-col flex-cc'>
                        <ProFormText
                            width='md'
                            name="register_username"
                            label='用户名'
                            placeholder={'用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                                {
                                    pattern: USER_NAME_RULE,
                                    message: '用户名为 2~6 个英文，数字，下划线，中文'
                                }
                            ]}
                        />
                        <ProFormText
                            width='md'
                            name="register_phone"
                            placeholder={'手机号码'}
                            label='手机号码'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号码',
                                },
                                {
                                    pattern: PHONE_NUMBER_RULE,
                                    message: '手机号格式错误',
                                },
                            ]}
                        />
                        <ProFormSelect
                            width='md'
                            name="register_type"
                            label='用户身份'
                            rules={[
                                {
                                    required: true,
                                    message: '请选择身份',
                                }
                            ]}
                            options={[
                                {
                                    value: 1,
                                    label: '老人',
                                },
                                {
                                    value: 2,
                                    label: '家属',
                                },
                            ]}
                            placeholder='请选择身份'
                        />
                        <ProFormText.Password
                            width='md'
                            label='密码'
                            name="register_password"
                            placeholder={'输入密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                                {
                                    pattern: PASSWORD_RULE,
                                    message: '密码以字母开头，仅限 6~18 个字母、数字、下划线',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            width='md'
                            name="register_password_confirm"
                            label='确认密码'
                            placeholder={'确认密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请确认密码',
                                },
                                {
                                    pattern: PASSWORD_RULE,
                                    message: '密码以字母开头，仅限 6~18 个字母、数字、下划线',
                                },
                            ]}
                        />
                    </div>
                </ProForm>
            </PageContainer>
            <div
                className='h-screen flex-1 bg-[url("/src/assets/undraw_register_bg.svg")] bg-center bg-no-repeat'></div>
        </div>
    )
}
export default UserRegister
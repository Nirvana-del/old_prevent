import {LoginFormPage,} from '@ant-design/pro-components';
import {Form, message, Tabs} from 'antd';
import React, {useEffect, useState} from 'react';
import {AdminLoginType, FmLoginType, OldLoginType} from "@/pages/Login/types";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import {reqOldLogin} from "@/api/old_user/user";
import Cookie from "js-cookie";
import {AES, enc} from 'crypto-js';
import LoginWays from "@/pages/Login/components/LoginWays";
import {reqFmLogin} from "@/api/family_user";
import {reqAdminLogin} from "@/api/admin_user";
import {useAuthContext} from "@/components/hooks/useAuthContext";
import {RoleMap, UserType} from "@/types/user";
import {remove_AdminInfo, remove_UserInfo, set_AdminInfo, set_UserInfo} from "@/utils/keepPwd";
import {set_Token} from "@/utils/autoReLogin";

type loginParamsType = FmLoginType | OldLoginType | AdminLoginType

const logo = new URL(`@/assets/undraw_login_bg.svg`, import.meta.url).href;

export type LoginType = 'user' | 'admin';

const UserLogin: React.FC = () => {
    const {changeUserInfo, changePathname} = useAuthContext()
    const navigate = useNavigate()
    const [loginType, setLoginType] = useState<LoginType>('user');
    const [login_form] = Form.useForm();
    const sendLoginMsg = <T extends loginParamsType>(loginFn: (loginMsg: T) => Promise<AxiosResponse<any>>, login_params: T): Promise<any> => {
        return loginFn(login_params).then((res) => {
            const {data} = res
            if (!data.success) {
                message.error('用户名或密码不正确！');
            } else {
                login_form.resetFields()
                const in30Minutes = 1 / 48
                set_Token('token', in30Minutes)
                navigate('/')
            }
            return {
                success: data.success,
                fid: data.data !== null ? data.data.fid : null
            }
        })
    }
    const handleUserLogin = async (e: Record<string, any>) => {
        if (loginType === 'user') {
            const {username, password, type, remember} = e
            let loginMsg = {} as loginParamsType
            let res
            if (type === 2) {
                loginMsg = {
                    fphone: username,
                    password
                } as FmLoginType
                res = await sendLoginMsg(reqFmLogin, loginMsg)
            } else {
                const loginMsg = {
                    phone: username,
                    password
                } as OldLoginType
                res = await sendLoginMsg(reqOldLogin, loginMsg)
            }
            // 登陆成功
            if (res.success) {
                changePathname('/home')
                let userInfo
                if (res.fid !== null) {
                    userInfo = {fid: res.fid, phone: username, roleType: RoleMap.FAMILY} as UserType
                } else {
                    userInfo = {phone: username, roleType: RoleMap.OLD} as UserType
                }
                changeUserInfo(userInfo)
                remember ? setUserInfo(username, password, type, remember) :
                    remove_UserInfo()
            }
        } else {
            const {admin_username, admin_password, admin_remember} = e
            const loginMsg = {
                cphone: admin_username,
                cpassword: admin_password
            } as AdminLoginType
            const res = await sendLoginMsg(reqAdminLogin, loginMsg)
            if (res.success) {
                const userInfo = {phone: admin_username, roleType: RoleMap.ADMIN} as UserType
                changeUserInfo(userInfo)
                admin_remember ? setAdminInfo(admin_username, admin_password, admin_remember) :
                    remove_AdminInfo()
            }
        }
    }
    const setUserInfo = (username: string, password: string, type: number, remember: boolean) => {
        set_UserInfo(username, AES.encrypt(password, 'sssg'), type, remember)
    }
    const setAdminInfo = (username: string, password: string, remember: boolean) => {
        set_AdminInfo(username, AES.encrypt(password, 'sssg'), remember)
    }
    useEffect(() => {
        document.title = '老人跌倒检测系统'
        const user_remember = Cookie.get('user_remember') || false
        const admin_remember = Cookie.get('Admin_remember') || false
        if (user_remember) {
            const enUsername = Cookie.get('user_Name') || ''
            const enPassword = Cookie.get('user_Pwd') || ''
            const enType = Number(Cookie.get('user_Type') || '0')
            const pwd = AES.decrypt(enPassword, 'sssg').toString(enc.Utf8)
            const loginMsg = {
                username: enUsername,
                password: pwd,
                type: enType,
                remember: user_remember,
            } as Record<string, any>
            pwd && login_form.setFieldsValue(loginMsg)
        }
        if (admin_remember) {
            const enUsername = Cookie.get('Admin_Name') || ''
            const enPassword = Cookie.get('Admin_Pwd') || ''
            const pwd = AES.decrypt(enPassword, 'sssg').toString(enc.Utf8)
            const loginMsg = {
                admin_username: enUsername,
                admin_password: pwd,
                admin_remember: admin_remember,
            } as Record<string, any>
            pwd && login_form.setFieldsValue(loginMsg)
        }

    }, [])
    return (
        <div className='bg-white h-screen relative animate__animated animate__bounceInLeft'>
            <LoginFormPage
                form={login_form}
                backgroundImageUrl={logo}
                logo={<i className="ri-bubble-chart-fill text-blue text-4xl"></i>}
                title="老人跌倒检测系统"
                subTitle="特色推荐"
                onFinish={(e) => handleUserLogin(e)}
            >
                <Tabs
                    centered
                    items={[
                        {
                            label: `用户登录`,
                            key: 'user'
                        },
                        {
                            label: `管理员登录`,
                            key: 'admin'
                        }
                    ]}
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                </Tabs>
                <LoginWays loginType={loginType}/>
            </LoginFormPage>
        </div>
    );
};

export default UserLogin
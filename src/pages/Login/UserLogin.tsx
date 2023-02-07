import {
    LoginFormPage,
    ProFormCheckbox,
} from '@ant-design/pro-components';
import {Form, message, Tabs} from 'antd';
import {useEffect, useState} from 'react';
import {FmLoginType, OldLoginType} from "@/pages/Login/types";
import {AxiosResponse} from "axios";
import {remove_UserInfo, set_Token, set_UserInfo} from "@/utils/handleToken";
import {useNavigate} from "react-router-dom";
import {reqFmLogin, reqOldLogin} from "@/api/user";
import Cookie from "js-cookie";
import {enc, AES} from 'crypto-js';
import otherLogin from "@/pages/Login/components/OtherLogin";
import UserLogin from "./components/LoginWay";

type loginParamsType = FmLoginType | OldLoginType

const logo = new URL(`@/assets/undraw_login_bg.svg`, import.meta.url).href;

type LoginType = 'phone' | 'account';

export default () => {
    const navigate = useNavigate()
    const [loginType, setLoginType] = useState<LoginType>('account');
    const [login_form] = Form.useForm();
    const sendLoginMsg = <T extends loginParamsType>(loginFn: (loginMsg: T) => Promise<AxiosResponse<any>>, login_params: T): Promise<Boolean> => {
        return loginFn(login_params).then((res) => {
            // console.log(res)
            const {data} = res
            if (!data.success) {
                message.error(data.message);
            } else {
                login_form.resetFields()
                // message.success(data.message);
                const in30Minutes = 1 / 48
                set_Token('token', in30Minutes)
                navigate('/')
            }
            return data.success
        }).finally(() => {
            // setLoginLoading(false)
        })
    }
    const handleUserLogin = async (e: Record<string, any>) => {
        // console.log(e)
        const {username, password, type, remember} = e
        // console.log(remember)
        let loginMsg = {} as loginParamsType
        if (type === 2) {
            loginMsg = {
                fphone: username,
                password
            } as FmLoginType
            await sendLoginMsg(reqFmLogin, loginMsg)
        } else {
            const loginMsg = {
                phone: username,
                password
            } as OldLoginType
            await sendLoginMsg(reqOldLogin, loginMsg)
        }
        remember ? setUserInfo(username, password, type, remember) :
            remove_UserInfo()
    }
    const setUserInfo = (username: string, password: string, type: number, remember: boolean) => {
        // const user_Info = {
        //     phone: username,
        //     role: type
        // } as User
        // store.dispatch(saveUserInfo(user_Info))
        set_UserInfo(username, AES.encrypt(password, 'sssg'), type, remember)
    }
    useEffect(() => {
        document.title = '老人跌倒检测系统'
        const remember = Cookie.get('remember') || false
        if (remember) {
            const enUsername = Cookie.get('user_Name') || ''
            const enPassword = Cookie.get('user_Pwd') || ''
            const enType = Number(Cookie.get('user_Type') || '0')
            const pwd = AES.decrypt(enPassword, 'sssg').toString(enc.Utf8)
            const loginMsg = {
                username: enUsername,
                password: pwd,
                type: enType,
                remember: remember,
            } as Record<string, any>
            pwd && login_form.setFieldsValue(loginMsg)
        } else {
            login_form.resetFields()
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
                /*左下角广告*/
                // activityConfig={activityConfig}
                /*其他登录方式*/
                // actions={otherLogin}
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                    items={[
                        {
                            label: `账号密码登录`,
                            key: 'account'
                        },
                        {
                            label: `手机号登录`,
                            key: 'phone'
                        }
                    ]}
                >
                </Tabs>
                <UserLogin loginType={loginType}/>
                <div className={'mb-4 flex-bc'}>
                    <ProFormCheckbox noStyle name="remember">
                        记住密码
                    </ProFormCheckbox>
                    <div className={'float-right p-2'}>
                        <a className='hover:text-blue' onClick={() => navigate('/register')}>注册</a>
                        {/*&nbsp;|&nbsp;*/}
                        {/*<a className='hover:text-blue'>忘记密码</a>*/}
                    </div>
                </div>
            </LoginFormPage>
        </div>
    );
};
import React, {useEffect} from 'react'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuthContext} from "@/components/hooks/useAuthContext";
import {Card, Col, Row} from "antd";
import {NameMap} from "@/types/user";

const AdminUser: React.FC = () => {
    const {userInfo, changePathname, pathname} = useAuthContext()
    const {roleType} = userInfo
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        console.log(pathname)
        if (pathname !== ''){
            navigate(pathname)
        }
    }, []);
    return (
        <>
            {
                location.pathname === '/home' && (
                    <div className='w-full'>
                        <div className='flex-ac text-4xl font-black font-sans mt-12'>
                            老人跌倒检测系统
                        </div>
                        <div className='flex-ac text-base font-medium my-4'>
                            助力每一个老人的生命健康 ~
                        </div>
                        <div className='flex-sc text-base font-medium my-12'>您的身份：<span
                            className='text-blue'>{NameMap[roleType!]}</span></div>
                        <Row gutter={24} justify='space-around'>
                            <Col span={12}>
                                <Card title="用户管理" hoverable
                                      onClick={() => {
                                          navigate('/home/oldList')
                                          changePathname('/home/oldList')
                                      }}

                                      extra={<span className='cursor-pointer text-blue'>前往</span>}>
                                    <p className='text-gray'>查看老人以及家属的详细信息</p>

                                </Card></Col>
                            <Col span={12}>
                                <Card title="个人信息" hoverable
                                      onClick={() => {
                                          navigate('/user')
                                          changePathname('/user')
                                      }}
                                      extra={<span className='cursor-pointer text-blue'>前往</span>}>
                                    <p className='text-gray'>查看当前登录用户的个人信息</p>
                                </Card></Col>


                        </Row>
                    </div>
                )
            }
            <Outlet/>
        </>
    )
}
export default AdminUser
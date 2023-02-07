import React, {useEffect, useState} from 'react'
import {useAuthContext} from "@/components/hooks/useAuthContext";
import {reqGetOldListByFmId} from "@/api/family_user";
import {UserType} from "@/types/user";
import {List} from "antd";
import { ProCard } from '@ant-design/pro-components';
import {useNavigate} from "react-router-dom";

const Index: React.FC = () => {
    const {userInfo} = useAuthContext()
    const navigate = useNavigate()
    const [oldList, setOldList] = useState<UserType[]>([]);
    const {pathname} = useAuthContext()
    console.log(pathname)
    const getOldList = async () => {
        const res = await reqGetOldListByFmId(userInfo?.fid!)
        if (res.data.success){
            setOldList(res.data.data)
        }
    }
    useEffect(() => {
        getOldList().then()
    }, [])
    useEffect(() => {
        console.log(pathname)
        if (pathname !== ''){
            navigate(pathname)
        }
    }, []);
    const getOldDetail = (oid: string) => {
        navigate(`/oldDetail/${oid}`)
    }
    return (
        <ProCard  title='老人列表' >
        <div>
            <List
                itemLayout="horizontal"
                dataSource={oldList}
                renderItem={(item) => {
                    return (
                        <List.Item>
                           <div className='flex-bc w-1/2'>
                               <div>{item.phone}</div>
                               <div>{item.name}</div>
                               <span
                                   onClick={() => getOldDetail(item.oid!)}
                                   className='text-blue cursor-pointer text-align-last'>
                                老人详情
                            </span>
                           </div>
                        </List.Item>
                    )
                }}
            />
        </div>
        </ProCard>
    )
}
export default Index
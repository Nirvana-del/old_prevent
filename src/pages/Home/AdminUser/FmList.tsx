import React, {useEffect, useState} from 'react'
import {ProCard} from "@ant-design/pro-components";
import {List, message, Popconfirm} from "antd";
import {UserType} from "@/types/user";
import {useNavigate} from "react-router-dom";
import {reqAdminFetchFmList, reqDeleteFmUserById} from "@/api/admin_user";
import {getAdmin_Fm_OldId, getAdmin_FmId, setAdmin_FmId} from "@/utils/keep-alive";

const FmList: React.FC = () => {
    const [fmList, setFmList] = useState<Array<UserType>>([]);
    const navigate = useNavigate()
    const fetchFmList = async () => {
        const res = await reqAdminFetchFmList()
        if (res.data.success) {
            setFmList(res.data.data)
        } else {
            message.error(res.data.message)
        }
    }
    useEffect(() => {
        fetchFmList().then()
    }, []);
    useEffect(() => {
        const currentFidId = getAdmin_FmId()
        const currentOldId = getAdmin_Fm_OldId()
        // 页面缓存
        if (currentOldId !== undefined && currentOldId !== null) {
            navigate(`/home/oldDetail/${currentOldId}`, {state: {role: 'fm'}})
        } else if (currentFidId !== undefined && currentFidId !== null) {
            navigate(`/home/oldList?fid=${currentFidId}`)
        }

    }, []);

    const gotoOldInfo = (fid: string) => {
        setAdmin_FmId(fid)
        navigate(`/home/oldList?fid=${fid}`)
    }
    const handleDeleteFmUser = async (item: UserType) => {
        const res = await reqDeleteFmUserById(item.fid!)
        if (res.data.success) {
            fetchFmList().then()
        }
    }
    return (
        <ProCard title='家属列表'>
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={fmList}
                    pagination={{
                        pageSize: 6,
                        hideOnSinglePage: true
                    }}
                    renderItem={(item) => {
                        return (
                            <List.Item
                                actions={[
                                    <Popconfirm
                                        title="删除用户"
                                        description="您确定要删除这位用户吗（删除后同时解绑所有老人）?"
                                        onConfirm={() => handleDeleteFmUser(item)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <span className='cursor-pointer hover:text-red'>删除用户</span>
                                    </Popconfirm>
                                ]}
                            >
                                <div className='flex-bc w-full'>
                                    <div>{item.fphone}</div>
                                    <div>{item.name}</div>
                                    <span
                                        onClick={() => gotoOldInfo(item.fid!)}
                                        className='text-blue cursor-pointer text-align-last'>
                                老人信息
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
export default FmList
import React, {useEffect, useMemo, useState} from 'react'
import {reqAdminFetchOldList, reqDeleteOldUserById, reqGetOldListByFmId} from "@/api/admin_user";
import {UserType} from "@/types/user";
import {ProCard} from "@ant-design/pro-components";
import {List, message, Popconfirm} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    getAdmin_Old_OldId,
    removeAdmin_FmId,
    setAdmin_Fm_OldId,
    setAdmin_Old_OldId
} from "@/utils/keep-alive";

const OldList: React.FC = () => {
    const [oldList, setOldList] = useState<Array<UserType>>([]);
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const exist_fmOld = useMemo(() => params.get('fid') !== null, [params.get('fid')]);
    const fetchOldList = async () => {
        let res
        if (exist_fmOld) {
            res = await reqGetOldListByFmId(params.get('fid')!)
        } else {
            res = await reqAdminFetchOldList()
        }
        if (res.data.success) {
            setOldList(res.data.data)
        }else {
            message.error(res.data.message)
        }
    }
    useEffect(() => {
        fetchOldList().then()
        if (!exist_fmOld) {
            const currentOldId = getAdmin_Old_OldId()
            // 页面缓存
            if (currentOldId !== undefined && currentOldId !== null) {
                navigate(`/home/oldDetail/${currentOldId}`, {state:{role: 'old'}})
            }
        }
    }, [params]);
    const getOldDetail = (oid: string) => {
        // 页面缓存
        if (exist_fmOld) {
            setAdmin_Fm_OldId(oid)
        } else {
            setAdmin_Old_OldId(oid)
        }
        navigate(`/home/oldDetail/${oid}`, {state:{role: 'fm'}})
    }
    const handleDeleteOldUser = async (item: UserType) => {
        const res = await reqDeleteOldUserById(item.oid!)
        if (res.data.success) {
            fetchOldList().then()
        }
    }
    return (
        <>
            {
                exist_fmOld && <span className='cursor-pointer' onClick={() => {
                    removeAdmin_FmId()
                    window.history.back();
                }}><i className="ri-arrow-left-line"></i>返回</span>
            }

            <ProCard title='老人列表'>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={oldList}
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
                                            description="您确定要删除这位用户吗（删除后同时解绑所有家属）?"
                                            onConfirm={() => handleDeleteOldUser(item)}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <span className='cursor-pointer hover:text-red'>删除用户</span>
                                        </Popconfirm>
                                    ]}
                                >
                                    <div className='flex-bc w-full'>
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
        </>
    )
}
export default OldList
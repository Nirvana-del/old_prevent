import React, {useEffect, useMemo, useState} from 'react'
import {FamilyInfo} from "@/pages/User/types";
import {Button, List, Popconfirm} from "antd";
import {reqUntieFamily} from "@/api/old_user/user";

type UnBindFmProp = {
    familyMsg: Array<FamilyInfo>,
    getOldFmMsg(): void,
    updateBindType(type: number): void
}
const UnbindFm: React.FC<UnBindFmProp> = (props) => {
    const handleListItemClick = (key:string ) => {
        const item = props.familyMsg.find(item => item.fphone === key)
        console.log(item)
        const fmData = {
            fphone: item!.fphone,
            name: item!.name
        } as Partial<FamilyInfo>
        reqUntieFamily(fmData).then((res) => {
            if (res.data.code === 200){
                props.getOldFmMsg()
            }
        })
    }
    const list = useMemo(() => {
        return props.familyMsg.map(item => {
            return {
                key: item.fphone,
                label: item.fphone,
                action: '解绑'
            }
        })
    }, [props.familyMsg]);
    return (
       <div className='flex-bc flex-col'>
           <List
               className='w-full mb-8'
               itemLayout="horizontal"
               dataSource={list}
               renderItem={(item) => {
                   return (
                       <List.Item
                           actions={[<span
                               className='text-blue cursor-pointer text-align-last'>
                             <Popconfirm
                                 title="解绑账号"
                                 description="您确定和这位亲属解除绑定吗?"
                                 onConfirm={() => handleListItemClick(item.key)}
                                 okText="确定"
                                 cancelText="取消"
                             >
                           {item.action}
                          </Popconfirm>
                            </span>]}
                       >
                           <div className='text-align-last'>{item.label}</div>
                       </List.Item>
                   )
               }}
           />
           <Button type="primary" onClick={() => props.updateBindType(1)}>添加其他家属</Button>
       </div>
    )
}
export default UnbindFm
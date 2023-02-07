import React, {useEffect, useState} from 'react';
import {Breadcrumb, List} from 'antd';
import BindFm from "@/pages/User/UserSetting/components/BindFm";
import {reqGetOldFmMsg} from "@/api/user";
import {FamilyInfo} from "@/pages/User/types";
import UnbindFm from "@/pages/User/UserSetting/components/UnbindFm";
import {connect} from "react-redux";

export interface DataType {
    key: string,
    label: string,
    action: string
}

enum BindType {
    'BIND_LIST' = 0,
    'BIND_FM' = 1,
    'BIND_EMAIL' = 2,
    'UNBIND_FM' = 3,
}
interface IProps {
    bindType: number,
    changeBindType: (bindType: number) => void
}
const AccountBinding: React.FC<IProps> = (props) => {
    const {bindType, changeBindType} = props
    console.log(bindType)
    // const [bindType, setBindType] = useState<number>(0);
    const [familyMsg, setFamilyMsg] = useState<Array<FamilyInfo>>([]);
    const updateBindType = (type: number) => {
        console.log(type)
        changeBindType(type)
    }
    const list: DataType[] = [
        {
            key: 'UNBIND_FM',
            label: '家属账号',
            action: '绑定/解绑'
        },
        {
            key: 'BIND_EMAIL',
            label: `邮箱`,
            action: '绑定邮箱'
        },
    ]
    const handleListItemClick = (key: string) => {
        changeBindType(BindType[key])
    }
    const getOldFmMsg = async () => {
        const res = await reqGetOldFmMsg()
        console.log(res.data)
        const {code, data} = res.data
        if (code === 200) {
            setFamilyMsg(data)
        }
    }
    useEffect(() => {
        getOldFmMsg().then()
    }, []);

    return (
        <div>
            <div className='flex-sc w-full ml-4'>
                <div className='w-full mr-20'>
                    <Breadcrumb className='mb-8'>
                        <Breadcrumb.Item>
                            <span
                                className={BindType['BIND_LIST'] === bindType ? '' : 'hover:text-blue cursor-pointer'}
                                onClick={() => changeBindType(0)}
                            >账号绑定</span>
                        </Breadcrumb.Item>
                        {
                            BindType['BIND_FM'] === bindType && (
                                <>
                                    <Breadcrumb.Item>
                                            <span className='hover:text-blue cursor-pointer'
                                                  onClick={() => changeBindType(3)}
                                            >账号关联</span>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                            <span className='hover:text-blue cursor-pointer'
                                                  onClick={() => changeBindType(1)}
                                            >绑定账号</span>
                                    </Breadcrumb.Item>
                                </>

                            )
                        }
                        {
                            BindType['UNBIND_FM'] === bindType && (
                                <Breadcrumb.Item>
                                            <span className='hover:text-blue cursor-pointer'
                                                  onClick={() => changeBindType(3)}
                                            >账号关联</span>
                                </Breadcrumb.Item>
                            )
                        }
                        {
                            BindType['BIND_EMAIL'] === bindType && (
                                <Breadcrumb.Item>
                            <span className='hover:text-blue cursor-pointer'
                                  onClick={() => changeBindType(2)}
                            >绑定邮箱</span>
                                </Breadcrumb.Item>
                            )
                        }
                    </Breadcrumb>
                    {
                        BindType['BIND_LIST'] === bindType && (
                            <List
                                itemLayout="horizontal"
                                dataSource={list}
                                renderItem={(item) => {
                                    return (
                                        <List.Item
                                            onClick={() => handleListItemClick(item.key)}
                                            actions={[<span
                                                className='text-blue cursor-pointer text-align-last'>{item.action}</span>]}
                                        >
                                            <div className='text-align-last'>{item.label}</div>
                                        </List.Item>
                                    )
                                }}
                            />
                        )
                    }
                    {
                        BindType['BIND_FM'] === bindType && (
                            <BindFm/>
                        )
                    }
                    {
                        BindType['UNBIND_FM'] === bindType && (
                            <UnbindFm familyMsg={familyMsg} getOldFmMsg={getOldFmMsg} updateBindType={updateBindType}/>
                        )
                    }

                </div>
            </div>
        </div>

    );
};
const mapStateToProps = (state: any) => {
    console.log(state)
    const {FamilyBindType:{bindType}} = state
    return {
        bindType
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeBindType: (bindType: number) => {
            dispatch({type: 'CHANGE_BIND_TYPE', payload: bindType})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountBinding)

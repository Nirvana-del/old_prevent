import React from 'react';
import {List} from 'antd';

interface DataType {
    label: string,
    action: string
}
const list:DataType[] = [
    {
        label: '家属账号',
        action: '绑定账号'
    },
    {
        label: `邮箱`,
        action: '绑定邮箱'
    },
]

const AccountBinding: React.FC = () => {
    return (
        <div>
            <div className='flex-sc w-full ml-4'>
                <div className='w-full mr-20'>
                    <h2 className={'text-xl font-medium mb-8 text-justify'}>账号绑定</h2>
                    <List
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={(item) => (
                            <List.Item
                                actions={[<span className='text-blue cursor-pointer'>{item.action}</span>]}
                            >
                                <div className='text-align-last'>{item.label}</div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>

    );
};

export default AccountBinding;
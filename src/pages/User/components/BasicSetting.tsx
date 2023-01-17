import React, {useEffect, useState} from 'react'
import {Avatar, Form, Input} from "antd";
import Cookie from "js-cookie";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const BasicSetting: React.FC = () => {
    // const [phone, setPhone] = useState('');
    const [form] = Form.useForm();
    useEffect(() => {
        const enUsername = Cookie.get('user_Name') || ''
        // setPhone(enUsername)
        form.setFieldsValue({
            phone: enUsername
        })
    },[])
    const props: UploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div className='flex-sc w-full ml-4'>
            <div className='w-1/2 mr-20'>
                <h2 className={'text-xl font-medium mb-16'}>基本设置</h2>
                <Form
                    form={form}
                    colon={false}
                    name="basic"
                    autoComplete="off"
                    labelWrap={true}
                >
                    <Form.Item
                        label="手机"
                        name="phone"
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        label="昵称"
                        name="nickname"
                    >
                        <Input allowClear value={'山上沙锅'}/>
                    </Form.Item>
                </Form>
            </div>
           <div className='basic-avatar'>
               <div>头像</div>
              <div className='flex-col flex-sc'>
                  <Avatar
                      className='mb-4'
                      size={{ xs: 48, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
                      src={'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}
                  />
                  <Upload {...props}>
                      <Button icon={<UploadOutlined />}>更换头像</Button>
                  </Upload>
              </div>
           </div>
        </div>
    )
}
export default BasicSetting
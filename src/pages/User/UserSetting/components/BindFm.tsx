import {Button, Form, Input, message} from 'antd';
import React, {ChangeEvent, FormEvent, useMemo, useState} from 'react'
import {NAME_RULE, PHONE_NUMBER_RULE} from "@/constant";
import {reqBindFamily} from "@/api/old_user/user";

const BindFm: React.FC = () => {
    const [fmPhone, setFmPhone] = useState<string>('');
    const [fmName, setFmName] = useState<string>('');
    const [bindForm] = Form.useForm()
    const onFinish = async () => {
        const bindMsg = {
            fphone: fmPhone,
            name: fmName
        }
        const res = await reqBindFamily(bindMsg)
        console.log(res)
        if (res.data.success) {
            message.success(res.data.message);
            bindForm.resetFields()
        } else {
            message.error(res.data.message)
        }
    }
    const submit_disable = useMemo(() => {
        return fmName === '' || fmPhone === ''
    }, [fmPhone, fmName]);
    return (
        <Form
            form={bindForm}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="家属姓名"
                name="fm_name"
                rules={[
                    {
                        pattern: NAME_RULE,
                        message: '姓名应为 2~4 个汉字',
                    }
                ]}
            >
                <Input className='w-2/3' value={fmName}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setFmName(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="家属电话"
                name="fm_phone"
                rules={[
                    {
                        pattern: PHONE_NUMBER_RULE,
                        message: '手机号格式错误',
                    }
                ]}
            >
                <Input className='w-2/3' value={fmPhone}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setFmPhone(e.target.value)}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8}}>
                <Button htmlType="submit" disabled={submit_disable} type={submit_disable ? 'default' : 'primary'}>
                    确认绑定
                </Button>
            </Form.Item>
        </Form>
    );
}
export default BindFm
import React, {useEffect, useState} from 'react'
import {Result} from "antd";
import {ResultStatusType} from "antd/es/result";
import {Outlet, useNavigate} from "react-router-dom";
import {useAuthWebsocket} from "@/components/hooks/useAuthWebsocket";
import {useAuthContext} from "@/components/hooks/useAuthContext";

const OldUser: React.FC = () => {
  const [old_status, setOld_status] = useState<ResultStatusType>('success');
  const [title, setTitle] = useState<string>('老人状况正常');
  const [subTitle, setSubTitle] = useState<string>('我们将时刻关注老人生活状况.');
  const {pathname} = useAuthContext()
  const navigate = useNavigate()
const handleWsChange = (msg: any) => {
  if (msg.data === '身体数据异常') {
    setOld_status('error')
    setTitle('老人身体状况异常！')
    setSubTitle('请立即关注')
  } else if (msg.data === '检测到跌倒') {
    setOld_status('error')
    setTitle('老人摔倒！')
    setSubTitle('请立即关注！')
  }
}
  useEffect(() => {
    // console.log(pathname)
    // console.log(pathname === '')
    if (pathname !== ''){
      navigate(pathname)
    }
    useAuthWebsocket(handleWsChange)
  }, []);

  return (
      <div className='text-3xl font-bold'>
        <Result
            status={old_status}
            title={title}
            subTitle={subTitle}
        />
        <Outlet/>
      </div>

  )
}
export default OldUser
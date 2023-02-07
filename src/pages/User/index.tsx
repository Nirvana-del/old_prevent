import React, {useEffect} from 'react'
import WithLoadingOutlet from "@/components/antd/WithLoadingOutlet";
import {useNavigate} from "react-router-dom";

const UserSetting: React.FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        // navigate('/user/center')
        navigate('/user/setting')
    }, [])
    return (
        <div>
          <WithLoadingOutlet />
        </div>
    )
}
export default UserSetting
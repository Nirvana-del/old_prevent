import React, {useEffect, useState} from 'react'
import {useLocation, useParams} from "react-router-dom";
import {reqFetchFamilyDataByOldId, reqFetchOldMessageByOldId} from "@/api/old_user/data";
import {OldMessageData, ScatterData, ScatterType} from "@/pages/Home/types";
import {useHandleOldMessage, useHandleScatterData} from "@/pages/Home/hooks";
import FamilyData from "@/pages/Home/components/FamilyData";
import OldMessage from "@/pages/Home/components/OldMessage";
import {removeAdmin_Fm_OldId, removeAdmin_Old_OldId} from "@/utils/keep-alive";

const OldDetail: React.FC = () => {
    const params = useParams()
    const location = useLocation()
    const oid = params.id!
    const [familyData, setFamilyData] = useState<Array<ScatterData>>([]);
    const [oldMessage, setOldMessage] = useState<Array<OldMessageData>>([]);
    const fetchFamilyData = () => {
        reqFetchFamilyDataByOldId(oid).then(res => {
            if (res.data.success) {
                let f_data = res.data.data
                setFamilyData(useHandleScatterData(f_data, ScatterType.rdist))
            }
        })
    }
    const fetchOldMessage = () => {
        reqFetchOldMessageByOldId(oid).then(res => {
            if (res.data.success) {
                let f_data = res.data.data
                setOldMessage(useHandleOldMessage(f_data))
            }
        })
    }
    useEffect(() => {
        fetchFamilyData()
    }, [])
    useEffect(() => {
        fetchOldMessage()
    }, [])

    return (
        <div>
            <span className='cursor-pointer' onClick={() => {
                location.state?.role === 'fm' ? removeAdmin_Fm_OldId() :
                    removeAdmin_Old_OldId()
                window.history.back();
            }}><i className="ri-arrow-left-line"></i>返回</span>
            <div className='mt-4'>
                <OldMessage oldInfo={oldMessage} fetchOldMessage={fetchOldMessage}/>
                <FamilyData familyList={familyData}/>
            </div>
        </div>
    )
}
export default OldDetail
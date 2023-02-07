import React, {useEffect, useState} from 'react'
import {ProCard} from "@ant-design/pro-components";
import WatchStatus from "@/pages/Home/components/WatchStatus";
import RadarStatus from "@/pages/Home/components/RadarStatus";
import {reqFetchEquipmentStatus} from "@/api/old_user/data";
import {useAuthWebsocket} from "@/components/hooks/useAuthWebsocket";
import {Col, Row} from "antd";

const EquipmentStatus: React.FC = () => {
    const [watchStatus, setWatchStatus] = useState<number>(0);
    const [radarStatus, setRadarStatus] = useState<number>(0);
    const getEquipmentStatus = async () => {
        const res = await reqFetchEquipmentStatus()
        const {code, data} = res.data
        if (code === 200) {
            setRadarStatus(data.radarStatus)
            setWatchStatus(data.watchStatus)
        }
    }
    useEffect(() => {
        getEquipmentStatus().then()
    }, [])
    useEffect(() => {
        useAuthWebsocket(getEquipmentStatus)
    }, []);

    return (
        <Row gutter={24} justify='space-around'>
            <Col span={12}>
                <ProCard className='mr-4' title='手环状态' tooltip="手环状态" size="small" bordered>
                    <WatchStatus watchStatus={watchStatus}/>
                </ProCard>
            </Col>
            <Col span={12}>
                <ProCard title='雷达状态' tooltip='雷达状态' size="small" bordered>
                    <RadarStatus radarStatus={radarStatus}/>
                </ProCard>
            </Col>
        </Row>
    )
}
export default EquipmentStatus
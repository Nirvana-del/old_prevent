import React, {useEffect, useRef, useState} from 'react'
import WatchStatus from "@/pages/Home/components/WatchStatus";
import RadarStatus from "@/pages/Home/components/RadarStatus";
import {ProCard} from '@ant-design/pro-components';
import FamilyData from "@/pages/Home/components/FamilyData";
import {reqFetchCloudData, reqFetchEquipmentStatus, reqFetchFamilyData, reqFetchOldMessage} from "@/api/data";
import {OldMessageData, ScatterData} from "@/pages/Home/types";
import CloudData from "@/pages/Home/components/CloudData";
import OldMessage from "@/pages/Home/components/OldMessage";
import {Result} from "antd";
import {ResultStatusType} from "antd/es/result";

const Home: React.FC = () => {
    const [watchStatus, setWatchStatus] = useState<number>(0);
    const [old_status, setOld_status] = useState<ResultStatusType>('success');
    const [radarStatus, setRadarStatus] = useState<number>(0);
    const [familyData, setFamilyData] = useState<Array<ScatterData>>([]);
    const [cloudData, setCloudData] = useState<Array<ScatterData>>([]);
    const [oldMessage, setOldMessage] = useState<Array<OldMessageData>>([]);
    const [title, setTitle] = useState<string>('老人状况正常');
    const [subTitle, setSubTitle] = useState<string>('我们将时刻关注老人生活状况.');
    const getEquipmentStatus = async () => {
        const res = await reqFetchEquipmentStatus()
        const {code, data} = res.data
        if (code === 200) {
            setRadarStatus(data.radarStatus)
            setWatchStatus(data.watchStatus)
        }
    }
    const getFamilyData = async () => {
        const res = await reqFetchFamilyData()
        let f_data = res.data.data
        let all_data = [] as Array<ScatterData>
        for (let i = 0; i < f_data.length; i++) {
            let a = []
            let angle = f_data[i].angle
            let dist = f_data[i].rdist
            const obj = {
                xField: Math.cos(angle * (Math.PI / 180)) * dist,
                yField: Math.sin(angle * (Math.PI / 180)) * dist
            } as ScatterData
            all_data.push(obj)
        }
        setFamilyData(all_data)
    }

    const getCloudData = async () => {
        const res = await reqFetchCloudData()
        let f_data = res.data.data
        let all_data = [] as Array<ScatterData>
        for (let i = 0; i < f_data.length; i++) {
            let a = []
            let angle = f_data[i].angle
            let dist = f_data[i].dist
            const obj = {
                xField: Math.cos(angle * (Math.PI / 180)) * dist,
                yField: Math.sin(angle * (Math.PI / 180)) * dist
            } as ScatterData
            all_data.push(obj)
        }
        setCloudData(all_data)
    }

    const getOldMessage = async () => {
        const res = await reqFetchOldMessage()
        let data = res.data.old_ph
        data.forEach((item: OldMessageData) => {
            item.temperatureLabel = '体温（摄氏度）'
            item.heartRateLabel = '心率（mmHg）'
        })
        setOldMessage(res.data.old_ph)
    }
    useEffect(() => {
        // setOld_status('error')
        // setTitle('老人身体状况异常！')
        // setSubTitle('请立即关注')
        // setOld_status('error')
        // setTitle('老人摔倒！')
        // setSubTitle('请立即关注！')
        if (typeof (WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        } else {
            let websocket = new WebSocket("ws://localhost:10050/ws");
            //打开事件
            websocket.onopen = function () {
                console.log("websocket已打开");
            }
            //发现消息进入
            websocket.onmessage = function (msg) {
                console.log("websocket已连接");
                console.log(msg.data);  // 第一次进去会显示：连接成功
                if (msg.data === '身体数据异常') {
                    setOld_status('error')
                    setTitle('老人身体状况异常！')
                    setSubTitle('请立即关注')
                } else if (msg.data === '检测到跌倒'){
                    setOld_status('error')
                    setTitle('老人摔倒！')
                    setSubTitle('请立即关注！')
                }

                // getFamilyData().then(() => {
                //     // 测试页面接收 websocket 响应后是否能够重新渲染
                //     // setFamilyData([{
                //     //     xField: 1,
                //     //     yField: 1
                //     // }])
                //     console.log('通过websocket重新获取')
                // })
                getCloudData().then(() => {
                    console.log('通过websocket重新获取')
                })
                getEquipmentStatus().then(() => {
                    // setWatchStatus(1)
                    // console.log(watchStatus)
                })
                getOldMessage().then(() => {
                    console.log('监听手表数据')
                })
            }
            //关闭事件
            websocket.onclose = function () {
                console.log("websocket已关闭");
            };
            //发生了错误事件
            websocket.onerror = function () {
                console.log("websocket发生了错误");
            }
        }
        return () => {

        };
    }, []);


    useEffect(() => {
        getEquipmentStatus().then()
    }, [])
    useEffect(() => {
        getFamilyData().then()
    }, [])
    useEffect(() => {
        getCloudData().then()
    }, [])
    useEffect(() => {
        getOldMessage().then()
    }, [])

    return (
        <div className='text-3xl font-bold px-4'>
            <Result
                status={old_status}
                title={title}
                subTitle={subTitle}
                // extra={[
                //     <Button type="primary" key="console">
                //         Go Console
                //     </Button>,
                //     <Button key="buy">Buy Again</Button>,
                // ]}
            />
            <ProCard className='mb-4 w-full' colSpan={24} ghost>
                <div className='flex-bc w-full'>
                    <ProCard className='mr-4' title='手环状态' colSpan={10} tooltip="手环状态" size="small" bordered>
                        <WatchStatus watchStatus={watchStatus}/>
                    </ProCard>
                    <ProCard title='雷达状态' colSpan={10} tooltip='雷达状态' size="small" bordered>
                        <RadarStatus radarStatus={radarStatus}/>
                    </ProCard>
                </div>
            </ProCard>
            <ProCard className='mb-4' title='人体点云信息' colSpan={24} tooltip='人体点云信息说明' bordered>
                <CloudData cloudData={cloudData}/>
            </ProCard>
            <ProCard className='mb-4' title='身体数据' colSpan={24} tooltip='身体数据说明' bordered>
                <OldMessage oldMessage={oldMessage}/>
            </ProCard>
            <ProCard className='mb-4' title='家庭地形' colSpan={24} tooltip='身体数据说明' bordered>
                <FamilyData familyData={familyData}/>
            </ProCard>
        </div>

    )
}
export default Home
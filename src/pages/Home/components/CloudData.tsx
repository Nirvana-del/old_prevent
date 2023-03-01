import React, {useState, useEffect, useMemo} from 'react';
import {ScatterConfig, Scatter} from '@ant-design/charts';
import {OldMessageData, ScatterData, ScatterType} from "@/pages/Home/types";
import {reqFetchCloudData, reqFetchFamilyData} from "@/api/old_user/data";
import {ProCard} from "@ant-design/pro-components";
import {useAuthWebsocket} from "@/components/hooks/useAuthWebsocket";
import {useHandleScatterData} from "@/pages/Home/hooks";
export enum extraType {
    'cloudData' = '人体点云信息',
    'familyData' = '家庭地形数据'
}
const CloudData = () => {
    const [cloudData, setCloudData] = useState<Array<ScatterData>>([]);
    const [familyData, setFamilyData] = useState<Array<ScatterData>>([]);
    const getFamilyData = async () => {
        const res = await reqFetchFamilyData()
        let f_data = res.data.data
        const resArr = useHandleScatterData(f_data, ScatterType.rdist, extraType.familyData)
        setFamilyData(resArr)
    }
    const getCloudData = async () => {
        const res = await reqFetchCloudData()
        let f_data = res.data.data
        console.log(f_data)
        const resArr = useHandleScatterData(f_data, ScatterType.dist, extraType.cloudData)
        setCloudData(resArr)
    }
    useEffect(() => {
        getCloudData().then()
    }, [])
    useEffect(() => {
        getFamilyData().then()
    }, [])
    useEffect(() => {
        useAuthWebsocket(getCloudData)
    }, []);

    const scatterData = useMemo(() => {
        return [...cloudData, ...familyData]
    }, [cloudData, familyData]);
    const config: ScatterConfig = {
        appendPadding: 30,
        data: scatterData,
        xField: 'x坐标',
        yField: 'y坐标',
        shape: 'circle',
        colorField: 'extraType',
        pointStyle: {
            fillOpacity: 1,
        },
        yAxis: {
            nice: true,
            line: {
                style: {
                    stroke: '#aaa',
                },
            },
        },
        xAxis: {
            grid: {
                line: {
                    style: {
                        stroke: '#aaa'
                    },
                },
            },
            line: {
                style: {
                    stroke: '#aaa',
                },
            },
        },
    };

    return <>
        <ProCard className='mb-4' title='人体点云信息' colSpan={24} tooltip='人体点云信息说明' bordered>
            <Scatter {...config} />
        </ProCard>
    </>;
};
export default CloudData
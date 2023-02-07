import React, {useState, useEffect} from 'react';
import {OldMessageData} from "@/pages/Home/types";
import {DualAxesConfig, DualAxes} from '@ant-design/charts';
import {ProCard} from '@ant-design/pro-components';
import {reqFetchOldMessage} from "@/api/old_user/data";
import {useAuthWebsocket} from "@/components/hooks/useAuthWebsocket";
import {useHandleOldMessage} from "@/pages/Home/hooks";

interface IProps {
    oldInfo?: Array<OldMessageData>,
    fetchOldMessage?: () => void
}
const OldMessage: React.FC<IProps> = (props) => {
    const {oldInfo, fetchOldMessage} = props

    const [oldMessage, setOldMessage] = useState<Array<OldMessageData>>([]);
    const getOldMessage = async () => {
        const res = await reqFetchOldMessage()
        let data = res.data.old_ph
        setOldMessage(useHandleOldMessage(data))
    }
    useEffect(() => {
        if (oldInfo !== undefined) {
            setOldMessage(oldInfo)
        } else {
            getOldMessage().then()
        }
    }, [props.oldInfo])
    useEffect(() => {
        if (fetchOldMessage !== undefined){
            useAuthWebsocket(fetchOldMessage)
        }else {
            useAuthWebsocket(getOldMessage)
        }
    }, []);

    const config: DualAxesConfig = {
        data: [oldMessage, oldMessage],
        xField: 'time',
        yField: ['heartRate', 'temperature'],
        geometryOptions: [
            {
                geometry: 'line',
                seriesField: 'heartRateLabel',
                smooth: false,
                color: '#5B8FF9',
                label: {
                    formatter: (datum: Partial<OldMessageData>) => {
                        return `${datum.heartRate}`;
                    },
                },
                lineStyle: {
                    lineWidth: 3,
                    lineDash: [5, 5],
                },
            },
            {
                geometry: 'line',
                seriesField: 'temperatureLabel',
                isStack: true,
                smooth: true,
                color: '#5AD8A6',
                lineStyle: {
                    lineWidth: 4,
                    opacity: 1,
                },
                label: {
                    formatter: (datum: Partial<OldMessageData>) => {
                        return `${datum.temperature}°`;
                    },
                },
                point: {
                    shape: 'circle',
                    size: 4,
                    style: {
                        opacity: 0.5,
                        stroke: '#5AD8A6',
                        fill: '#fff',
                    },
                },
            },
        ],
    };

    return <>
        <ProCard className='mb-4' title='身体数据' colSpan={24} tooltip='身体数据说明' bordered>
            <DualAxes {...config} />
        </ProCard>
    </>;
};
export default OldMessage


import React, {useEffect, useState} from 'react';
import {Scatter, ScatterConfig} from '@ant-design/charts';
import {ScatterData, ScatterType} from "@/pages/Home/types";
import {ProCard} from "@ant-design/pro-components";
import {reqFetchFamilyData} from "@/api/old_user/data";
import {useHandleScatterData} from "@/pages/Home/hooks";

interface IProps {
    familyList?: Array<ScatterData>
}
const FamilyData:React.FC<IProps> = (props) => {
    const [familyData, setFamilyData] = useState<Array<ScatterData>>([]);
    const getFamilyData = async () => {
        const res = await reqFetchFamilyData()
        let f_data = res.data.data
        const resArr = useHandleScatterData(f_data, ScatterType.rdist)
        setFamilyData(resArr)
    }
    useEffect(() => {
        const {familyList} = props
        if (familyList !== undefined){
            setFamilyData(familyList)
        } else {
            getFamilyData().then()
        }
    }, [props])
    const config: ScatterConfig = {
        appendPadding: 30,
        data: familyData,
        xField: 'x坐标',
        yField: 'y坐标',
        shape: 'circle',
        colorField: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff',
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
        <ProCard className='mb-4' title='家庭地形' colSpan={24} tooltip='身体数据说明' bordered>
            <Scatter {...config} />
        </ProCard>
    </>
        ;
};
export default FamilyData
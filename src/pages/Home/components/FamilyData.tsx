import React, { useState, useEffect } from 'react';
import { ScatterConfig, Scatter } from '@ant-design/charts';
import {ScatterData} from "@/pages/Home/types";
type FamilyDataProp = {
    familyData: Array<ScatterData>
}
const FamilyData = (props: FamilyDataProp) => {
    const config: ScatterConfig = {
        appendPadding: 30,
        data: props.familyData,
        xField: 'xField',
        yField: 'yField',
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

    return <Scatter {...config} />;
};
export default FamilyData
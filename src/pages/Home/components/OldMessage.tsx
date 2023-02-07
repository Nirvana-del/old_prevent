import React, { useState, useEffect } from 'react';
import {OldMessageData} from "@/pages/Home/types";
import { DualAxesConfig, DualAxes } from '@ant-design/charts';
type OldMessageProp = {
  oldMessage: Array<OldMessageData>
}
const OldMessage = (props: OldMessageProp) => {
  // const [data, setData] = useState([]);
  // console.log(props)
  // useEffect(() => {
  //   asyncFetch();
  // }, []);
  //
  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
  //       .then((response) => response.json())
  //       .then((json) => {
  //         console.log(json)
  //         setData(json)
  //       })
  //       .catch((error) => {
  //         console.log('fetch data failed', error);
  //       });
  // };
  const config: DualAxesConfig = {
    data: [props.oldMessage, props.oldMessage],
    xField: 'time',
    yField: ['heartRate', 'temperature'],
    geometryOptions: [
      {
        geometry: 'line',
        seriesField:'heartRateLabel',
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
        seriesField:'temperatureLabel',
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

  return <DualAxes {...config} />;
};
export default OldMessage


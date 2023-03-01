import {OldMessageData, ScatterData, ScatterType} from "@/pages/Home/types";
import {extraType} from "@/pages/Home/components/CloudData";

// 处理地形图数据
export const useHandleScatterData = (familyData: Array<any>, type: ScatterType, extraType: extraType): Array<ScatterData> => {
    let all_data = [] as Array<ScatterData>
    for (let i = 0; i < familyData.length; i++) {
        let angle = familyData[i].angle
        let dist = familyData[i][type]
        const obj = {
            'x坐标': Math.cos(angle * (Math.PI / 180)) * dist,
            'y坐标': Math.sin(angle * (Math.PI / 180)) * dist,
            extraType
        } as ScatterData
        all_data.push(obj)
    }
    return all_data
}
export const useHandleOldMessage = (oldMessage: Array<any>) => {
    return oldMessage.map((item: OldMessageData) => ({
        ...item,
        temperatureLabel: '体温（摄氏度）',
        heartRateLabel: '心率（mmHg）'
    }))
}
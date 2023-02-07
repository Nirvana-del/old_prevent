export type ScatterData = {
    'x坐标': number,
    // xLabel: string,
    'y坐标': number,
    // yLabel: string
}
export type OldMessageData = {
    fall: number,
    heartRate: string,
    id: number,
    temperature: string,
    time: string,
    heartRateLabel?: string,
    temperatureLabel?: string
}

export enum ScatterType {
    dist= 'dist',
    rdist = 'rdist'
}

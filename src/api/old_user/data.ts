import request from "@/utils/request";

// 获取设备状态
export const reqFetchEquipmentStatus = () => {
    return request({
        method: 'post',
        url:'/radarStatus/getradarStatus'
    })
}
// 获取家庭地形数据
export const reqFetchFamilyData = () => {
    return request({
        method: 'get',
        url:'/familyData/getFamily'
    })
}
// 获取人体点云数据
export const reqFetchCloudData = () => {
    return request({
        method: 'get',
        url:'/cloudData/getcloudData'
    })
}
// 获取老人身体数据
export const reqFetchOldMessage = () => {
    return request({
        method: 'post',
        url:'/oldPh/getMessage'
    })
}
// 通过老人 id 获取家庭地形
export const reqFetchFamilyDataByOldId = (oid: string) => {
    return request({
        method: 'post',
        url:'/familyData/oldGetFamilyData',
        data: {
            oid
        }
    })
}
// 通过老人 id 获取老人身体数据
export const reqFetchOldMessageByOldId = (oid: string) => {
    return request({
        method: 'post',
        url:'/oldPh/getOldData',
        data: {
            oid
        }
    })
}
import request from "@/utils/request";

export const reqFetchEquipmentStatus = () => {
    return request({
        method: 'post',
        url:'/radarStatus/getradarStatus'
    })
}

export const reqFetchFamilyData = () => {
    return request({
        method: 'get',
        url:'/familyData/getFamily'
    })
}
export const reqFetchCloudData = () => {
    return request({
        method: 'get',
        url:'/cloudData/getcloudData'
    })
}
export const reqFetchOldMessage = () => {
    return request({
        method: 'post',
        url:'/oldPh/getMessage'
    })
}
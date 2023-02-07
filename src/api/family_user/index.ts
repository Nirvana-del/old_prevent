//家属登录
import {FmLoginType} from "@/pages/Login/types";
import request from "@/utils/request";

export const reqFmLogin = (loginMsg: FmLoginType) => {
    return request({
        method: 'post',
        url:'/fmUser/login/status',
        data:{
            ...loginMsg
        }
    })
}
export const reqGetOldListByFmId = (fid: string) => {
    return request({
        method: 'post',
        url:'/fmUser/getOldList',
        data:{
            fid
        }
    })
}
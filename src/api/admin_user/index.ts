// 管理员登录
import {AdminLoginType} from "@/pages/Login/types";
import request from "@/utils/request";

export const reqAdminLogin = (loginMsg: AdminLoginType) => request.post('/controllUser/login', {
    ...loginMsg
})
export const reqAdminFetchOldList = () => request.post('/oldUser/oldList')

export const reqAdminFetchFmList = () => request.post('/fmUser/familyList')

export const reqGetOldListByFmId = (fid: string) => request.post('/fmUser/getOldList',{
    fid
})

export const reqDeleteOldUserById = (oid: string) => request.post('/oldUser/deleteOldUser',{
    oid
})

export const reqDeleteFmUserById = (fid: string) => request.post('/fmUser/deleteFmUser',{
    fid
})

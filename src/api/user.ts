import {FmLoginType, RegisterType} from "@/pages/Login/types";
import request from "@/utils/request";
//家属登录
export const reqFmLogin = (loginMsg: FmLoginType) => {
    return request({
        method: 'post',
        url:'/fmUser/login/status',
        data:{
            ...loginMsg
        }
    })
}
// 老人登录
export const reqOldLogin = (loginMsg: any) => {
    return request({
        method: 'post',
        url:'/oldUser/login/status',
        data:{
            ...loginMsg
        }
    })
}
// 获取老人的家属信息
export const reqGetOldFmMsg = () => request.get('/oldFamily/getFamilyMessage')
// 老人绑定家属账号
export const reqBindFamily = (fmMsg: any) => {
    return request({
        method: 'post',
        url:'/oldFamily/bindFamily',
        data:{
            ...fmMsg
        }
    })
}
// 老人解除家属绑定
export const reqUntieFamily = (fmMsg: any) => {
    return request({
        method: 'post',
        url:'/oldFamily/untieFamily',
        data:{
            ...fmMsg
        }
    })
}
// 获取老人身体数据
export const reqGetOldDataMsg = () => request.get('/oldPh/getMessage')
// 用户注册
export const reqRegister = (registerMsg: RegisterType) => {
    return request({
        method: 'post',
        url:'/register/status',
        data:{
            ...registerMsg
        }
    })
}
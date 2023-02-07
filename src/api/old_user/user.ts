import {AdminLoginType, FmLoginType, RegisterType} from "@/pages/Login/types";
import request from "@/utils/request";
import {FamilyInfo} from "@/pages/User/types";

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
export const reqUntieFamily = (fmMsg: Partial<FamilyInfo>) => {
    return request({
        method: 'post',
        url:'/oldFamily/untieFamily',
        data:{
            ...fmMsg
        }
    })
}

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

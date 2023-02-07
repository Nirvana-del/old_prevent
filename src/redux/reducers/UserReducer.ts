import {UserType} from "@/types/user";

export const UserInfo = (prevState = {
    userMsg: {} as UserType
}, action: { type: string, payload: UserType }) => {
    const { type, payload } = action
    switch (type) {
        case 'SET_USER_INFO':
            let newState = { ...prevState }
            newState.userMsg = payload
            return newState
        default: return prevState
    }
}
// 实现个人设置 keep-alive 效果
export const UserSetting = (prevState = {
    activeKey: '1'
}, action: { type: string, payload: string }) => {
    const { type, payload } = action
    switch (type) {
        case 'CHANGE_TAB_PAGE':
            let newState = { ...prevState }
            newState.activeKey = payload
            return newState
        default: return prevState
    }
}
export const FamilyBindType = (prevState = {
    bindType: 0
}, action: { type: string, payload: number }) => {
    const { type, payload } = action
    switch (type) {
        case 'CHANGE_BIND_TYPE':
            let newState = { ...prevState }
            newState.bindType = payload
            return newState
        default: return prevState
    }
}

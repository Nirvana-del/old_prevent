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

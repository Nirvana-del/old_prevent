// 发送请求前后的 loading 效果
export const LoadingState = (prevState = {
    status: false
}, action: { type: string, payload: boolean }) => {
    const { type, payload } = action
    switch (type) {
        case 'CHANGE_LOADING':
            let newState = { ...prevState }
            newState.status = payload
            return newState
        default: return prevState
    }
}
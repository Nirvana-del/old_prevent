// 发送请求前后的 loading 效果
export const HandlePathname = (prevState = {
    pathname: ''
}, action: { type: string, payload: string }) => {
    const { type, payload } = action
    switch (type) {
        case 'CHANGE_PATHNAME':
            let newState = { ...prevState }
            newState.pathname = payload
            return newState
        default: return prevState
    }
}
// 实现权限控制
import {RoleMap} from "@/types/user";

export const AuthorityType = (prevState = {
   roleType: RoleMap.OLD
}, action: { type: string, payload: RoleMap }) => {
    const { type, payload } = action
    switch (type) {
        case 'SET_ROLE_TYPE':
            let newState = { ...prevState }
            newState.roleType = payload
            return newState
        default: return prevState
    }
}
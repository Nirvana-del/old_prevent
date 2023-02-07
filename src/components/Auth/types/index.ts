import {RoleMap, UserType} from "@/types/user";

export interface AuthProviderValue {
    userInfo: Partial<UserType>,
    changeUserInfo: ( userMsg: UserType) => void,
    pathname: string,
    changePathname: (pathString: string) => void
}
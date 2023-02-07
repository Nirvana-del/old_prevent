export interface User {
    phone: string,
    role: number // 0 或者 1
}

export enum RoleMap {
    'OLD' = '1', // 老人
    'FAMILY' = '2' // 家属
}

export interface FamilyInfo {
    fid: string,
    fphone: string,
    name: string,
    password: string
}

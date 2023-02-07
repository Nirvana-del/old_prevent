export enum RoleMap {
    OLD = 'OLD', // 老人
    FAMILY = 'FAMILY', // 家属
    ADMIN = 'ADMIN'
}

export enum NameMap {
    OLD = '老人', // 老人
    FAMILY = '家属', // 家属
    ADMIN = '管理员'
}
export interface UserType {
    oid?: string,
    fid?: string,
    phone?: string,
    fphone?: string,
    name?: string,
    roleType: RoleMap
}
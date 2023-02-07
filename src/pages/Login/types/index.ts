export interface RegisterType {
    phone: string,
    password: string,
    name: string,
    type: number
}

export interface FmLoginType {
    fphone: string,
    password: string
}

export interface OldLoginType {
    phone: string,
    password: string
}

export interface AdminLoginType {
    cphone: string,
    cpassword: string
}
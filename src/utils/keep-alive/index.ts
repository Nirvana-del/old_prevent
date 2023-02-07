export const setAdmin_FmId = (fid: string) => {
    localStorage.setItem('admin_fmId', fid)
}

export const getAdmin_FmId = () => {
    return localStorage.getItem('admin_fmId')
}

export const removeAdmin_FmId = () => {
    localStorage.removeItem('admin_fmId')
}

export const setAdmin_Fm_OldId = (oid: string) => {
    localStorage.setItem('admin_fmPage_oldId', oid)
}

export const getAdmin_Fm_OldId = () => {
    return localStorage.getItem('admin_fmPage_oldId')
}

export const removeAdmin_Fm_OldId = () => {
    localStorage.removeItem('admin_fmPage_oldId')
}

export const setAdmin_Old_OldId = (oid: string) => {
    localStorage.setItem('admin_oldPage_oldId', oid)
}

export const getAdmin_Old_OldId = () => {
    return localStorage.getItem('admin_oldPage_oldId')
}

export const removeAdmin_Old_OldId = () => {
    localStorage.removeItem('admin_oldPage_oldId')
}

export const setThemeStyle = (themeStyle: object) => {
    localStorage.setItem('themeStyle', JSON.stringify(themeStyle))
}
''
export const getThemeStyle = () => {
    const defaultSetting = {
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: true
    }
    return JSON.parse(localStorage.getItem('themeStyle') || JSON.stringify(defaultSetting))
}

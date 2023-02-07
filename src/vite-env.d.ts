/// <reference types="vite/client" />
declare module 'nprogress'
declare module 'js-cookie'
declare module '@emotion/css'
declare module 'crypto-js'
declare module '@ant-design/pro-layout/lib/typings'

interface ImportMetaEnv {
    readonly VITE_APP_BASE_API : string
    readonly VITE_WS_BASE_API : string
    readonly VITE_APP_REAL_API : string
    readonly VITE_WS_REAL_API : string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

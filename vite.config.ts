import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default ({mode}) => {
    const env = loadEnv(mode, process.cwd())
    console.log(env)
    return defineConfig({
        // envDir:  "env",
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, './src')
            }
        },
        server: {
            // host: '0.0.0.0',//使用当前的IP地址，没有这个就是以localhost作为本地地址
            // port: 3000, //端口号为3000
            // open: false, //是否在默认浏览器中自动打开该地址
            proxy: { //使用代理
                [env.VITE_APP_BASE_API]: { //当有 /api开头的地址是，代理到target地址
                    target: env.VITE_APP_REAL_API, // 需要跨域代理的本地路径
                    changeOrigin: true, //是否改变请求源头
                    rewrite: path => {
                        const apiString = env.VITE_APP_BASE_API
                        const envApi = new RegExp(apiString, 'g')
                        return path.replace(envApi, '')
                    } // 路径重写
                },
                // [loadEnv(mode, process.cwd()).VITE_WS_BASE_API]: { //当有 /socket.io开头的地址是，代理到target地址
                //     target: loadEnv(mode, process.cwd()).VITE_WS_REAL_API, // 需要跨域代理的本地路径
                //     changeOrigin: true, //是否改变请求源头
                //     ws: true
                //     // rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
                // },
            }
        }
    })

}

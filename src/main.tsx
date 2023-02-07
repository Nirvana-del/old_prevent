import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 导入重置样式
import "@/style/reset.scss"
import '@/app.scss'
// 引入 remixicon.css
import 'remixicon/fonts/remixicon.css'
// 导入公共样式
import "@/style/index.scss";
// 引入 tailwind.css
import "@/style/tailwind.css";
// 引入 Charts 样式
// import "@ant-design/flowchart/dist/index.css";
import 'animate.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)

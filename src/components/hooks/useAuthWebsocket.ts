export const useAuthWebsocket = (fn: Function) => {
    if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    } else {
        let wsURL
        if (import.meta.env.MODE === 'development'){
            wsURL = import.meta.env.VITE_WS_REAL_API
        }else {
            wsURL = import.meta.env.VITE_PRODUCTION_WS_REAL_API
        }
        let websocket = new WebSocket(wsURL);
        //打开事件
        websocket.onopen = function () {
            console.log("websocket已打开");
        }
        //发现消息进入
        websocket.onmessage = function (msg) {
            console.log("websocket已连接");
            console.log(msg.data);  // 第一次进去会显示：连接成功
            fn(msg.data)
        }
        //关闭事件
        websocket.onclose = function () {
            console.log("websocket已关闭");
        };
        //发生了错误事件
        websocket.onerror = function () {
            console.log("websocket发生了错误");
        }
    }
}
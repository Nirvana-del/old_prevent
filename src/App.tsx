import AppRouter from "@/router";
import {BrowserRouter} from 'react-router-dom';
import AuthRoute from "@/components/Auth/AuthRoute";
import {useEffect} from "react";
import {Provider} from "react-redux"
import {persistor, store} from "@/redux";
import {PersistGate} from "redux-persist/integration/react";
import AuthProvider from "@/components/Auth/AuthProvider";

const App = () => {
    useEffect(() => {
        let ele = document.getElementById('Loading');
        if (ele) {
            document.body.removeChild(ele);
        }
    }, [])
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <AuthProvider>
                            <AuthRoute>
                                <AppRouter/>
                            </AuthRoute>
                        </AuthProvider>
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </div>
    )
}

export default App

import {combineReducers, legacy_createStore as createStore} from "redux";

import {UserSetting, FamilyBindType} from "./reducers/UserSettingReducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['LoadingReducer']
}
const reducer = combineReducers({
    UserSetting,
    FamilyBindType
})
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)
export {
    store,
    persistor
}


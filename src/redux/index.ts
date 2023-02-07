import {combineReducers, legacy_createStore as createStore} from "redux";
import {UserSetting, FamilyBindType, UserInfo} from "./reducers/UserReducer";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {AuthorityType} from "@/redux/reducers/AuthorityReducer";
import {LoadingState} from "@/redux/reducers/LoadingReducer";
import {HandlePathname} from "@/redux/reducers/GlobalSettingReducer";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['LoadingState']
}
const reducer = combineReducers({
    UserSetting,
    FamilyBindType,
    AuthorityType,
    LoadingState,
    UserInfo,
    HandlePathname
})
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)
export {
    store,
    persistor
}


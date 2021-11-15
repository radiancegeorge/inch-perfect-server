import  combineReducers  from './'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

export const persisited = persistReducer(persistConfig, combineReducers)
export default persistStore

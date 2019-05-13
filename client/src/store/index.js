import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers/'
import reduxThunk from 'redux-thunk'
import {loadStore , saveStore } from './localStorage'
import {throttle} from 'lodash'
export default function configureStore(){
    const persistedState = loadStore()
    const store = createStore(reducers, persistedState,applyMiddleware(reduxThunk))
    store.subscribe(throttle(() => {
        saveStore({
            token: store.getState().token
        })
    }), 1000) 
    return store
}
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/index'
import App from './components/App'
import '@fortawesome/fontawesome-pro'
import '@fortawesome/fontawesome-pro/css/all.css'
import './stylesheet/main.css'

const store = configureStore();
ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
    document.querySelector('#root')
)
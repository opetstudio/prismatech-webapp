import React from 'react'
import ReactDOM from 'react-dom'
import { config } from 'dotenv'
import './index.css'
// import App from './App'
import App from './Containers/Adminlte'
import * as serviceWorker from './serviceWorker'

config()

ReactDOM.render(App({ reducer: {} }), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

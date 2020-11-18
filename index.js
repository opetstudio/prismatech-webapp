// import React from 'react'
// import App from './src/Containers/Adminlte'

import { modulePageLogin } from './src/Pages/Login/PageLogin'

// const ProgressBar = props => {
//     return <div><span>hallowww</span></div>
// }

export default () => {
  return {
    feature: {
      login: {
        loginPage: modulePageLogin
      }
    }
  }
}

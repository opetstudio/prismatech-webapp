import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { isEmpty, isNil } from 'ramda'
import { injectIntl } from 'react-intl'
// import LoginActions, { LoginSelectors } from './redux'
import LoginContainer from '../../Containers/Login/LoginContainer'
import AppConfig from '../../Config/AppConfig'

class PageLogin extends Component {
  isEmptyOrNull (str) {
    return isEmpty(str) || isNil(str)
  }

  state={
    isLoading: false
  }

  // componentWillMount()
  // {
  //   this.setState({isLoading:true})
  //   setTimeout(()=>{
  //     this.setState({isLoading:false})
  //   },3000)
  // }
  render () {
    const { history } = this.props
    return (
      <>
        <Helmet>
          {/* <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css" />
          <link rel="stylesheet" href="/dist/css/adminlte.min.css" /> */}
          <title>Masuk</title>
          <body className='hold-transition login-page' />
        </Helmet>
        <div className='login-box'>
          <div className='card'>
            <div className='card-body login-card-body'>
              <p className='login-box-msg'><b>{AppConfig.appName}</b></p>
              <LoginContainer history={history} location={this.props.location} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default injectIntl(PageLogin)

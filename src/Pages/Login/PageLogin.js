import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { isEmpty, isNil } from 'ramda'
import { injectIntl } from 'react-intl'
// import LoginActions, { LoginSelectors } from './redux'
import LoginContainer from '../../Containers/Login/LoginContainer'
import { Colors } from '../../Themes'
import Loader from '../../Components/Loader/Loader'
import LoaderFull from '../../Components/Loader/LoaderFull'

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
    return (
      <div className='login-box'>
        <Helmet>
          <title>Masuk</title>
          <body className='hold-transition login-page' />
        </Helmet>
        <div className='card'>
          <div className='card-body login-card-body'>
            <p className='login-box-msg'><b>Plink Market</b></p>
            <LoginContainer location={this.props.location} />
          </div>
        </div>
      </div>
    )
  }
}
export default injectIntl(PageLogin)

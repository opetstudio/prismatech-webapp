import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { isEmpty, isNil } from 'ramda'
import { injectIntl } from 'react-intl'
// import LoginActions, { LoginSelectors } from './redux'
import ForgetPassword from '../../Containers/ForgetPassword'
import { Colors } from '../../Themes'

class PageLogin extends Component {
  isEmptyOrNull (str) {
    return isEmpty(str) || isNil(str)
  }

  render () {
    return (
      <div className='login-box'>
        <Helmet>
          <title>Lupa Kata Sandi</title>
          <body className='hold-transition login-page' />
        </Helmet>
        <ForgetPassword />
      </div>
    )
  }
}
export default injectIntl(PageLogin)

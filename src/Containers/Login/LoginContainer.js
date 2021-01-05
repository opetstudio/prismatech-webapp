import React from 'react'
import { connect } from 'react-redux'
import LoginActions, { LoginSelectors } from './redux'
import { isLoggedIn } from '../../Utils/Utils'
import LoginComponent from './LoginComponent'
import { injectIntl } from 'react-intl'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

class TheComponent extends React.PureComponent {
  componentDidMount () {
    // const force = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).force
    // if (force === 'y') {
    //   window.localStorage.removeItem(AppConfig.sessionData)
    //   window.open(`${basePath}/login`, '_self', true)
    // }
    console.log("didmout")
    this.props.resetForm()
  }
  
  render () {
    
    // console.log('render')
    if (isLoggedIn(this.props.isLoggedIn) !== true) return (<LoginComponent {...this.props} />)
    // if (isLoggedIn(this.props.isLoggedIn) !== true) return null
    // else return null
    else return window.open(`${basePath}${AppConfig.appHomePage}`, '_self', true)
    // else return window.open(`${basePath}${AppConfig.appHomePage}/${getAccessToken(this.props.sessionToken)}`, '_self', true)
  }
}

// const TheComponent = props => {
//   // else window.location.assign = '/'
//   // else window.location.reload(true)
//   // else window.open('http://localhost:3000/', '_self', true)
//   else {
//     console.log('doing click')
//     document.getElementById('gotohome').click()
//   }
//   // else window.location.replace('http://localhost:3000/home')
//   //gotohome
// }
const mapStateToProps = (state, ownProps) => {
  // const isLoggedIn = LoginSelectors.isLoggedIn(state.login)
  // console.log('mapStateToProps isLoggedIn=', isLoggedIn)
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    isRequesting: LoginSelectors.isRequesting(state.login),
    sessionToken: LoginSelectors.sessionToken(state.login),
    formSubmitMessage: LoginSelectors.getFormSubmitMessage(state.login),
    responseMessage: LoginSelectors.responseMessage(state.login),
    responseDescription: LoginSelectors.responseDescription(state.login),
    responseCode: LoginSelectors.responseCode(state.login)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetForm: data => dispatch(LoginActions.loginReset(data)), 
    loginDoLogin: data => dispatch(LoginActions.loginDoLogin(data)),
    loginPatch: data => dispatch(LoginActions.loginPatch(data)),
    logout: data => dispatch(LoginActions.logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))

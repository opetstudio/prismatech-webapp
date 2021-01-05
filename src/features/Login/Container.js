
import React from 'react'
import LoginActions, { LoginSelectors } from '../../Containers/Login/redux'
import LoginPage from './PageLogin'
import { isLoggedIn } from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

class Container extends React.Component {
  componentDidMount () {
    // this.props.resetForm()
  }

  render () {
    const props = this.props
    const { loginPatch, loginDoLogin, email, password } = props
    // (props.React || React).useEffect(() => {
    //   // Update the document title using the browser API
    //   // document.title = `You clicked ${count} times`;
    // })
    // props.resetForm()
    console.log('props=====>', props)
    if (isLoggedIn(props.isLoggedIn) !== true) {
      return (
        <LoginPage
          {...props}
          valueOnChange={({ name, value }) => loginPatch({ [name]: value })}
          formOnSubmit={({ e }) => {
            console.log('formOnSubmit===>', e)
            if (e) e.preventDefault()
            console.log('formOnSubmit email===>', email)
            loginDoLogin({ email, password })
          }}
        />)
    } else return window.open(`${basePath}${AppConfig.appHomePage}`, '_self', true)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    email: state.login.email,
    password: state.login.password,
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

function LoginContainer ({ connect }) {
  return connect(mapStateToProps, mapDispatchToProps)(Container)
}

export default LoginContainer

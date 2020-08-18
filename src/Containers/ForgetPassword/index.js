import React from 'react'
import { connect } from 'react-redux'
import ForgetPassword from '../../Components/ForgetPassword/ForgetPasswordComponent'
import { isLoggedIn } from '../../Utils/Utils'
import LoginActions, { LoginSelectors } from '../Login/redux'
import ForgetActions from './redux'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const TheComponent = props => {
  console.log('pass container>>>>>>>>', props.new_password)
  if (isLoggedIn(props.isLoggedIn) !== true) { return <ForgetPassword {...props} /> } else window.open(`${basePath}/`, '_self')
}

const mapStateToProps = (state, ownProps) => {
  return {
    new_password: state.rpforgetpassword.new_password,
    otpRefNum: state.rpforgetpassword.otpRefNum,
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    errors: state.rpforgetpassword.errors,
    status: state.rpforgetpassword.status,
    isRequest: state.rpforgetpassword.isRequesting,
    email: state.rpforgetpassword.email,
    isResult: state.rpforgetpassword.isResult,
    page: state.rpforgetpassword.page
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNewPassword: data => dispatch(ForgetActions.setNewPassword(data)),
    setPage: data => dispatch(ForgetActions.doForgetSetPage(data)),
    doForget: data => dispatch(ForgetActions.doForgetPass(data)),
    doConfirmForget: data => dispatch(ForgetActions.doConfirmForgetPass(data)),
    reset: data => dispatch(ForgetActions.doForgetPassReset(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)

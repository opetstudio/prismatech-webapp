import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChangePasswordActions from './redux'
import ModalChangeMerchantPassword from '../../../Components/Modal/MyAccount/ModalChangeMerchantPassword'
class index extends Component {
  render () {
    const { error, status, email, reset, doResult, userId } = this.props
    return (
      <ModalChangeMerchantPassword
        doResult={doResult}
        error={error}
        status={status}
        email={email}
        reset={reset}
        userId={userId}
      />
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    error: state.rpchangepassword.errors,
    userId: state.myprofile.user_id,
    status: state.rpchangepassword.status,
    email: state.rpchangepassword.email
  }
}
const mapDispatchToProps = dispatch => {
  return {
    doResult: data => dispatch(ChangePasswordActions.changePassword(data)),
    reset: data => dispatch(ChangePasswordActions.resetChangePassword())
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(index)

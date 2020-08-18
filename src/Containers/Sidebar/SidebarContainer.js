import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { LoginSelectors } from '../Login/redux'
import AppActions, { AppSelectors } from '../../Redux/AppRedux'
import Sidebar from '../../Components/Sidebar/Sidebar'
class TheComponent extends React.PureComponent {
  render () {
    const { userMerchantCode } = this.props
    // console.log('render')
    return (<Sidebar userMerchantCode={userMerchantCode} userRole={this.props.userRole} appPatch={this.props.appPatch} routeActive={this.props.routeActive} sessionToken={this.props.sessionToken} history={this.props.history} {...this.props} />)
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('state.myprofile===>', state.myprofile)
  return {
    userPrivileges: state.myprofile.user_privileges,
    profile: state.login.user,
    userFullName: LoginSelectors.userFullName(state.login),
    sessionToken: LoginSelectors.sessionToken(state.login),
    userMerchantCode: LoginSelectors.userMerchantCode(state.login),
    routeActive: AppSelectors.routeActive(state.app)
    // userRole: LoginSelectors.userRole(state.login)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    appPatch: data => dispatch(AppActions.appPatch(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))

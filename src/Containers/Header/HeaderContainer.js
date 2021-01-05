import React from 'react'
import { connect } from 'react-redux'
// import _ from 'lodash'
import { injectIntl } from 'react-intl'
import LoginActions, { LoginSelectors } from '../Login/redux'
import { AppSelectors } from '../../Redux/AppRedux'
import HeaderComponent from '../../Components/Header/HeaderComponent'
import HeaderFormComponent from '../../Components/Header/HeaderFormComponent'
import QrAction from '../RpMerchant/ModalQrMerchant/redux'
import TablepaginationActions from '../../features/TablePagination/redux'

class TheComponent extends React.PureComponent {
  render () {
    // console.log('render')
    const { needToSave } = this.props
    if (needToSave) {
      return (
        <HeaderFormComponent
          {...this.props}
        />
      )
    }
    return (
      <HeaderComponent
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // var serviceName = Object.keys(state.tablepagination.payload)[0]
  return {
    sessionToken: LoginSelectors.sessionToken(state.login),
    userFullName: LoginSelectors.userFullName(state.login),
    userRole: LoginSelectors.userRole(state.login),
    routeActive: AppSelectors.routeActive(state.app),
    pageTitle: AppSelectors.pageTitle(state.app),
    relates: state.merchantrelatedinstitution.related_institutions,
    // payload: (state.tablepagination.payload || {})[serviceName],
    needToSave: state.tablepagination.needToSave
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: (data) => dispatch(LoginActions.loginRemove(data)),
    getQr: (data) => dispatch(QrAction.getQr(data)),
    tablepaginationResetForm: data => dispatch(TablepaginationActions.tablepaginationResetForm(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))

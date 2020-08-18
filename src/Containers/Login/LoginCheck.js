import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'
import { path } from 'ramda'
import { injectIntl } from 'react-intl'
import { Redirect, withRouter } from 'react-router-dom'
import _ from 'lodash'
import { LoginSelectors } from '../Login/redux'
import { isLoggedIn,getSession } from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath
class TheComponent extends React.PureComponent {
  render () {
    console.log('LoginCheck render ', this.props)
    const { isLoggedIn: isLogin, merchantId, authorizedRouters, match, userMerchantCode } = this.props
    // const merchantIdParams = path(['params', 'merchantId'], match)
    // const url = path(['url'], match)
    // console.log("token>>>>",getSession(AppConfig.sessionToken),", merchantid>>>>>",getSession('merchant_id'))
    // const authorizedRoutersIt = Immutable.asMutable(authorizedRouters, { deep: true })
    if (isLoggedIn(isLogin) !== true) { return <Redirect to={`${basePath}/login`} /> }
    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    userMerchantCode: LoginSelectors.getUserMerchantCode(state.login),
    authorizedRouters: LoginSelectors.getAuthorizedRouters(state.login)
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withRouter(TheComponent)))

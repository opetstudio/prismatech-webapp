import PropTypes from 'prop-types'
import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import LoginActions, { LoginSelectors } from './Login/redux'
import Header from '../Containers/Header/HeaderContainer'
import Sidebar from '../Containers/Sidebar/SidebarContainer'
import { isLoggedIn, getSession } from '../Utils/Utils'
import AppConfig from '../Config/AppConfig'
import ModalLogout from '../Components/Modal/ModalLogout'
import ModalQrMerchant from '../Containers/RpMerchant/ModalQrMerchant'
import ModalQrTopup from '../Containers/RpMerchant/ModalQrTopup'
import ModalQrDynamic from '../Containers/RpMerchant/ModalQrDynamic'

import ModalCommon from './Modal/index'
import QrMerchantAction from './RpMerchant/ModalQrMerchant/redux'
import RmAction from './RpMerchant/MerchantRelatedInstitution/redux'
import ProfileAction from './RpMerchant/Profile/redux'
import SplashAction from './RpMerchant/SplashScreen/redux'
import Loader from '../Components/Loader/LoaderFull'

// import Lottie from 'react-lottie'
// import * as Anim from '../Components/Loader/Loader_asset/Loader-merah.json'
class AdminlteContainer extends React.PureComponent {
  state={
    isLoading: false
  }

  static propTypes = {
    onLogout: PropTypes.func
  }

  static defaultProps = {
    onLogout: () => {}
  }

  constructor (props) {
    super(props)
    this.state = { isLoggedIn: this.props.isLoggedIn }
    this.renderLoggedIn = this.renderLoggedIn.bind(this)
    this.renderUnLoggedIn = this.renderUnLoggedIn.bind(this)
  }

  componentWillMount () {
    // const login=AppConfig.basePath+'/login'
    // if(!getSession(AppConfig.sessionToken))
    // {
    //   this.props.resetfetchProfile()
    //   window.location.replace(login)
    // }
  }

  renderLoggedIn (children) {
    return (
      <div className='wrapper'>
        <Helmet>
          <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
        </Helmet>
        {(isLoggedIn(this.props.isLoggedIn) === true) && <Header />}
        {(isLoggedIn(this.props.isLoggedIn) === true) && <Sidebar sidemenu={this.props.sidemenu} />}
        {children}
        <ModalLogout logout={this.props.doLogout} isRequesting={this.props.isRequesting} />
        <ModalQrMerchant />
        <ModalQrTopup />
        <ModalQrDynamic />
        <ModalCommon />

        {(isLoggedIn(this.props.isLoggedIn) === true) &&
          <footer className='main-footer' style={{ fontSize: 12 }}>
            © 2020 PT. Prismalink International
            {/* <div className='float-right d-none d-sm-inline-block'>
              <b>Version</b> 0.0.1
            </div> */}
          </footer>}
      </div>
    )
  }

  componentDidMount () {
    if (getSession(AppConfig.sessionToken)) {
      const merchant_id = getSession('merchant_id')
      this.props.fetchProfile({ merchant_id: getSession('merchant_id') })
      this.props.getRelated({ merchant_id })
    }
  }

  renderUnLoggedIn (children) {
    return (
      <div>
        <div style={{ minHeight: window.innerHeight - 200 }}>{children}</div>
      </div>
    )
  }

  render () {
    // console.log('render window.location ', window.location.pathname)
    const loc = window.location.pathname
    const { children } = this.props
    if (loc.startsWith(AppConfig.basePath + '/login-force'))
    {
      return this.renderUnLoggedIn(children)
    }
    if ((isLoggedIn(this.props.isLoggedIn) === true)) return this.renderLoggedIn(children)
    else return this.renderUnLoggedIn(children)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    userRole: LoginSelectors.userRole(state.login),
    isRequesting: LoginSelectors.isRequesting(state.login),
    isLoading: state.splash.isLoading
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  resetfetchProfile: data => dispatch(ProfileAction.profileReset(data)),
  fetchProfile: data => dispatch(ProfileAction.fetchProfileData(data)),
  doLogout: data => dispatch(LoginActions.loginDoLogout(data)),
  getRelated: data => dispatch(RmAction.fetchRelatedInstitution(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminlteContainer)

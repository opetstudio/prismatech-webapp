import React, { Component } from 'react'
import moment from 'moment'
// import Clock from 'react-live-clock'
// import { isNullOrUndefined } from 'util'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import AppConfig from '../../Config/AppConfig'
// import {Images} from '../../Themes'
// import AppConfig from '../../Config/AppConfig'
// import { getAccessToken, getUserPrivName } from '../../Utils/Utils'

// const useravatar = Images.useravatar
class HeaderComponent extends Component {
  // state = {
  //   time: '01 March, 2020 [09:57]'
  // }

  _logout (e) {
    if (e) e.preventDefault()
    this.props.logout()
    // alert('Are you sure to logout')
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        time: moment(new Date().toDateString()).format('DD MMMM, YYYY')
      })
    }, 1000)
  }

  render () {
    // const timezone = moment.tz.guess()
    // const relates = this.props.relates
    return (
      <nav className='main-header navbar navbar-expand navbar-white navbar-light'>
        {/* Left navbar links */}
        <ul className='navbar-nav '>
          <li className='nav-item row'>
            <span className='nav-link ' data-widget='pushmenu'><i className='fas fa-bars' /></span>
            {/* <p className='text-center' style={{ fontSize: 12, margin: 10 }}>
              <strong>
                {this.state.time}&nbsp;&nbsp;<Clock format='HH:mm:ss' ticking timezone={timezone} />
              </strong>
            </p> */}
          </li>
          {/* {!isNullOrUndefined(relates) && relates.length > 0 &&
            <button className='btn btn-outline-danger' style={{ paddingtop: '1,paddingBottom:1}}' }} data-toggle='modal' data-target='#modal-qr-merchant' data-widget='control-sidebar' onClick={() => this.props.getQr({ institution_id: relates[0].institution_id || null })}>
              <i className='fas fa-qrcode' /> Qr Saya
            </button>} */}

          <li className='nav-item d-sm-inline-block'>
            <h3 style={{ marginBottom: 0, marginTop: 4 }}><T id={(this.props.pageTitle || AppConfig.appName)} /></h3>
          </li>

        </ul>

        {/* Navbar Right Menu */}
        <ul className='navbar-nav ml-auto'>
          {/* <li className='nav]-item'>
            <a className='nav-link' data-toggle='modal' data-target='#modal-default' data-widget='control-sidebar' href='/#'><i className='fas fa-power-off' /></a>
          </li> */}
          <li className='nav-item dropdown'>
            <span className='nav-link' data-toggle='dropdown'>
              <i className='fas fa-cog' />
            </span>
            <div className='dropdown-menu dropdown-menu-lg dropdown-menu-right'>
              <div className='dropdown-divider' />
              <Link to='/my-profile' className='dropdown-item'>
                <i className='fas fa-user mr-2' />Profil Saya
              </Link>
              <div className='dropdown-divider' />
              <Link to='/my-account' className='dropdown-item'>
                <i className='fas fa-user-cog mr-2' /> Akun Saya
              </Link>
              <div className='dropdown-divider' />
              <span className='dropdown-item' data-toggle='modal' data-target='#modal-default' data-widget='control-sidebar'>
                <i className='fas fa-sign-out-alt mr-2' /> Keluar
              </span>
              <div className='dropdown-divider' />
            </div>
          </li>

        </ul>
      </nav>
    )
  }
}
export default injectIntl(HeaderComponent)

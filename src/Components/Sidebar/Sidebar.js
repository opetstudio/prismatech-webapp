import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Images } from '../../Themes'
import AppConfig from '../../Config/AppConfig'
import { getAccessToken } from '../../Utils/Utils'
import { getPage } from '../../Utils/Pages'
import Shimmer from 'react-shimmer-effect'
import moment from 'moment'
import Clock from 'react-live-clock'
import SidebarMainMenu from './SidebarMainMenu'

const basePath = AppConfig.basePath

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.getMainMenu = this.getMainMenu.bind(this)
    this._getMenuLi = this._getMenuLi.bind(this)
    this._getMenuLiSingle = this._getMenuLiSingle.bind(this)
  }

  getMainMenu ({ ch }) {
    return (
      <li className='nav-item has-treeview menu-open'>
        <Link to='#' className='nav-link'>
          <i className='nav-icon fas fa-cog' />
          <p>User Management
            <i className='fas fa-angle-left right' />
          </p>
        </Link>
      </li>
    )
  }

  _getMenuLi (route, title, liClass, parameter = {}) {
    const { userMerchantCode, userPrivileges } = this.props
    const page = getPage(route) || {}
    const pageRole = page.role || 'xxxx'

    const path = (page.path || '').replace(':merchantId', userMerchantCode || '*')

    console.log('path====>', path)
    console.log('userPrivileges====>', userPrivileges)

    const baseRoute = `${basePath}${path}`
    if (!userPrivileges.includes(path)) return null
    return (<li className={(this.props.routeActive || '').startsWith(baseRoute) ? 'active nav-item' : 'nav-item'}><Link className='nav-link' onClick={() => this.props.appPatch({ routeActive: baseRoute, pageTitle: title })} to={baseRoute}> <p>{page.title || title}</p></Link></li>)
  }

  _getMenuLiSingle (route, title, liClass) {
    const page = getPage(route) || {}
    const baseRoute = `${basePath}${route}`
    return (<li className={(this.props.routeActive || '').startsWith(baseRoute) ? 'nav-item active' : 'nav-item active'}><Link className='nav-link' onClick={() => this.props.appPatch({ routeActive: baseRoute, pageTitle: title })} to={baseRoute}><i className={liClass || 'fas fa-circle nav-icon'} /> <p>{page.title || title}</p></Link></li>)
  }

  render () {
    const { profile, userPrivileges } = this.props
    return (
      <aside className='main-sidebar sidebar-dark-primary elevation-4' style={{ background: 'linear-gradient(to right bottom, #a00f0f,#ed2f2f )' }}>
        {/* Brand Logo */}
        <a href='/#' className='brand-link' style={{ background: 'white' }}>
          <img src={Images.LogoRp} alt='Rayapay' className='brand-image img-circle elevation-3' />
          <span className='brand-text' style={{ color: ' #a00f0f' }}>{AppConfig.appName}</span>
        </a>
        <div className='sidebar'>
          <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
            <div className='info'>
              <marquee style={{ color: '#fff' }}>Selamat Datang di Website {AppConfig.appName}</marquee>
              <br />
              {/* <h5 style={{ color: 'white' }}><i className='icon fas fa-user' /> &nbsp;{profile.full_name}</h5> */}
              {/* <label style={{ color: 'white' }}><i className='icon fas fa-store-alt' /> &nbsp;{profile.business_name}</label> */}
            </div>
          </div>
          <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
            <div className='info'>
              <strong style={{ color: '#fff' }}>
                {moment(new Date().toDateString()).format('DD MMMM, YYYY')}&nbsp;&nbsp;<Clock format='HH:mm:ss' ticking timezone={moment.tz.guess()} />
              </strong>
            </div>
          </div>

          <nav className='mt-2'>
            <ul className='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>
              {/* {this._getMenuLiSingle(AppConfig.appHomePage, 'Dashboard', 'nav-icon fas fa-tachometer-alt')} */}
              <SidebarMainMenu name='main-menu-dashboard' title='Dashboard' userPrivileges={userPrivileges} icon={(<i className='nav-icon fas fa-tachometer-alt' />)}>
                {this._getMenuLi('/dashboard-lms', 'LMS Dashboard')}
                {this._getMenuLi('/dashboard-ecomm', 'Plink Market Dashboard')}
                {this._getMenuLi('/dashboard-rpay', 'Rayapay Dashboard')}
                {/* {this.props.getMenuLi('/published-course', 'Published Course')} */}
                {/* {this._getMenuLi('/student', 'Student')} */}
                {/* {this._getMenuLi('/tag', 'Tag Management')} */}
              </SidebarMainMenu>
              <SidebarMainMenu name='main-menu-elearning-management' title='E-Learning' userPrivileges={userPrivileges}>
                {this._getMenuLi('/course', 'Course Management')}
                {/* {this.props.getMenuLi('/published-course', 'Published Course')} */}
                {this._getMenuLi('/student', 'Student')}
                {/* {this._getMenuLi('/tag', 'Tag Management')} */}
              </SidebarMainMenu>
              <SidebarMainMenu name='main-menu-ecommerce-management' title='E-Commerce' userPrivileges={userPrivileges}>
                {this._getMenuLi('/tokoonline', 'Toko Online Management')}
                {this._getMenuLi('/category', 'Category Management')}
                {this._getMenuLi('/product', 'Product Management')}
                {this._getMenuLi('/purchaseorder', 'Purchase Order')}
                {/* {this._getMenuLi('/tag', 'Tag Management')} */}
              </SidebarMainMenu>
              <SidebarMainMenu name='main-menu-xpay-management' title='XPay' userPrivileges={userPrivileges}>
                {this._getMenuLi('/tokoonline', 'History Transaction')}
                {this._getMenuLi('/category', 'Topup E-Wallet')}
                {this._getMenuLi('/product', 'My Settlement')}
                {/* {this._getMenuLi('/tag', 'Tag Management')} */}
              </SidebarMainMenu>
              <SidebarMainMenu name='main-menu-user-management' title='User Management' userPrivileges={userPrivileges}>
                {this._getMenuLi('/user', 'User')}
                {this._getMenuLi('/role', 'Role')}
              </SidebarMainMenu>
            </ul>

          </nav>
        </div>
      </aside>
    )
  }
}

export default Sidebar

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import ContentListUser from './ContentListUser'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
class PageListUser extends Component {
  render () {
    // console.log('render')
    console.log('props=====>', this.props)
    return (
      <div className='content-wrapper'>
        <LoginCheck />
        <Helmet>
          <title>User Management</title>
          <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
        </Helmet>
        <ContentHeader
          title='List All User'
          breadcrumb={[{ title: 'User Management', link: '#' }, { title: 'List All User', link: null, isActive: true }]}
        />
        <ContentListUser />
      </div>
    )
  }
}
export default PageListUser

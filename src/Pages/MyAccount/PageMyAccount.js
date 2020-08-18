import React, { Component } from 'react'
import LoginCheck from '../../Containers/Login/LoginCheck'
// PAGES
// import ChangePassword from '../../Containers/RpMerchant/ModalChangePassword'
import ModalChangePassword from './components/ModalChangePassword'
// PAGES
import MyAccountAction from '../../Containers/RpMerchant/MyAccount/redux'
import ContentHeader from '../../Components/ContentHeader'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

class PageMyAccount extends Component {
  render () {
    const menu = [
      { page: 'Change Password', action: this.props.doResult({ page: 'changePassword' }), modalid: 'modal-change-password' }
      // { page: 'Change Email', action: this.props.doResult({page:'changeEmail'}),modalid:'modal-change-email' }
    ]
    return (
      <>
        <LoginCheck />
        <Helmet>
          <title>Akun Saya</title>
          <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
        </Helmet>
        <div className='content-wrapper'>
          <ContentHeader
            title='My account'
            breadcrumb={[{ title: 'Home', link: '/home', active: true }, { title: 'My account', active: true }]}
          />
          <section className='content'>
            {/* <ChangePassword /> */}
            <div className='container-fluid'>
              <div className='card card-primary'>
                <div className='card-body'>
                  <ul className='list-group list-group-unbordered mb-3'>
                    <li className='list-group-item'>
                      <b>Email</b> <a className='float-right'>{this.props.email}</a>
                    </li>
                    {menu.map((r, i) => {
                      return (
                        <li key={i} className='list-group-item'>
                          <b>{r.page}</b> <a className='float-right btn btn-outline-secondary btn-sm' data-target={'#' + r.modalid} data-widget='control-sidebar' data-toggle='modal'>Ganti</a>
                        </li>
                      )
                    })}

                    {/* <li class="list-group-item">
                                              <b>Change Password</b> <a class="float-right btn btn-outline-secondary btn-sm">Change</a>
                                          </li>
                                          {/* <li class="list-group-item">
                                              <b>Change Password</b> <a class="float-right btn btn-outline-secondary btn-sm">Change</a>
                                          </li>
                                          <li class="list-group-item">
                                              <b>Change Email</b> <a class="float-right btn btn-outline-secondary btn-sm">Change</a>
                                          </li> */}

                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ModalChangePassword />
      </>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps', state.dashboard)

  return {
    error: state.rptransaction.errors,
    statusFetchUser: state.rptransaction.statu,
    email: state.myprofile.email
  }
}
const mapDispatchToProps = dispatch => {
  return {
    doResult: data => dispatch(MyAccountAction.doEditAccount())
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(PageMyAccount)

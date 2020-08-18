import React, { Component } from 'react'
import Helmet from 'react-helmet'
import TableUser from './TableUser'

class UserListPageComponent extends Component {
  componentWillUnmount () {
    this.props.userRequestPatch({ isRequesting: false, responseCode: '', responseMessage: '' })
  }

  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <Helmet>
          <title>Daftar User</title>
          <body className='hold-transition skin-blue sidebar-mini' />
        </Helmet>
        <section className='content-header'>
          <h1>Daftar User</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='/#'>
                <i className='fa fa-dashboard' /> User
              </a>
            </li>
            <li className='active'>Daftar User</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                {/* <div className='box-header'>
                </div> */}
                {/* <div className='box-body table-responsive no-padding'> */}
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <TableUser />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default UserListPageComponent

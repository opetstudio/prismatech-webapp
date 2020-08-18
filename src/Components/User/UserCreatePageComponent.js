import React, { Component } from 'react'
import _ from 'lodash'
import Helmet from 'react-helmet'

class UserCreatePageComponent extends Component {
  componentWillUnmount () {
    this.props.userRequestPatch({ isRequesting: false, responseCode: '', responseMessage: '' })
  }

  _onSubmitForm (e) {
    if (e) e.preventDefault()
    const bodyJson = {}
    _.forIn(this.refs, (v, k) => {
      bodyJson[k] = v.value
    })
    console.log('bodyJson', bodyJson)
    this.props.userCreateRequest(bodyJson)
  }

  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <Helmet>
          <title>Registrasi User</title>
          <body className='hold-transition skin-blue sidebar-mini' />
        </Helmet>
        <section className='content-header'>
          <h1>Registrasi User</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='/#'>
                <i className='fa fa-dashboard' /> User
              </a>
            </li>
            <li className='active'>Registrasi User</li>
          </ol>
        </section>
        <section className='content'>
          <form onSubmit={e => this._onSubmitForm(e)}>
            <div className='box box-primary'>
              <div className='box-header with-border'>
                <h3 className='box-title'>User Information</h3>
              </div>
              <div className='box-body'>
                {this.props.responseCode !== '' &&
                  this.props.responseCode === 'MBDD00' &&
                  (
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='alert alert-success' role='alert'>
                          {this.props.responseDescription}
                        </div>
                      </div>
                    </div>
                  )}
                {this.props.responseCode !== '' &&
                  this.props.responseCode !== 'MBDD00' &&
                  (
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='alert alert-danger' role='alert'>
                          {this.props.responseDescription}
                        </div>
                      </div>
                    </div>
                  )}
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='box-body'>

                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>Full Name</label>
                        <input
                          type='text'
                          className='form-control'
                          id='userFullname'
                          placeholder='Enter User Full Name'
                          ref='userFullname'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Email Address</label>
                        <input
                          type='text'
                          className='form-control'
                          id='email'
                          placeholder='Enter email'
                          ref='email'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>Mobile Phone Number</label>
                        <input
                          type='text'
                          className='form-control'
                          id='mobile'
                          placeholder='Enter Phone Number'
                          ref='mobile'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Password</label>
                        <input
                          type='text'
                          className='form-control'
                          id='userPassword'
                          placeholder='Enter User Password'
                          ref='userPassword'
                        />
                      </div>
                      <div className='form-group'>
                        <label>Address</label>
                        <textarea
                          className='form-control'
                          rows='3'
                          placeholder='Enter Address'
                          ref='address'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='box-footer'>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
                {/* <button type="submit" className="btn btn-info pull-right">Sign in</button> */}
              </div>
            </div>
          </form>
        </section>
      </div>
    )
  }
}
export default UserCreatePageComponent

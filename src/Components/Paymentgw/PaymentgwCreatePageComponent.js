import React, { Component } from 'react'
import _ from 'lodash'
import Helmet from 'react-helmet'

class PaymentgwCreatePageComponent extends Component {
  componentWillUnmount () {
    console.log('componentWillUnmount')
    this.props.paymentgwRequestPatch({ isRequesting: false, responseCode: '', responseMessage: '' })
  }

  _onSubmitForm (e) {
    if (e) e.preventDefault()
    const bodyJson = {}
    _.forIn(this.refs, (v, k) => {
      bodyJson[k] = v.value
    })
    console.log('bodyJson', bodyJson)
    this.props.paymentgwCreateRequest(bodyJson)
  }

  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <Helmet>
          <title>Registrasi Payment Gateway</title>
          <body className='hold-transition skin-blue sidebar-mini' />
        </Helmet>
        <section className='content-header'>
          <h1>Registrasi Payment Gateway</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='/#'>
                <i className='fa fa-dashboard' /> Payment Gateway
              </a>
            </li>
            <li className='active'>Registrasi Payment Gateway</li>
          </ol>
        </section>
        <section className='content'>
          <form onSubmit={e => this._onSubmitForm(e)}>
            <div className='box box-primary'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Registrasi Payment Gateway</h3>
              </div>
              <div className='box-body'>
                {
                  this.props.responseCode !== '' &&
                  this.props.responseCode === 'MBDD00' && (
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='alert alert-success' role='alert'>
                          {this.props.responseMessage}
                        </div>
                      </div>
                    </div>
                  )
                }
                {
                  this.props.responseCode !== '' &&
                  this.props.responseCode !== 'MBDD00' && (
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='alert alert-danger' role='alert'>
                          {this.props.responseMessage}
                        </div>
                      </div>
                    </div>
                  )
                }
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='box-body'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Paymentgw Code</label>
                        <input
                          type='mcode'
                          className='form-control'
                          id='mcode'
                          placeholder='Enter Paymentgw Code'
                          ref='mcode'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>Paymentgw Name</label>
                        <input
                          type='mname'
                          className='form-control'
                          id='mname'
                          placeholder='Enter Paymentgw Name'
                          ref='mname'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Email address</label>
                        <input
                          type='email'
                          className='form-control'
                          id='email'
                          placeholder='Enter email'
                          ref='email'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>Phone No.</label>
                        <input
                          type='phone'
                          className='form-control'
                          id='phone'
                          placeholder='Enter Phone Number'
                          ref='phone'
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
                  <div className='col-md-6'>
                    <div className='box-body'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>
                          Front End Callback URL
                        </label>
                        <input
                          type='frontend'
                          className='form-control'
                          id='frontend'
                          placeholder='Enter Front End Callback URL'
                          ref='frontend'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>
                          Back End Callback URL
                        </label>
                        <input
                          type='backend'
                          className='form-control'
                          id='backend'
                          placeholder='Enter Back End Callback URL'
                          ref='backend'
                        />
                      </div>
                      <div className='form-group'>
                        <label>Status</label>
                        <select className='form-control' ref='status'>
                          <option value='active'>Active</option>
                          <option value='inactive'>Inactive</option>
                        </select>
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
export default PaymentgwCreatePageComponent

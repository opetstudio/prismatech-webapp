import React, { Component } from 'react'
import _ from 'lodash'
import Helmet from 'react-helmet'

class ChangeLimitPageComponent extends Component {
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
          <title>User Update Limit</title>
          <body className='hold-transition skin-blue sidebar-mini' />
        </Helmet>
        <section className='content-header'>
          <h1>Rubah Limit</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='/#'>
                <i className='fa fa-dashboard' /> User
              </a>
            </li>
            <li className='active'>Rubah Limit User</li>
          </ol>
        </section>
        <section className='content'>
          <form onSubmit={e => this._onSubmitForm(e)}>
            <div className='box box-primary'>
              <div className='box-header with-border'>
                <h3 className='box-title'>User Limit</h3>
              </div>
              <div className='box-body'>
                {this.props.responseCode !== '' &&
                  this.props.responseCode === 'MBDD00' &&
                  (
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='alert alert-success' role='alert'>
                          {this.props.responseMessage}
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
                          {this.props.responseMessage}
                        </div>
                      </div>
                    </div>
                  )}
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='box-body'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>User New Limit</label>
                        <input
                          type='mcode'
                          className='form-control'
                          id='mcode'
                          placeholder='Enter User Code'
                          ref='mcode'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='box-body' />
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
export default ChangeLimitPageComponent

import React, { Component } from 'react'
import Loader from '../../Loader/Loader'
import _ from 'lodash'

export default class ModalChangePassword extends Component {
  constructor (props) {
    super(props)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._form = this._form.bind(this)
    this._result = this._result.bind(this)
  }

    state={
      err: '',
      pass: '',
      pass_new: '',
      pass_new_conf: '',
      seePass: false,
      seePassConf: false,
      seePassClass: 'fas fa-eye',
      seePassConfClass: 'fas fa-eye'
    }

    _form () {
      const { error, status } = this.props
      return (
        <div>
          {!_.isEmpty(error) &&
            <div className='row'>
              <div className='col-12'>
                <div className='alert alert-danger' role='alert'><center>{error}</center></div>
              </div>
            </div>}
          {!_.isEmpty(this.state.err) &&
            <div className='row'>
              <div className='col-12'>
                <div className='alert alert-danger' role='alert'><center>{this.state.err}</center></div>
              </div>
            </div>}
          <div className='form-group'>
            <label>Kata Sandi Lama</label>
            <input type='password' className='form-control' placeholder='Old Password' onChange={(e) => this.setState({ pass: e.target.value })} required />
          </div>
          <label>Kata Sandi baru</label>
          <div className='input-group'>
            <input type={this.state.seePass ? 'text' : 'password'} className='form-control' placeholder='New password' onChange={(e) => this.setState({ pass_new: e.target.value })} required />
            <div className='input-group-append'>
              <span className='input-group-text'><i
                className={this.state.seePassClass} onClick={() => {
                  if (this.state.seePass === false) { this.setState({ seePass: true, seePassClass: 'fas fa-eye-slash' }) } else { this.setState({ seePass: false, seePassClass: 'fas fa-eye' }) }
                }}
              />
              </span>
            </div>
          </div>
          <label>Konfirmasi Kata sandi baru</label>
          <div className='input-group'>
            <input type={this.state.seePassConf ? 'text' : 'password'} className='form-control' placeholder='Confirm new password' onChange={(e) => this.setState({ pass_new_conf: e.target.value })} required />
            <div className='input-group-append'>
              <span className='input-group-text'><i
                className={this.state.seePassConfClass} onClick={() => {
                  if (this.state.seePassConf === false) { this.setState({ seePassConf: true, seePassConfClass: 'fas fa-eye-slash' }) } else { this.setState({ seePassConf: false, seePassConfClass: 'fas fa-eye' }) }
                }}
              />
              </span>
            </div>
          </div>
          <div className='card-footer'>
            <center><button type='submit' className='btn btn-primary' onClick={(e) => this._handleSubmit()}>Submit</button></center>
          </div>
        </div>
      )
    }

    _result () {
      return (
        <div style={{ marginLeft: 30, marginRight: 30 }}>
          <div className='register-logo'>
            <i className='fa fa-check-circle' style={{ color: 'green' }} />
            <p style={{ color: 'green', fontSize: 25 }}><b>Kata Sandi Sukses Diganti</b></p>
            <label style={{ color: 'green', fontSize: 20 }}>Sekarang Anda dapat masuk menggunakan kata sandi baru Anda</label>
          </div>
          <center><button type='submit' className='btn btn-primary' data-dismiss='modal' aria-label='Close' onClick={(e) => this.props.reset()}>Ok</button></center>
          <br />
        </div>
      )
    }

    componentDidMount () {
      this.props.reset()
    }

    _handleSubmit () {
      const { pass, err, pass_new, pass_new_conf } = this.state
      const { userId } = this.props
      console.log('handle submit')
      if (pass_new != pass_new_conf) {
        this.setState({ err: 'Password doesn\'t match' })
      } else {
        this.props.doResult({ password: pass, new_password: pass_new, userId })
      }
    }

    render () {
      const { error, status } = this.props
      console.log('status=>>>>>>', status)
      return (
        <div>
          <div className='modal fade' id='modal-change-password'>
            <div className='z modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title'>Ganti Kata Snadi</h4>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  {status !== 200 && this._form()}
                  {status === 200 && this._result()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

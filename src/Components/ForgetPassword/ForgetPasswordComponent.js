import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import Loader from '..//Loader/Loader'
import _ from 'lodash'

class SignupPageComponent extends Component {
  constructor (props) {
    super(props)
    this._formOnSubmit = this._formOnSubmit.bind(this)
    this._formOnSubmitOtp = this._formOnSubmitOtp.bind(this)
    this._newpassOnSubmit = this._newpassOnSubmit.bind(this)
    this._from = this._form.bind(this)
    this._otp = this._otp.bind(this)
    this._result = this._result.bind(this)
    this._newPassword = this._newPassword.bind(this)
  }

  state={
    msg: '',
    otp: '',
    subOtp: 0
  }

  // componentWillUnmount () {
  //   console.log('component will unmount')
  //   this.props.reset()
  // }

  componentDidMount () {
    console.log('component will mount')
    this.props.reset()
  }

  // Step 1
  // Form Email
  _form () {
    const { isRequest, errors } = this.props
    const { msg } = this.state
    return (
      <div>

        <p className='login-box-msg' style={{ paddingBottom: 0 }}>Lupa Kata Sandi?.</p>
        <p className='login-box-msg'>Masukan Email anda</p>
        <form onSubmit={(e) => this._formOnSubmit(e)}>
          {!_.isEmpty(errors) &&
            <div className='row' style={{ marginTop: 10, marginBottom: 10 }}>
              <div className='col-12'>
                <div className='alert alert-danger' role='alert'><center>{errors}</center></div>
              </div>
            </div>}
          {!_.isEmpty(msg) &&
            <div className='row' style={{ marginTop: 10, marginBottom: 10 }}>
              <div className='col-12'>
                <div className='alert alert-danger' role='alert'><center>{msg}</center></div>
              </div>
            </div>}
          <div className='input-group mb-3'>
            <input type='email' className='form-control' placeholder='Email' required style={{ textalign: 'center' }} ref='email' />
            <div className='input-group-append'>
              <div className='input-group-text'>
                <span className='fas fa-envelope' />
              </div>
            </div>
          </div>

          <center>
            {!isRequest && <button style={{ width: '100%' }} type='submit' className='btn btn-primary btn-block btn-flat' required>Submit</button>}
            {isRequest && <Loader loading />}
          </center>
        </form>
        <br />
        <center><Link to='/login'><T id='ke halaman Login' /></Link></center>
        {/* <center><a href='/' className='text-center'>ke halaman Login</a></center> */}
      </div>
    )
  }

  // Submit Email
  _formOnSubmit (e) {
    if (e) e.preventDefault()
    const email = this.refs.email.value
    // if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    if ((/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email))) {
      this.setState({ msg: '' })
      this.props.doForget({ email })
    } else { this.setState({ msg: 'Email not valid' }) }
    return false
  }

  // Step 2
  // Form new password
  _newPassword () {
    const { msg } = this.state
    console.log('otp>>>>', this.state.otp)
    return (
      <div style={{ marginLeft: 30, marginRight: 30 }}>
        <i className='fa fa-arrow-left' onClick={() => this.props.setPage({ page: 'form' })} />
        {!_.isEmpty(msg) !== '' &&
          <div className='row' style={{ marginTop: 10, marginBottom: 10 }}>
            <div className='col-12'>
              <div className='alert alert-danger' role='alert'><center>{msg}</center></div>
            </div>
          </div>}
        <p style={{ color: 'green', marginBottom: 0.5, fontSize: 20, textAlign: 'center' }}>Verifikasi email.</p>
        <p className='login-box-msg'><b>Atura kata sandi baru anda</b></p>
        <center>
          <input type='password' className='form-control' placeholder='kata sandi baru' style={{ textAlign: 'center' }} ref='newPass' />
          <br />
          <input type='password' className='form-control' placeholder='konfirmasi kata sandi' style={{ textAlign: 'center' }} autoFocus ref='confirmNewPass' />
          <br />
          <button type='submit' className='btn btn-primary btn-block btn-flat ' required onClick={() => this._newpassOnSubmit()}>Submit</button>
        </center>
        <br />
        <center><a href='/' className='text-center'>ke halaman Login</a></center>
        <center><b>Or</b></center>
        <center><a href='/forget-password' className='text-center'>kirim ulang email anda</a></center>
      </div>

    )
  }

  // Submit New Password
  _newpassOnSubmit (e) {
    if (e) e.preventDefault()
    const newPass = this.refs.newPass.value
    const confirmNewPass = this.refs.confirmNewPass.value

    if (newPass === confirmNewPass) {
      this.props.setNewPassword({ new_password: newPass })
      this.setState({ msg: '' })
      this.props.setPage({ page: 'otp', isRequesting: false, errors: '', status: 0 })
    } else { this.setState({ msg: 'Password doesn\'t match' }) }
  }

  // Step 3
  // Form Otp
  _otp () {
    console.log('newPassword>>>>', this.props.new_password)
    return (
      <div style={{ marginLeft: 30, marginRight: 30 }}>
        <i className='fa fa-arrow-left' onClick={() => this.props.setPage({ page: 'password' })} />
        {!_.isEmpty(this.props.errors) !== '' &&
          <div className='row' style={{ marginTop: 10, marginBottom: 10 }}>
            <div className='col-12'>
              <div className='alert alert-danger' role='alert'><center>{this.props.errors}</center></div>
            </div>
          </div>}
        <center>
          {this.state.subOtp <= 0 && (
            <div>
              <p style={{ color: 'green', marginBottom: 0, fontSize: 11 }}>Otp telah dikirim ke email anda</p>
              <p style={{ marginBottom: 0 }}><b>{this.props.email}</b></p>
            </div>
          )}
          <input type='password' className='form-control' placeholder='OTP' style={{ textAlign: 'center', letterSpacing: 15 }} onChange={(e) => this.setState({ otp: e.target.value })} autoFocus maxLength={4} />
          {this.state.subOtp > 0 && this.props.errors !== 'Otp expired' && <p style={{ color: 'red' }}><b>Silahkan periksa kembali otp</b></p>}
          <br />
          <Link type='submit' className='btn btn-primary btn-block btn-flat ' required onClick={() => this._formOnSubmitOtp()}>Kirim Otp</Link>
        </center>
        <br />
        <center><a href='/' className='text-center'>ke halaman Login</a></center>
        <center><b>Or</b></center>
        <center><a href='/forget-password' className='text-center'>Masukan ulang email anda</a></center>
      </div>
    )
  }

  // Submit Otp
  _formOnSubmitOtp () {
    if (!_.isEmpty(this.state.otp)) {
      this.props.doConfirmForget({ otpRefNum: this.props.otpRefNum, email: this.props.email, new_password: this.props.new_password, otp: this.state.otp })
      this.setState({ subOtp: this.state.subOtp + 1 })
    }
    return false
  }

  // Sucess
  _result () {
    return (
      <div style={{ marginLeft: 30, marginRight: 30 }}>
        <div className='register-logo'>
          <i className='fa fa-check-circle' style={{ color: 'green' }} />
          <p style={{ color: 'green', fontSize: 25 }}><b>Sukses mengganti kata sandi</b></p>
          <label style={{ color: 'green', fontSize: 20 }}>Sekarang Anda dapat masuk menggunakan kata sandi baru Anda</label>
        </div>
        <br />
        <center><a href='/' className='text-center'>Ke halaman login</a></center>
        <center><b>or</b></center>
        <center><a href='/forget-password' className='text-center'>Masukan ulang email</a></center>
      </div>
    )
  }

  _expired () {
    return (
      <div style={{ marginLeft: 30, marginRight: 30 }}>
        <div className='register-logo'>
          <i class='fa fa-check-circle' style={{ color: 'red' }} />
          <p style={{ color: 'red' }}><b>Maaf OTP kedaluwarsa</b></p>
        </div>
        <br />
        <center><a href='/forget-password' type='submit' className='btn btn-primary btn-block btn-flat' required>ke halaman Login</a></center>
        <center><b>or</b></center>
        <center><a href='/forget-password' className='text-center'>Masukan ulang email anda</a></center>
      </div>
    )
  }

  render () {
    return (
      <div>
        <Helmet>
          <title>Lupa Kata Sandi</title>

          <body className='hold-transition register-page' />
        </Helmet>
        <div className='register-box' style={{ alignSelf: 'center', marginLeft: '10%' }}>
          {/* <div className="register-logo">
                <a href="../../index2.html"><b>Admin</b>LTE</a>
              </div> */}
          <div className='card'>
            <div className='card-body register-card-body'>
              {this.props.page === 'form' && this._form()}
              {this.props.page === 'otp' && this._otp()}
              {this.props.page === 'password' && this._newPassword()}
              {this.props.page === 'success' && this._result()}
              {this.props.errors === 'invalid otp' && this._expired()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(SignupPageComponent)
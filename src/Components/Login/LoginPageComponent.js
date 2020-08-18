import React from 'react'
// import {
//   Button,
//   Form,
//   Grid,
//   Header,
//   Image,
//   Message,
//   Segment,
//   Container
// } from 'semantic-ui-react'
// import { Redirect, Link } from 'react-router-dom'
// import CryptoJS from 'crypto-js'
// import Helmet from 'react-helmet'
import { isEmpty, isNil } from 'ramda'
// import AppConfig from '../../Config/AppConfig'
import Loader from '../Loader/Loader'
// const basePath = AppConfig.basePath

// var bcrypt = require('bcryptjs')
// var salt = bcrypt.genSaltSync(1)

class LoginPageComponent extends React.Component {
  state = {
    password: '',
    email: '',
    grant_type: 'password',
    username: '',
    client_id: '',
    formSubmitMessage: ''
  }

  constructor (props) {
    super(props)
    this.state = {
      formSubmitMessage: this.props.formSubmitMessage
    }
    this.props.loginPatch({ responseMessage: '', responseCode: '', responseDescription: '' })
  }

  componentWillUnmount () {
    // console.log('login componentWillUnmount')
    this.props.loginPatch({ responseMessage: '', responseCode: '', responseDescription: '' })
  }

  componentDidMount (prevProps) {
    // console.log('login componentDidMount')
    this.props.loginPatch({ responseMessage: '', responseCode: '', responseDescription: '' })
  }

  handleChange = (e, { name, value }) => {
    var newSt = {}
    newSt[name] = value
    if (name === 'email') {
      // let hash = bcrypt.hashSync(value, salt)
      // console.log(name + ' hash=>', hash)
      newSt.username = value
      newSt.client_id = value
    }
    this.setState(newSt)
  }

  handleSubmit = () => {
    // console.log('handleSubmit')
    const { username, password } = this.state
    // encrypt password
    // let hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64)
    // let secondHash = CryptoJS.SHA256(hash).toString(CryptoJS.enc.Base64)

    const submittedData = {
      grant_type: this.state.grant_type,
      username,
      password,
      client_id: this.state.client_id
    }
    this.setState(submittedData)
    this.props.loginDoLogin(submittedData)
  }

  _formOnSubmit (e) {
    if (e) e.preventDefault()
    const email = this.refs.email.value
    const pass = this.refs.pass.value
    this.props.loginDoLogin({
      userid: email,
      password: pass
    })
    return false
  }

  isEmptyOrNull (str) {
    return isEmpty(str) || isNil(str)
  }

  render () {
    // console.log('render')
    // console.log('props login===>', this.props)
    // const { isLoggedIn } = this.props
    // const { password, email } = this.state
    return (
      <form onSubmit={(e) => this._formOnSubmit(e)}>
        {!this.isEmptyOrNull(this.props.responseCode) && this.props.responseCode === 'MBDD00' &&
          (
            <div className='row'>
              <div className='col-md-12'>
                <div className='alert alert-success' role='alert'>
                  {this.props.responseDescription}
                </div>
              </div>
            </div>
          )}
        {!this.isEmptyOrNull(this.props.responseCode) && this.props.responseCode !== 'MBDD00' &&
          (
            <div className='row'>
              <div className='col-md-12'>
                <div className='alert alert-danger' role='alert'>
                  {this.props.responseDescription}
                </div>
              </div>
            </div>
          )}
        <div className='form-group has-feedback'>
          <input type='email' className='form-control' placeholder='Email' ref='email' required />
          <span className='glyphicon glyphicon-envelope form-control-feedback' />
        </div>
        <div className='form-group has-feedback'>
          <input type='password' className='form-control' placeholder='Kata Sandi' ref='pass' required />
          <span className='glyphicon glyphicon-lock form-control-feedback' />
        </div>
        <div className='row'>
          <div className='col-xs-8'>
            <div className='checkbox icheck'>
              {/* <label><input type='checkbox' /> Remember Me </label> */}
            </div>
          </div>
          <div className='col-xs-4'>
            {!this.props.isRequesting && <button type='submit' className='btn btn-block btn-primary btn-xs'> In</button>}
            {this.props.isRequesting && <Loader loading />}
            {/* <button type='button' className='btn btn-primary btn-block btn-flat' onClick={() => this.handleSubmit()}>Sign In</button> */}
          </div>
        </div>
      </form>
    )
  }
}

export default LoginPageComponent

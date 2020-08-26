import React from 'react'
import { isEmpty, isNil } from 'ramda'
import AppConfig from '../../Config/AppConfig'
import Loader from '../../Components/Loader/Loader'
import _ from 'lodash'
import { Link } from 'react-router-dom'

// const basePath = AppConfig.basePath

// var bcrypt = require('bcryptjs')
// var salt = bcrypt.genSaltSync(1)

class LoginPageComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formSubmitMessage: this.props.formSubmitMessage
    }
    this._form = this._form.bind(this)
    this.props.loginPatch({ responseMessage: '', responseCode: '', responseDescription: '' })
    this.state = {
      password: '',
      email: '',
      grant_type: 'password',
      username: '',
      client_id: '',
      formSubmitMessage: ''
    }
  }

  componentWillUnmount () {
    const login = AppConfig.basePath + '/login'
    this.props.loginPatch({ responseMessage: '', responseCode: '', responseDescription: '' })
  }

  componentDidMount (prevProps) {
    this.props.loginPatch({ responseMessage: '', responseCode: '', responseDescription: '' })
  }

  handleChange = (e, { name, value }) => {
    var newSt = {}
    newSt[name] = value
    if (name === 'email') {
      newSt.username = value
      newSt.client_id = value
    }
    this.setState(newSt)
  }

  handleSubmit = () => {
    const { username, password } = this.state

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
      email: email,
      password: pass
    })
    return false
  }

  isEmptyOrNull (str) {
    return isEmpty(str) || isNil(str)
  }

  _form () {
    const { responseMessage } = this.props
    return (
      <form onSubmit={(e) => this._formOnSubmit(e)}>
        {!_.isEmpty(responseMessage) &&
          <div className='row'>
            <div className='col-12'>
              <div className='alert alert-danger' role='alert'><center>{responseMessage}</center></div>
            </div>
          </div>}
        <div className='input-group mb-3'>
          <input type='email' className='form-control' placeholder='Email' ref='email' required />
          <div className='input-group-append'>
            <div className='input-group-text'>
              <span className='fas fa-envelope' />
            </div>
          </div>
        </div>
        <div className='input-group mb-3'>
          <input type='password' className='form-control' placeholder='Password' ref='pass' required />
          <div className='input-group-append'>
            <div className='input-group-text'>
              <span className='fas fa-lock' />
            </div>
          </div>
        </div>
        {/* <div className='row'>
          <div className='col-8'>
            <div className='icheck-primary'> */}
        {/* <input type='checkbox' id='remember' />
              <label for='remember'>
                Remember Me
              </label> */}
        {/* </div>
          </div> */}
        <div className='col-12'>
          {/* <button type='submit' className='btn btn-block btn-primary btn-sm'>Sign In</button> */}
          {!this.props.isRequesting && <button type='submit' className='btn btn-block btn-primary btn-sm'>Sign In</button>}
          {this.props.isRequesting && (<center>Please Wait</center>)}
          {/* {this.props.isRequesting && (<center><Loader loading type='rpmerah' /></center>)} */}
        </div>
        <br />
        <center><Link to='/forget-password'>Forgot your password?</Link></center>
        {/* <center><b>OR</b></center>
        <center>Don't have an account?<Link to='/signup'>Sign Up</Link></center> */}

      </form>
    )
  }

  render () {
    return (this._form())
  }
}

export default LoginPageComponent

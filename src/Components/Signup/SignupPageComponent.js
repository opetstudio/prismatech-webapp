import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import AppConfig from '../../Config/AppConfig'
import Loader from '..//Loader/Loader'
import _ from 'lodash'
const basePath = AppConfig.basePath

export default class SignupPageComponent extends Component {
  constructor(props)
  {
    super(props)
    this._formOnSubmit=this._formOnSubmit.bind(this)
  }
  state={
    msg:''
  } 

  componentDidMount () {
    this.props.reset()
    window.SignupPageComponent()
  }

  _formOnSubmit (e) {
    if (e) e.preventDefault()
    const {msg} = this.state
    const {submit} = this.props

    const email = this.refs.email.value
    const fullname = this.refs.fullname.value
    const address = this.refs.address.value
    const businessName = this.refs.businessName.value
    
    this.setState({msg:''}) 
      submit({
      email,
      fullname,
      address, 
      businessName 
      })
    return false
  }
  _result()
  {
    return(
      <div className='register-box' >
        <div className='register-logo'>
        <i className="fa fa-check-circle" style={{color: 'green'}}></i>
          <p style={{color:'green'}}><b>Sukses Mendaftar</b></p> 
        </div>
          <div className='register-box-body'>
            <p style={{color:'green',textAlign:'center./'}} ><b>Email telah dikirim ke akun Anda, silakan periksa email Anda untuk melanjutkan login</b></p>
            <br/>
            <center><a href='/login'  type='submit' className='btn btn-primary btn-block btn-flat ' required>Pergi ke halaman login</a></center>
      </div>
    </div>
    )
  }
  _form(status,errors,msg,isRequest)
  {
    let message = msg
    return( 
      <div className='register-box' >
          <div className='register-logo'>
            <a href='/'><b>Rayapay merchant</b></a>
          </div>
          <div className='register-box-body'>
            <p className='login-box-msg'>Daftar untuk menjadi Member baru</p>
            {!_.isEmpty(message) != ''  && 
            <div className='row' style={{marginTop:10,marginBottom:10}}> 
              <div className='col-12'>
                <div className='alert alert-danger' role='alert'><center>{message}</center></div>
              </div>
            </div>
            }
             {!_.isEmpty(errors) != ''  && 
            <div className='row' style={{marginTop:10,marginBottom:10}}> 
              <div className='col-12'>
                <div className='alert alert-danger' role='alert'><center>{errors}</center></div>
              </div>
            </div>
            }
            <form onSubmit={(e) => this._formOnSubmit(e)}>
              <div className='form-group has-feedback'>
                <input type='text' className='form-control' placeholder='Full name' ref='fullname' required/>
                <span className='glyphicon glyphicon-user form-control-feedback' />
              </div>
              <div className='form-group has-feedback'>
                <input type='email' className='form-control' placeholder='Email' ref='email' required/>
                <span className='glyphicon glyphicon-envelope form-control-feedback' />
              </div>
              <div className='form-group has-feedback'>
                <input type='text' className='form-control' placeholder='Business Name' ref='businessName' required/>
                <span className='glyphicon glyphicon-envelope form-control-feedback' />
              </div>
              <div className='form-group has-feedback'>
                <textarea className="form-control" rows="3" placeholder='Your business address' ref='address' required></textarea>
              </div>
              {/* <div className='form-group has-feedback'>
                <input type='password' className='form-control' placeholder='Password' ref='password' required/>
                <span className='glyphicon glyphicon-lock form-control-feedback' />
              </div>
              <div className='form-group has-feedback'>
                <input type='password' className='form-control' placeholder='Retype password' ref='passwordconfirm' required/>
                <span className='glyphicon glyphicon-log-in form-control-feedback' />
              </div> */}
                <center>
                  {!isRequest && <button style={{width:'100%'}} type='submit' className='btn btn-primary btn-block btn-flat' required>Daftar</button>}
                  {isRequest && <Loader loading type="rpmerah"/>}
                 </center>
              
              <div className='row'>
                <div className='col-xs-8'>
                  {/* <div className='checkbox icheck'>
                  <label>
                    <input type='checkbox' /> I agree to the <a href='/#'>terms</a>
                  </label>
                </div> */}
                </div>
              </div>
            </form>
            <br/>
            <center><a href="/" className='text-center'>Saya sudah Terdaftar menjadi Member</a></center>

          </div>
          {/* /.form-box */}
        </div>)
      
  }
  render () {
    
    const {status,errors,isRequest} = this.props
    const {msg} = this.state
    console.log('err>>>',errors)
    return (
      <div>
        <Helmet>
          <title>Mendaftar</title>
          <body className='hold-transition register-page' />
        </Helmet>
        {!this.props.isResult && this._form(status,errors,msg,isRequest)}
        {this.props.isResult && this._result()}
      </div>
    )
  }
}

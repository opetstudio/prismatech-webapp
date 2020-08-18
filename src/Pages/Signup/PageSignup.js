import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import SignupActions from '../../features/Signup/redux'
import Loader from '../../Components/Loader/Loader'
// import SignupPageComponent from '../../Components/Signup/SignupPageComponent'
// import { isLoggedIn } from '../../Utils/Utils'
// import LoginActions, { LoginSelectors } from '../Login/redux'
// import SignUpActions from './redux'
// import AppConfig from '../../Config/AppConfig'
// const basePath = AppConfig.basePath

function PageSignup (props) {
  const { signupRequest, history, loading } = props
  return (
    <>
      <Helmet>
        <title>Mendaftar</title>
        <body className='register-page' />
      </Helmet>
      <div className='register-box'>
        <div className='register-logo'>
          <a href='../../index2.html'><b>Tokoonline</b></a>
        </div>
        <div className='card'>
          <div className='card-body register-card-body'>
            <p className='login-box-msg'>Register a new membership</p>
            <form
              action='#'
              method='post'
              onSubmit={e => {
                console.log(e.target.elements.email.value)
                e.preventDefault()
                if (loading) return
                const data = {
                  history,
                  email: e.target.elements.email.value,
                  fullName: e.target.elements.fullName.value,
                  term: e.target.elements.terms.checked
                }
                console.log('data===>', data)
                if (!data.term) {
                  alert('please check I agree to the terms')
                  return
                }
                if (data.password !== data.passwordConf) {
                  alert('password and retype password field is not match')
                  return
                }
                signupRequest(data)
              }}
            >
              <div className='input-group mb-3'>
                <input type='text' name='fullName' className='form-control' placeholder='Full name' required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-user' />
                  </div>
                </div>
              </div>
              <div className='input-group mb-3'>
                <input type='email' name='email' className='form-control' placeholder='Email' required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-envelope' />
                  </div>
                </div>
              </div>
              {/* <div className='input-group mb-3'>
                <input type='password' name='password' className='form-control' placeholder='Password' required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-lock' />
                  </div>
                </div>
              </div>
              <div className='input-group mb-3'>
                <input type='password' name='passwordConf' className='form-control' placeholder='Retype password' required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-lock' />
                  </div>
                </div>
              </div> */}
              <div className='row'>
                <div className='col-8'>
                  <div className='icheck-primary'>
                    <input type='checkbox' id='agreeTerms' name='terms' required />
                    <label htmlFor='agreeTerms'>
                I agree to the <a href='#'>terms</a>
                    </label>
                  </div>
                </div>
                {/* /.col */}
                <div className='col-4'>
                  <button type='submit' className='btn btn-primary btn-block'>Register</button>
                </div>
                {/* /.col */}
              </div>
            </form>
            {/* <div className='social-auth-links text-center'>
              <p>- OR -</p>
              <a href='#' className='btn btn-block btn-primary'>
                <i className='fab fa-facebook mr-2' />
          Sign up using Facebook
              </a>
              <a href='#' className='btn btn-block btn-danger'>
                <i className='fab fa-google-plus mr-2' />
          Sign up using Google+
              </a>
            </div> */}
            <Link to='/login' className='text-center'>I already have a membership</Link>
            {loading && <center>Please wait....</center>}
            {/* {loading && <center><Loader loading type='rpmerah' /></center>} */}
          </div>
          {/* /.form-box */}
        </div>{/* /.card */}
      </div>

    </>
  )
}

// const TheComponent = props => {
//   if (isLoggedIn(props.isLoggedIn) !== true) { return <SignupPageComponent {...props} /> } else window.open(`${basePath}/`, '_self')
// }

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.signup.loading
//     isLoggedIn: LoginSelectors.isLoggedIn(state.login),
//     errors: state.signup.errors,
//     status: state.signup.status,
//     isRequest: state.signup.isRequesting,
//     isResult: state.signup.isResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupRequest: data => dispatch(SignupActions.signupRequest(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageSignup)
// export default PageSignup

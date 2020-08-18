import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../../Containers/Login/redux'
import SignupActions from './redux'
import _ from 'lodash'

export function * signupRequest (api, { data }) {
  console.log('signupRequest====data', data)
  const { history } = data
  const response = yield call(api.signupRequest, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const errorBody = path(['data', 'data', 'signUpV2', 'error'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  yield put(SignupActions.signupRequestDone({ errors }))

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      window.callErrorToast(element.message, 'error')
    })
  } else {
    window.callErrorToast('Success signup. The password has been sent to your email.', 'success')
    history.push('/login')
  }
  // window.callErrorToast('Login error. ' + responseMessage, 'error')
}

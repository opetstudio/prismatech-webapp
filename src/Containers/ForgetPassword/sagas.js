import { call, put, select } from 'redux-saga/effects'
import ForgetActions from './redux'
import AppConfig from '../../Config/AppConfig'
import { setSession, getSession, destroySession } from '../../Utils/Utils'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'
export function * doForgetPassword (api, action) {
  const { data } = action
  // console.log("data>>>>",data)

  const response = yield call(api.doForgetPassword, data)

  console.log('response forget>>>>>>', response)
  const err = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })

  const statusBody = parseInt(path(['data', 'data', 'forgetPasswordSendOtp', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'forgetPasswordSendOtp', 'error'], response) || []
  const otpRefNum = path(['data', 'data', 'forgetPasswordSendOtp', 'otpRefNum'], response) || []

  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  const status = statusBody

  if (_.isEmpty(err)) {
    const status = statusBody
    const isRequesting = false
    console.log('ref>>>>>>>', otpRefNum)
    yield put(ForgetActions.doForgetPassDone({ status, isRequesting, otpRefNum, email: data.email }))
    yield put(ForgetActions.doForgetSetPage({ page: 'password' }))
  } else {
    const errors = ''
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    window.callErrorToast('Forget password error. ' + errors, 'error')
    yield put(ForgetActions.doForgetPassFailed({ errors, status }))
  }
}

export function * doConfirmForgetPassword (api, action) {
  const { data } = action
  const response = yield call(api.submitForgetPassword, data)
  console.log('response confirmpass>>>>', response)
  const err = path(['data', 'errors'], response) || []

  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const statusBody = parseInt(path(['data', 'data', 'changePasswordViaForgetPassword', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'changePasswordViaForgetPassword', 'error'], response) || []

  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  const status = statusBody

  if (_.isEmpty(err)) {
    const status = statusBody
    yield put(ForgetActions.doConfirmForgetPassDone({ status }))
    yield put(ForgetActions.doForgetSetPage({ page: 'success' }))
  } else {
    const errors = err[0].message
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    window.callErrorToast('Confirm forget password error. ' + errors, 'error')
    yield put(ForgetActions.doConfirmForgetPassFailed({ errors, status }))
  }
}

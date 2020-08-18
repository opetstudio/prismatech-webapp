import { call, put, select } from 'redux-saga/effects'
import CpActions from './redux'
import AppConfig from '../../../Config/AppConfig'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'

export function * doChangePassword (api, action) {
  const { data } = action

  const response = yield call(api.changePassword, data)
  console.log('response change password>>>>', response)

  const err = path(['data', 'errors'], response) || []

  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const statusBody = parseInt(path(['data', 'data', 'changePasswordMerchant', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'changePasswordMerchant', 'error'], response) || []

  console.log('error body======>', errorbody)

  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  console.log('err>>>>', err)
  const status = statusBody || response.status

  if (_.isEmpty(err)) {
    yield put(CpActions.changePasswordDone({ status }))
  } else {
    let errors = ''
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    window.callErrorToast('Change Password error. ' + errors, 'error')
    yield put(CpActions.changePasswordDone({ errors, status }))
  }
}

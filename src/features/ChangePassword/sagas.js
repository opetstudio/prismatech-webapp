import { call, put } from 'redux-saga/effects'
import Actions from './redux'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'
import { callErrorToast } from '../../Utils/Utils'

export function * changepasswordSubmit (api, action) {
  const { data } = action

  const response = yield call(api.changepasswordSubmit, data)
  console.log('response change password>>>>', response)

  const err = path(['data', 'errors'], response) || []

  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const statusBody = parseInt(path(['data', 'data', 'changeUserPassword', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'changeUserPassword', 'error'], response) || []

  console.log('error body======>', errorbody)

  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  console.log('err>>>>', err)
  const status = statusBody || response.status

  document.getElementById('buttonCloseModal').click()
  if (_.isEmpty(err)) {
    yield put(Actions.changepasswordSubmitDone({ status }))
    callErrorToast('Change Password success.', 'success')
  } else {
    let errors = ''
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    callErrorToast('Change Password error. ' + errors, 'error')
    yield put(Actions.changepasswordSubmitDone({ errors, status }))
  }
}

import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
import _ from 'lodash'
import { callErrorToast } from '../../Utils/Utils'

export function * purchaseorderCheckStatusRequestOtp (api, { data }) {
  console.log('purchaseorderCheckStatusRequestOtp====data', data)
  const response = yield call(api.purchaseorderCheckStatusRequestOtp, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const errorBody = path(['data', 'data', 'purchaseorderCheckStatusRequestOtp', 'error'], response)
  const otpRefNum = path(['data', 'data', 'purchaseorderCheckStatusRequestOtp', 'otpRefNum'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  yield put(Actions.purchaseorderCheckStatusRequestOtpDone({ errors, otpRefNum }))
  if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      callErrorToast(element.message, 'error')
    })
  } else {
    callErrorToast('berhasil kirim otp', 'success')
  }
}
export function * purchaseorderCheckStatus (api, { data }) {
  console.log('purchaseorderCheckStatus====data', data)
  const response = yield call(api.purchaseorderCheckStatus, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const errorBody = path(['data', 'data', 'purchaseorderCheckStatus', 'error'], response)
  const dataDetail = path(['data', 'data', 'purchaseorderCheckStatus', 'data_detail'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  let otpValid = false
  if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      callErrorToast(element.message, 'error')
    })
    otpValid = false
  } else {
    callErrorToast('berhasil query data', 'success')
    otpValid = true
  }
  yield put(Actions.purchaseorderCheckStatusDone({ errors, dataDetail, otpValid }))
}

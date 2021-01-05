import { call, put } from 'redux-saga/effects'
import TopupAction from './redux'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'

export function * doTopupEmoney (api, action) {
  const { data } = action
  // console.log("data>>>>",data)

  const response = yield call(api.doTopUpEmoney, data)
  console.log('response TopupEmoney>>>>', response)
  // const err = path(['data', 'errors'], response) || []

  // if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  // const statusBods = parseInt(path(['data', 'data', 'MerchantTransactionHistory', 'status'], response) || 0)
  // const errorbody = path(['data', 'data', 'MerchantTransactionHistory', 'error'], response)||[]
  // const trxData = path(['data', 'data', 'MerchantTransactionHistory', 'transaction'], response)||[]
  // console.log("Sagas fetchTrx>>>>>>>>>>",trxData)
  // if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  // const status = statusBody || response.status

  // if (_.isEmpty(err)) {
  //   const status=statusBody
  //   const isRequesting=false
  //   yield put(TrxActions.fetchTransactionDone({status,isRequesting,trxData}))
  // }
  // else{
  //   const errors=err[0]
  //   yield put(TrxActions.fetchTransactionFailed({errors,status}))
  // }
}
export function * doTopupByCode (api, action) {
  const { data } = action
  // console.log("data>>>>",data)

  const response = yield call(api.doTopUpEmoneybyCode, data)
  console.log('response TopupEmoney>>>>', response)
  const err = path(['data', 'errors'], response) || []

  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const statusBody = parseInt(path(['data', 'data', 'createQrTopUpMerchant', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'createQrTopUpMerchant', 'error'], response) || []
  const qr_code = path(['data', 'data', 'createQrTopUpMerchant', 'qr_code'], response)
  // const transaction_id = path(['data', 'data', 'createQrTopUpMerchant', 'transaction_id'], response)

  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  const status = statusBody || response.status

  if (_.isEmpty(err)) {
    // const status = statusBody
    const isResult = true
    yield put(TopupAction.doTopupDone({ qr_code, isResult }))
    window.callModalTopup()
  } else {
    let errors = ''
    if (/Expected type Int!/.test(errors)) { errors = 'You\'re exceed minimum topup' }
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    window.callErrorToast('Topup error. ' + errors, 'error')
    yield put(TopupAction.doTopupFailed({ errors, status }))
  }
}

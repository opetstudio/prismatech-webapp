import { call, put } from 'redux-saga/effects'
import QrAction from './redux'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'

export function * getMerchantQr (api, action) {
  const { data } = action

  const response = yield call(api.loadQrMerchant, data)
  console.log('response TopupEmoney>>>>', response)
  const err = path(['data', 'errors'], response) || []

  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const statusBody = parseInt(path(['data', 'data', 'createQrStatic', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'createQrStatic', 'error'], response) || []
  const qr_code = path(['data', 'data', 'createQrStatic', 'qr_code'], response)

  console.log('QR merchant>>>>>', qr_code)

  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  const status = statusBody || response.status

  if (err[0] === 'Successfully creating QR Code' || statusBody === 200) {
    const status = statusBody
    // const isResult = true
    yield put(QrAction.getQrDone({ qr_code, status, errors: '' }))
  } else {
    let errors = ''
    if (!isNullOrUndefined(err[0].message)) {
      errors = err[0].message
      if (errors === 'NETWORK_ERROR') { errors = 'Something Error. Can\'t connect to server' }else { errors = err[0].message }
    } else {
      if (err[0] === 'NETWORK_ERROR') { errors = 'System Error' } else { errors = err[0] }
    }

    // window.callErrorToast('Get merchant error. '+errors,'error')
    yield put(QrAction.getQrDone({ errors, status }))
  }
}

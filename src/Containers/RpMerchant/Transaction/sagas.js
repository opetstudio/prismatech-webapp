import { call, put } from 'redux-saga/effects'
import TrxActions from './redux'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'

export function * fetchTransactionHistory (api, action) {
  const { data } = action
  const response = yield call(api.fetchTrxHistory, data)
  console.log('response fetch trx history>>>>', response)
  const err = path(['data', 'errors'], response) || []

  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const statusBody = parseInt(path(['data', 'data', 'MerchantTransactionHistory', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'MerchantTransactionHistory', 'error'], response) || []
  const trxData = path(['data', 'data', 'MerchantTransactionHistory', 'transaction'], response) || []
  console.log('Sagas fetchTrx>>>>>>>>>>', trxData)
  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  const status = statusBody || response.status

  if (_.isEmpty(err)) {
    const status = statusBody
    const isRequesting = false
    yield put(TrxActions.fetchTransactionDone({ status, isRequesting, trxData }))
  } else {
    let errors = ''
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    // window.callErrorToast('Fetch transaction history error. '+errors,'error')
    yield put(TrxActions.fetchTransactionFailed({ errors, status }))
  }
}

import { call, put } from 'redux-saga/effects'
import StlActions from './redux'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'

export function * fetchMerchantSettlement (api, action) {
  const { data } = action
  // console.log("data>>>>",data)

  const response = yield call(api.getMerchantSettlement, data)
  console.log('response fetch trx getMerchantSettlement>>>>', response)
  const err = path(['data', 'errors'], response) || []

  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const statusBody = parseInt(path(['data', 'data', 'getSettlements', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'getSettlements', 'error'], response) || []
  const settlementData = path(['data', 'data', 'getSettlements', 'settlements'], response) || []
  console.log('Sagas fetchsettlement>>>>>>>>>>', settlementData)
  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  const status = statusBody || response.status

  if (_.isEmpty(err)) {
    const status = statusBody
    const isRequesting = false
    yield put(StlActions.fetchSettlementDone({ status, isRequesting, settlementData }))
  } else {
    let errors = ''
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    // window.callErrorToast('Fetch merchant settlement error. '+errors,'error')
    yield put(StlActions.fetchSettlementFailed({ errors, status }))
  }
}

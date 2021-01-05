import { call, put } from 'redux-saga/effects'
import MyAction from './redux'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'
import LoginActions from '../../../Containers/Login/redux'
export function * fetchMerchantProfile (api, action) {
  const { data } = action

  const response = yield call(api.getMerchantInfo, data)
  // console.log("response fetch user =======>>>>",response)
  const err = path(['data', 'errors'], response) || []

  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const statusBody = parseInt(path(['data', 'data', 'MerchantInfo', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'MerchantInfo', 'error'], response) || []
  const address = path(['data', 'data', 'MerchantInfo', 'merchant', 'address'], response)
  const full_name = path(['data', 'data', 'MerchantInfo', 'merchant', 'fullname'], response)
  const business_name = path(['data', 'data', 'MerchantInfo', 'merchant', 'business_name'], response)
  const email = path(['data', 'data', 'MerchantInfo', 'merchant', 'email'], response)
  const device_id = path(['data', 'data', 'MerchantInfo', 'merchant', 'device_id'], response)
  const merchant_id = path(['data', 'data', 'MerchantInfo', 'merchant', 'merchant_id'], response)

  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  const status = statusBody || response.status

  if (!_.isEmpty(err) && (_.isEqual((err[0] || {}).message, 'Invalid Access Token') || _.isEqual((err[0] || {}).message, 'jwt expired'))) {
    console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  }

  if (_.isEmpty(err)) {
    const status = statusBody
    yield put(MyAction.fetchProfileDataDone({ status, address, full_name, business_name, email, device_id, merchant_id }))
  } else {
    let errors = ''
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    // window.callErrorToast('Fetch merchant profile error. '+errors,'error')
    yield put(MyAction.fetchProfileDataFailed({ errors, status }))
  }
}

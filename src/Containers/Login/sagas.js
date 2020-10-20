import { call, put, select, delay } from 'redux-saga/effects'
import LoginActions from './redux'
import MyprofileActions from '../Myprofile/redux'
import AppActions from '../../Redux/AppRedux'
import AppConfig from '../../Config/AppConfig'
import { setSession, getSession, destroySession ,getAccessToken} from '../../Utils/Utils'
import {getAttributes,updateMulti} from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'

import _ from 'lodash'
import { isNullOrUndefined } from 'util'
export function * doLogout (api, action) {
  const { data } = action
  const response = yield call(api.doLogout, data)
  console.log('Response logout>>>', response)
  const errors = []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  // detect error from body
  const status = parseInt(path(['data', 'data', 'logout', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'logout', 'error'], response) || []

  if (errorbody === 'Invalid token') {
    destroySession()
    window.location.replace(`${AppConfig.basePath}/`)
    yield put(AppActions.reset())
    return
  }
  if (!_.isEmpty(errorbody)) errors.push({ message: errorbody })

  // if (status === 200) {
  yield put(AppActions.reset())
  destroySession()
  window.location.replace(`${AppConfig.basePath}/`)
  // } else {
  //   const responseMessage = ''
  //   console.log('err>>>>', errors[0])
  //   // if(typeof(errors[0].message)==undefined&&!isNullOrUndefined(typeof(errors[0].message))){ responseMessage=errors[0].message }
  //   // else{ responseMessage=errors[0] }
  //   // console.log("type of>>>>>", typeof(errors[0].message))
  //   // window.callErrorToast('Logout error. ' + responseMessage, 'error')
  //   destroySession()
  //   return yield put(LoginActions.loginDoLoginFailed({ responseMessage }))
  //   yield put(AppActions.reset())
  // }
}
export function * loginDoLogin (api, action) {
  console.log('loginDoLogin')
  const { data } = action
  const response = yield call(api.loginDoLogin, data)
  console.log('Response>>>>>>>>>>>>', response)
  const errors = []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })

  // detect error from body
  const status = parseInt(path(['data', 'data', 'login', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'login', 'error', 'message'], response) || []
  const errorbody2 = path(['data', 'data', 'login', 'error'], response) || []
  const errorBackend = path(['data', 'errors'], response) || []
  const token = path(['data', 'data', 'login', 'access_token'], response)
  const user = path(['data', 'data', 'login', 'user'], response)
  const userPrivileges = path(['data', 'data', 'login', 'user_privileges'], response)
  const role = path(['data', 'data', 'login', 'role'], response)
  const myprofile = user
  const merchantIdd = '1588133343427HsZOX'

  if (!_.isEmpty(errorbody)) errors.push({ message: errorbody })
  if (!_.isEmpty(errorbody2)) errors.push({ message: errorbody2 })
  if (!_.isEmpty(errorBackend)) { errors.push({ message: 'System error' }) }

  // success?
  if (_.isEmpty(errors)) {
    console.log('before setSession. merchant_id=' + merchantIdd + '|token=' + token)
    yield put(MyprofileActions.myprofileSetMyprofile({ myprofile, userPrivileges, role }))
    yield delay(4000)
    setSession({ [AppConfig.loginFlag]: true, merchant_id: merchantIdd, [AppConfig.sessionToken]: token })
    yield put(
      LoginActions.loginDoLoginSuccess({
        user,
        token,
        merchant_id: merchantIdd,
        contentDetail: response.data,
        formSubmitMessage: 'success login'
      })
    )
    window.location.replace(`${AppConfig.basePath}${AppConfig.appHomePage}`)
  } else {
    const responseCode = status
    let responseMessage = ''
    if (!isNullOrUndefined(errors[0].message)) { responseMessage = errors[0].message } else { responseMessage = errors[0] }
    window.callErrorToast('Login error. ' + responseMessage, 'error')
    return yield put(LoginActions.loginDoLoginFailed({ responseCode, responseMessage }))
  }
}

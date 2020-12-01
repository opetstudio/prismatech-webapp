import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../../Containers/Login/redux'
import PrivilegeActions from './redux'
import _ from 'lodash'
import { callErrorToast } from '../../Utils/Utils'

export function * privilegeCheckboxSubmit (api, { data }) {
  console.log('privilegeCheckboxSubmit====data', data)
  const response = yield call(api.privilegeCheckboxSubmit, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const errorBody = path(['data', 'data', 'privilegeCheckboxSubmit', 'error'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  yield put(PrivilegeActions.privilegeCheckboxSubmitDone({ errors }))

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      callErrorToast(element.message, 'error')
    })
  } else {
    callErrorToast('Success setup privileges for the role', 'success')
  }
  // callErrorToast('Login error. ' + responseMessage, 'error')
}

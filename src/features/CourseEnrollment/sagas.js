import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../../Containers/Login/redux'
import CourseenrollmentActions from './redux'
import _ from 'lodash'
import { callErrorToast } from '../../Utils/Utils'

export function * courseenrollmentSubmitEnrollmentRequest (api, { data }) {
  console.log('courseenrollmentSubmitEnrollmentRequest====data', data)
  const response = yield call(api.courseenrollmentSubmitEnrollmentRequest, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const errorBody = path(['data', 'data', 'submitCourseEnrollmentRequest', 'error'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  yield put(CourseenrollmentActions.courseenrollmentSubmitEnrollmentRequestDone({ errors }))

  document.getElementById('buttonCloseModalEnroll').click()
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      if (element.message.includes('user_id_1_course_id_1_batch_1')) callErrorToast('Course have already enrolled', 'error')
      else callErrorToast(element.message, 'error')
    })
  } else {
    callErrorToast('success enrollment', 'success')
  }
  // callErrorToast('Login error. ' + responseMessage, 'error')
}

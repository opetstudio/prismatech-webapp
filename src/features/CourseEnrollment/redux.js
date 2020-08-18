import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  courseenrollmentSubmitEnrollmentRequest: ['data'],
  courseenrollmentSubmitEnrollmentRequestDone: ['data'],
  reset: null
})

export const CourseenrollmentTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  errors: []
})
export const courseenrollmentSubmitEnrollmentRequest = (state, { data }) => state.merge({
  loading: true
})
export const courseenrollmentSubmitEnrollmentRequestDone = (state, { data }) => state.merge({
  errors: data.errors,
  loading: false
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COURSEENROLLMENT_SUBMIT_ENROLLMENT_REQUEST]: courseenrollmentSubmitEnrollmentRequest,
  [Types.COURSEENROLLMENT_SUBMIT_ENROLLMENT_REQUEST_DONE]: courseenrollmentSubmitEnrollmentRequestDone,
  [Types.RESET]: (state) => INITIAL_STATE
})

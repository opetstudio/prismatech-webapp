import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  signupRequest: ['data'],
  signupRequestDone: ['data'],
  reset: null
})

export const SignupTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  errors: []
})
export const signupRequest = (state, { data }) => state.merge({
  loading: true
})
export const signupRequestDone = (state, { data }) => state.merge({
  errors: data.errors,
  loading: false
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_REQUEST_DONE]: signupRequestDone,
  [Types.RESET]: (state) => INITIAL_STATE
})

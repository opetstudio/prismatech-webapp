import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changePassword: ['data'],
  changePasswordDone: ['data'],
  resetChangePassword: null
})

export const ChangePasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isRequesting: false,
  errors: '',
  status: 0

})

export const done = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const do_change = (state, { data }) => state.merge({ isRequesting: true, ...data })
export const reset = (state, { data }) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_PASSWORD]: do_change,
  [Types.CHANGE_PASSWORD_DONE]: done,
  [Types.RESET_CHANGE_PASSWORD]: reset
})
